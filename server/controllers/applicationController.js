
import asyncHandler from "express-async-handler";
import Application from "../models/Application.js";
import Service from "../models/Service.js";
import cloudinary from "../utils/cloudinary.js";
import { uploadBuffer } from "../utils/uploadToCloudinary.js";

/* SUBMIT */
// export const submitApplication = asyncHandler(async (req, res) => {
//   let { userDetails, serviceId } = req.body;

//   if (!userDetails || !serviceId)
//     return res.status(400).json({ message: "Missing fields" });

//   if (typeof userDetails === "string")
//     userDetails = JSON.parse(userDetails);

//   const service = await Service.findById(serviceId);
//   if (!service)
//     return res.status(404).json({ message: "Service not found" });

//   const uploadedDocuments = [];

//   if (req.files?.documents) {
//     const files = Array.isArray(req.files.documents)
//       ? req.files.documents
//       : [req.files.documents];

//     for (const file of files) {
//       const result = await uploadBuffer(
//         file.buffer,
//         `applications/${service.slug}`,
//         file.mimetype
//       );

//       uploadedDocuments.push({
//         documentName: file.originalname,
//         fileURL: result.secure_url,
//         publicId: result.public_id,
//         fileType: file.mimetype,
//         resourceType: result.resource_type,
//       });
//     }
//   }

//   const app = await Application.create({
//     userDetails,
//     serviceId,
//     serviceName: service.title,
//     serviceSlug: service.slug,
//     uploadedDocuments,
//   });

//   res.status(201).json({ success: true, data: app });
// });


export const submitApplication = asyncHandler(async (req, res) => {
  let { userDetails, serviceId } = req.body;

  if (!userDetails || !serviceId)
    return res.status(400).json({ message: "Missing fields" });

  if (typeof userDetails === "string")
    userDetails = JSON.parse(userDetails);

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
        `applications/${service.slug}`,
        file.originalname,
        file.mimetype
      );

      uploadedDocuments.push({
        documentName: file.originalname,
        fileURL: result.secure_url,
        publicId: result.public_id,
        fileType: file.mimetype,
        resourceType: result.resource_type,
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

  res.status(201).json({ success: true, data: app });
});

/* GET ALL */
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


/* GET ONE */
export const getApplicationById = asyncHandler(async (req, res) => {
  const app = await Application.findById(req.params.id).populate(
    "serviceId",
    "title slug requiredDocuments"
  );

  if (!app) return res.status(404).json({ message: "Not found" });

  res.json({ success: true, data: app });
});


/* STATUS UPDATE */
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const app = await Application.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!app) return res.status(404).json({ message: "Not found" });

  res.json({ success: true, data: app });
});


/* DELETE */
export const deleteApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const app = await Application.findById(id);
  if (!app)
    return res.status(404).json({ message: "Application not found" });

  if (app.uploadedDocuments?.length) {
    for (const file of app.uploadedDocuments) {
      if (!file.publicId) continue;

      try {
        await cloudinary.uploader.destroy(file.publicId, {
          resource_type:
            file.resourceType ||
            (file.fileType?.startsWith("image/")
              ? "image"
              : file.fileType?.startsWith("video/")
              ? "video"
              : "raw"),
        });
      } catch (err) {
        console.log("Cloud delete error:", err.message);
      }
    }
  }

  await Application.findByIdAndDelete(id);

  res.json({
    success: true,
    message: "Application deleted successfully",
  });
});


//  ********************************



// import asyncHandler from "express-async-handler";
// import Application from "../models/Application.js";
// import Service from "../models/Service.js";
// import cloudinary from "../utils/cloudinary.js";
// import { uploadBuffer } from "../utils/uploadToCloudinary.js";
// import generatePDFBuffer from "../utils/generatePDF.js";

// /* ---------------- HELPERS ---------------- */

// const getResourceType = (mime = "") => {
//   if (mime.startsWith("image")) return "image";
//   if (mime.startsWith("video")) return "video";
//   return "raw";
// };

// const cleanName = (name = "file") => {
//   return name
//     .replace(/\.[^/.]+$/, "")
//     .replace(/\s+/g, "-")
//     .toLowerCase();
// };

// /* =========================================================
//    SUBMIT APPLICATION (Direct Cloudinary Upload)
// ========================================================= */

// export const submitApplication = asyncHandler(async (req, res) => {
//   let { userDetails, serviceId } = req.body;

//   if (!userDetails || !serviceId)
//     return res.status(400).json({ message: "Missing required fields" });

//   /* parse JSON if string */
//   if (typeof userDetails === "string") {
//     try {
//       userDetails = JSON.parse(userDetails);
//     } catch {
//       return res.status(400).json({ message: "Invalid userDetails JSON" });
//     }
//   }

//   const service = await Service.findById(serviceId);
//   if (!service)
//     return res.status(404).json({ message: "Service not found" });

//   const uploadedDocuments = [];

