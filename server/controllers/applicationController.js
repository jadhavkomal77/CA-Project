
import asyncHandler from "express-async-handler";
import Application from "../models/Application.js";
import Service from "../models/Service.js";
import cloudinary from "../utils/cloudinary.js";
import { uploadBuffer } from "../utils/uploadToCloudinary.js";
import generatePDFBuffer from "../utils/generatePDF.js";


const cleanName = (name = "file") =>
  name.replace(/\.[^/.]+$/, "").replace(/\s+/g, "-").toLowerCase();

const getResourceType = (mime = "") => {
  if (mime.startsWith("image")) return "image";
  if (mime.startsWith("video")) return "video";
  return "raw";
};

export const submitApplication = asyncHandler(async (req, res) => {
  let { userDetails, serviceId } = req.body;

  if (!userDetails || !serviceId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (typeof userDetails === "string") {
    userDetails = JSON.parse(userDetails);
  }

  const service = await Service.findById(serviceId);
  if (!service)
    return res.status(404).json({ message: "Service not found" });

  const uploadedDocuments = [];

  if (req.files?.documents) {
    const files = Array.isArray(req.files.documents)
      ? req.files.documents
      : [req.files.documents];

    for (const file of files) {
      const filename = `${cleanName(file.originalname)}-${Date.now()}`;

      const result = await uploadBuffer(
        file.buffer,
        `applications/${service.slug}`,
        filename,
        file.mimetype
      );

      uploadedDocuments.push({
        documentName: file.originalname,
        fileURL: result.secure_url,
        publicId: result.public_id,
        fileType: file.mimetype,
      });
    }
  }

  const app = await Application.create({
    userDetails,
    serviceId,
    serviceName: service.title,
    serviceSlug: service.slug,
    uploadedDocuments,
  });

  res.status(201).json({
    success: true,
    message: "Application submitted successfully",
    data: app,
  });
});


export const getApplicationAnalytics = asyncHandler(async (req, res) => {
  const total = await Application.countDocuments();
  const approved = await Application.countDocuments({ status: "Approved" });
  const rejected = await Application.countDocuments({ status: "Rejected" });
  const pending = await Application.countDocuments({ status: "Pending" });

  const approvalRate = total
    ? ((approved / total) * 100).toFixed(2)
    : 0;

  const monthly = await Application.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id": 1 } },
  ]);

  res.json({
    success: true,
    data: { total, approved, rejected, pending, approvalRate, monthly },
  });
});

export const getAllApplications = asyncHandler(async (req, res) => {
  const { serviceId, status } = req.query;

  const filter = {};
  if (serviceId) filter.serviceId = serviceId;
  if (status) filter.status = status;

  const applications = await Application.find(filter)
    .populate("serviceId", "title slug")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: applications.length,
    data: applications,
  });
});


export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status, adminNotes } = req.body;

  const app = await Application.findById(req.params.id);
  if (!app)
    return res.status(404).json({ message: "Application not found" });

  if (status) app.status = status;
  if (adminNotes) app.adminNotes = adminNotes;

  await app.save();

  res.json({
    success: true,
    message: "Status updated successfully",
    data: app,
  });
});


export const deleteApplication = asyncHandler(async (req, res) => {
  const app = await Application.findById(req.params.id);
  if (!app)
    return res.status(404).json({ message: "Application not found" });

  for (const file of app.uploadedDocuments || []) {
    if (!file.publicId) continue;

    await cloudinary.uploader.destroy(file.publicId, {
      resource_type: getResourceType(file.fileType),
    });
  }

  if (app.pdfPublicId) {
    await cloudinary.uploader.destroy(app.pdfPublicId, {
      resource_type: "raw",
    });
  }

  await app.deleteOne();

  res.json({
    success: true,
    message: "Application deleted successfully",
  });
});

export const generateAndUploadPDF = asyncHandler(async (req, res) => {
  const app = await Application.findById(req.params.id);

  if (!app)
    return res.status(404).json({ message: "Application not found" });

  if (app.status !== "Approved") {
    return res.status(403).json({
      message: "PDF can only be generated for Approved applications",
    });
  }

  if (app.pdfPublicId) {
    await cloudinary.uploader.destroy(app.pdfPublicId, {
      resource_type: "raw",
    });
  }

  const pdfBuffer = await generatePDFBuffer(app);

  const result = await uploadBuffer(
    pdfBuffer,
    "applications/pdfs",
    `application-${app._id}`,
    "application/pdf"
  );

  app.pdfUrl = result.secure_url;
  app.pdfPublicId = result.public_id;
  await app.save();

  res.json({
    success: true,
    message: "PDF generated successfully",
    pdfUrl: result.secure_url,
  });
});


import axios from "axios";

export const downloadApprovedPDF = asyncHandler(async (req, res) => {
  const app = await Application.findById(req.params.id);

  if (!app || !app.pdfUrl) {
    return res.status(404).json({ message: "PDF not found" });
  }

  if (app.status !== "Approved") {
    return res.status(403).json({
      message: "Only Approved applications can download PDF",
    });
  }

  const response = await axios.get(app.pdfUrl, {
    responseType: "arraybuffer",
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="application-${app._id}.pdf"`
  );

  res.send(response.data);
});

export const getApplicationById = asyncHandler(async (req, res) => {
  const app = await Application.findById(req.params.id)
    .populate("serviceId", "title slug requiredDocuments");

  if (!app) {
    return res.status(404).json({
      success: false,
      message: "Application not found",
    });
  }

  res.json({
    success: true,
    data: app,
  });
});