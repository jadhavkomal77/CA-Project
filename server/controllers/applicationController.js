

// import asyncHandler from "express-async-handler";
// import Application from "../models/Application.js";
// import Service from "../models/Service.js";
// import cloudinary from "../utils/cloudinary.js";
// import sendEmail from "../utils/sendEmail.js";
// import { uploadBuffer } from "../utils/uploadToCloudinary.js";


// export const submitApplication = asyncHandler(async (req, res) => {
//   let { userDetails, serviceId } = req.body;

//   if (typeof userDetails === "string") {
//     userDetails = JSON.parse(userDetails);
//   }

//   const { name, email, phone } = userDetails;

//   if (!name || !email || !phone || !serviceId)
//     return res.status(400).json({ message: "Missing fields" });

//   const service = await Service.findById(serviceId);
//   if (!service) return res.status(404).json({ message: "Service not found" });

//   const uploadedDocuments = [];

//   /* FILES */
//   if (req.files?.documents) {
//     const files = Array.isArray(req.files.documents)
//       ? req.files.documents
//       : [req.files.documents];

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];

//       const result = await uploadBuffer(
//         file.data,
//         `applications/${service.slug}`
//       );

//       uploadedDocuments.push({
//         documentName: file.name,
//         fileURL: result.secure_url,
//         publicId: result.public_id,
//       });
//     }
//   }

//   const app = await Application.create({
//     userDetails,
//     serviceId,
//     serviceName: service.title,
//     uploadedDocuments,
//   });

//   res.status(201).json({
//     success: true,
//     message: "Application submitted",
//     data: app,
//   });
// });

// /* =====================================================
//    📋 GET ALL APPLICATIONS
// ===================================================== */
// export const getAllApplications = asyncHandler(async (req, res) => {
//   console.log("📄 Fetching applications");

//   const { serviceId, status } = req.query;

//   const filter = {};
//   if (serviceId) filter.serviceId = serviceId;
//   if (status) filter.status = status;

//   const apps = await Application.find(filter)
//     .populate("serviceId", "title slug")
//     .sort({ createdAt: -1 });

//   res.json({
//     success: true,
//     count: apps.length,
//     data: apps,
//   });
// });

// /* =====================================================
//    📄 GET SINGLE APPLICATION
// ===================================================== */
// export const getApplicationById = asyncHandler(async (req, res) => {
//   console.log("🔎 Fetching application:", req.params.id);

//   const app = await Application.findById(req.params.id).populate(
//     "serviceId",
//     "title slug requiredDocuments"
//   );

//   if (!app) {
//     console.log("❌ Application not found");
//     return res.status(404).json({
//       success: false,
//       message: "Application not found",
//     });
//   }

//   res.json({
//     success: true,
//     data: app,
//   });
// });

// /* =====================================================
//    ✏ UPDATE STATUS
// ===================================================== */
// export const updateApplicationStatus = asyncHandler(async (req, res) => {
//   const { status, adminNotes } = req.body;

//   if (!status) {
//     return res.status(400).json({
//       success: false,
//       message: "Status is required",
//     });
//   }

//   const app = await Application.findByIdAndUpdate(
//     req.params.id,
//     { status, adminNotes },
//     { new: true }
//   );

//   if (!app) {
//     return res.status(404).json({
//       success: false,
//       message: "Application not found",
//     });
//   }

//   console.log("✏ Status updated:", status);

//   /* EMAIL */
//   try {
//     await sendEmail({
//       to: app.userDetails.email,
//       subject: `Application ${status}`,
//       html: `
//         <h2>Hello ${app.userDetails.name}</h2>
//         <p>Your application for <b>${app.serviceName}</b> is now:</p>
//         <h1 style="color:${status === "Approved" ? "green" : "red"}">${status}</h1>
//         ${adminNotes ? `<p><b>Note:</b> ${adminNotes}</p>` : ""}
//       `,
//     });

//     console.log("📧 Status email sent");
//   } catch (err) {
//     console.log("⚠ Email failed:", err.message);
//   }

//   res.json({
//     success: true,
//     data: app,
//   });
// });