//   /* ------------ FILE UPLOAD ------------ */
//   if (req.files?.documents) {
//     const files = Array.isArray(req.files.documents)
//       ? req.files.documents
//       : [req.files.documents];

//     for (const file of files) {
//       const filename = `${service.slug}-${cleanName(
//         file.originalname
//       )}-${Date.now()}`;

//       const result = await uploadBuffer(
//         file.buffer,
//         `applications/${service.slug}`,
//         filename,
//         file.mimetype
//       );

//       uploadedDocuments.push({
//         documentName: file.originalname,
//         fileURL: result.secure_url,
//         publicId: result.public_id,
//         fileType: file.mimetype,
//       });
//     }
//   }

//   const app = await Application.create({
//     userDetails,
//     serviceId,
//     serviceName: service.title,
//     serviceSlug: service.slug,
//     uploadedDocuments,
//   });

//   res.status(201).json({
//     success: true,
//     message: "Application submitted successfully",
//     data: app,
//   });
// });

// /* =========================================================
//    GET ALL APPLICATIONS (Admin)
// ========================================================= */

// export const getAllApplications = asyncHandler(async (req, res) => {
//   const { serviceId, status } = req.query;

//   const filter = {};
//   if (serviceId) filter.serviceId = serviceId;
//   if (status) filter.status = status;

//   const applications = await Application.find(filter)
//     .populate("serviceId", "title slug")
//     .sort({ createdAt: -1 });

//   res.json({
//     success: true,
//     data: applications,
//   });
// });

// /* =========================================================
//    GET SINGLE APPLICATION
// ========================================================= */

// export const getApplicationById = asyncHandler(async (req, res) => {
//   const app = await Application.findById(req.params.id).populate(
//     "serviceId",
//     "title slug requiredDocuments"
//   );

//   if (!app)
//     return res.status(404).json({ message: "Application not found" });

//   res.json({
//     success: true,
//     data: app,
//   });
// });

// /* =========================================================
//    UPDATE STATUS
// ========================================================= */

// export const updateApplicationStatus = asyncHandler(async (req, res) => {
//   const app = await Application.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );

//   if (!app)
//     return res.status(404).json({ message: "Application not found" });

//   res.json({
//     success: true,
//     message: "Status updated successfully",
//     data: app,
//   });
// });


// export const deleteApplication = asyncHandler(async (req, res) => {
//   const app = await Application.findById(req.params.id);

//   if (!app)
//     return res.status(404).json({ message: "Application not found" });

//   /* delete uploaded documents */
//   for (const file of app.uploadedDocuments || []) {
//     if (!file.publicId) continue;

//     try {
//       await cloudinary.uploader.destroy(file.publicId, {
//         resource_type: getResourceType(file.fileType),
//       });
//     } catch (err) {
//       console.log("Cloud delete error:", err.message);
//     }
//   }

//   /* delete generated pdf */
//   if (app.pdfPublicId) {
//     try {
//       await cloudinary.uploader.destroy(app.pdfPublicId, {
//         resource_type: "raw",
//       });
//     } catch (err) {
//       console.log("PDF delete error:", err.message);
//     }
//   }

//   await app.deleteOne();

//   res.json({
//     success: true,
//     message: "Application deleted successfully",
//   });
// });

// /* =========================================================
//    GENERATE + UPLOAD PDF (Direct Cloudinary)
// ========================================================= */

// export const generateAndUploadPDF = asyncHandler(async (req, res) => {
//   const app = await Application.findById(req.params.id);

//   if (!app)
//     return res.status(404).json({ message: "Application not found" });

//   /* delete old pdf if exists */
//   if (app.pdfPublicId) {
//     await cloudinary.uploader.destroy(app.pdfPublicId, {
//       resource_type: "raw",
//     });
//   }

//   const pdfBuffer = await generatePDFBuffer(app);

//   const filename = `Application-${cleanName(
//     app.userDetails?.name || "user"
//   )}-${app._id}`;

//   const result = await uploadBuffer(
//     pdfBuffer,
//     "applications/pdfs",
//     filename,
//     "application/pdf"
//   );

//   app.pdfUrl = result.secure_url;
//   app.pdfPublicId = result.public_id;
//   await app.save();

//   res.json({
//     success: true,
//     message: "PDF generated successfully",
//     pdfUrl: result.secure_url,
//   });
// });




//  *************



// import asyncHandler from "express-async-handler";
// import Application from "../models/Application.js";
// import Service from "../models/Service.js";
// import cloudinary from "../utils/cloudinary.js";
// import { uploadBuffer } from "../utils/uploadToCloudinary.js";
// import generatePDFBuffer from "../utils/generatePDF.js";

// /* ================= HELPERS ================= */

// const getResourceType = (mime = "") => {
//   if (!mime) return "raw";
//   if (mime.startsWith("image")) return "image";
//   if (mime.startsWith("video")) return "video";
//   return "raw";
// };

// const cleanName = (name = "file") =>
//   name.replace(/\.[^/.]+$/, "").replace(/\s+/g, "-").toLowerCase();