// /* =====================================================
//    🗑 DELETE APPLICATION
// ===================================================== */
// export const deleteApplication = asyncHandler(async (req, res) => {
//   const app = await Application.findById(req.params.id);

//   if (!app) {
//     return res.status(404).json({
//       success: false,
//       message: "Application not found",
//     });
//   }

//   /* DELETE CLOUD FILES */
//   for (const doc of app.uploadedDocuments) {
//     if (doc.publicId) {
//       try {
//         await cloudinary.uploader.destroy(doc.publicId);
//         console.log("☁ Deleted:", doc.publicId);
//       } catch (err) {
//         console.log("⚠ Cloud delete failed:", err.message);
//       }
//     }
//   }

//   await Application.findByIdAndDelete(req.params.id);

//   console.log("🗑 Application deleted:", req.params.id);

//   res.json({
//     success: true,
//     message: "Application deleted successfully",
//   });
// });









import asyncHandler from "express-async-handler";
import Application from "../models/Application.js";
import Service from "../models/Service.js";
import cloudinary from "../utils/cloudinary.js";
import { uploadBuffer } from "../utils/uploadToCloudinary.js";


export const submitApplication = asyncHandler(async (req, res) => {
  if (!req.body)
    return res.status(400).json({ message: "Body missing" });

  let userDetails = req.body.userDetails;
  const serviceId = req.body.serviceId;

  if (!userDetails || !serviceId)
    return res.status(400).json({ message: "Missing fields" });

  if (typeof userDetails === "string")
    userDetails = JSON.parse(userDetails);

  const { name, email, phone } = userDetails;

  const service = await Service.findById(serviceId);
  if (!service)
    return res.status(404).json({ message: "Service not found" });

  const uploadedDocuments = [];

  if (req.files?.documents) {
    const files = Array.isArray(req.files.documents)
      ? req.files.documents
      : [req.files.documents];

    for (const file of files) {
      const result = await uploadBuffer(
        file.buffer,
        `applications/${service.slug}`
      );

      uploadedDocuments.push({
        documentName: file.originalname,
        fileURL: result.secure_url,
        publicId: result.public_id,
      });
    // const isPDF = file.mimetype === "application/pdf";

    //     uploadedDocuments.push({
    //       documentName: file.originalname,
    //       fileURL: isPDF
    //         ? result.secure_url.replace("/image/upload/", "/raw/upload/")
    //         : result.secure_url,
    //       publicId: result.public_id,
    //     });
    }
  }

  const app = await Application.create({
    userDetails,
    serviceId,
    serviceName: service.title,
    serviceSlug: service.slug,
    uploadedDocuments,
  });

  res.status(201).json({ success: true, data: app });
});
/* ---------- GET ALL ---------- */
export const getAllApplications = asyncHandler(async (req, res) => {
  const { serviceId, status } = req.query;
  const filter = {};
  if (serviceId) filter.serviceId = serviceId;
  if (status) filter.status = status;

  const apps = await Application.find(filter)
    .populate("serviceId", "title slug")
    .sort({ createdAt: -1 });

  res.json({ success: true, data: apps });
});

/* ---------- GET ONE ---------- */
export const getApplicationById = asyncHandler(async (req, res) => {
  const app = await Application.findById(req.params.id).populate(
    "serviceId",
    "title slug requiredDocuments"
  );

  if (!app) return res.status(404).json({ message: "Not found" });

  res.json({ success: true, data: app });
});

/* ---------- STATUS ---------- */
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const app = await Application.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!app) return res.status(404).json({ message: "Not found" });

  res.json({ success: true, data: app });
});

/* ---------- DELETE ---------- */
export const deleteApplication = asyncHandler(async (req, res) => {
  const app = await Application.findById(req.params.id);
  if (!app) return res.status(404).json({ message: "Not found" });

  for (const doc of app.uploadedDocuments) {
    if (doc.publicId)
      await cloudinary.uploader.destroy(doc.publicId, {
        resource_type: "auto",
      });
  }

  await app.deleteOne();
  res.json({ success: true, message: "Deleted" });
});