// /* =========================================================
//    SUBMIT APPLICATION
// ========================================================= */

// export const submitApplication = asyncHandler(async (req, res) => {
//   let { userDetails, serviceId } = req.body;

//   if (!userDetails || !serviceId) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing required fields",
//     });
//   }

//   /* Parse JSON safely */
//   if (typeof userDetails === "string") {
//     try {
//       userDetails = JSON.parse(userDetails);
//     } catch (err) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid userDetails JSON format",
//       });
//     }
//   }

//   const service = await Service.findById(serviceId);
//   if (!service) {
//     return res.status(404).json({
//       success: false,
//       message: "Service not found",
//     });
//   }

//   const uploadedDocuments = [];

//   /* Upload Files */
//   if (req.files?.documents) {
//     const files = Array.isArray(req.files.documents)
//       ? req.files.documents
//       : [req.files.documents];

//     for (const file of files) {
//       const filename = `${service.slug}-${cleanName(
//         file.originalname
//       )}-${Date.now()}`;

//       const result = await uploadBuffer(
//         file.buffer,
//         `applications/${service.slug}`,
//         filename,
//         file.mimetype
//       );

//       uploadedDocuments.push({
//         documentName: file.originalname,
//         fileURL: result.secure_url,
//         publicId: result.public_id,
//         fileType: file.mimetype,
//       });
//     }
//   }

//   const app = await Application.create({
//     userDetails,
//     serviceId,
//     serviceName: service.title,
//     serviceSlug: service.slug,
//     uploadedDocuments,
//   });

//   res.status(201).json({
//     success: true,
//     message: "Application submitted successfully",
//     data: app,
//   });
// });

// /* =========================================================
//    GET ALL APPLICATIONS
// ========================================================= */

// export const getAllApplications = asyncHandler(async (req, res) => {
//   const { serviceId, status } = req.query;

//   const filter = {};
//   if (serviceId) filter.serviceId = serviceId;
//   if (status) filter.status = status;

//   const applications = await Application.find(filter)
//     .populate("serviceId", "title slug")
//     .sort({ createdAt: -1 });

//   res.json({
//     success: true,
//     count: applications.length,
//     data: applications,
//   });
// });


// export const getApplicationById = asyncHandler(async (req, res) => {
//   const app = await Application.findById(req.params.id).populate(
//     "serviceId",
//     "title slug requiredDocuments"
//   );

//   if (!app) {
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

// /* =========================================================
//    UPDATE STATUS
// ========================================================= */

// export const updateApplicationStatus = asyncHandler(async (req, res) => {
//   const { status } = req.body;

//   const app = await Application.findById(req.params.id);
//   if (!app) {
//     return res.status(404).json({
//       success: false,
//       message: "Application not found",
//     });
//   }

//   app.status = status || app.status;
//   await app.save();

//   res.json({
//     success: true,
//     message: "Status updated successfully",
//     data: app,
//   });
// });


// export const deleteApplication = asyncHandler(async (req, res) => {
//   const app = await Application.findById(req.params.id);

//   if (!app) {
//     return res.status(404).json({
//       success: false,
//       message: "Application not found",
//     });
//   }

//   /* Delete uploaded documents */
//   for (const file of app.uploadedDocuments || []) {
//     if (!file.publicId) continue;

//     try {
//       await cloudinary.uploader.destroy(file.publicId, {
//         resource_type: getResourceType(file.fileType),
//       });
//     } catch (err) {
//       console.log("Cloud delete error:", err.message);
//     }
//   }

//   /* Delete generated PDF */
//   if (app.pdfPublicId) {
//     try {
//       await cloudinary.uploader.destroy(app.pdfPublicId, {
//         resource_type: "raw",
//       });
//     } catch (err) {
//       console.log("PDF delete error:", err.message);
//     }
//   }

//   await app.deleteOne();

//   res.json({
//     success: true,
//     message: "Application deleted successfully",
//   });
// });


// export const generateAndUploadPDF = asyncHandler(async (req, res) => {
//   const app = await Application.findById(req.params.id);

//   if (!app) {
//     return res.status(404).json({
//       success: false,
//       message: "Application not found",
//     });
//   }

//   /* Delete old PDF if exists */
//   if (app.pdfPublicId) {
//     await cloudinary.uploader.destroy(app.pdfPublicId, {
//       resource_type: "raw",
//     });
//   }

//   const pdfBuffer = await generatePDFBuffer(app);

//   const filename = `Application-${cleanName(
//     app.userDetails?.name || "user"
//   )}-${app._id}`;

//   const result = await uploadBuffer(
//     pdfBuffer,
//     "applications/pdfs",
//     filename,
//     "application/pdf"
//   );

//   app.pdfUrl = result.secure_url;
//   app.pdfPublicId = result.public_id;
//   await app.save();

//   res.json({
//     success: true,
//     message: "PDF generated successfully",
//     pdfUrl: result.secure_url,
//   });
// });