// import asyncHandler from "express-async-handler";
// import Application from "../module/Application.js";
// import Service from "../module/Service.js";
// import cloudinary from "../utils/cloudinary.js";

// // 📤 CREATE APPLICATION
// export const createApplication = asyncHandler(async (req, res) => {
//   const { userDetails, serviceId } = req.body;

//   // Validate service exists
//   const service = await Service.findById(serviceId);
//   if (!service) {
//     return res.status(404).json({
//       success: false,
//       message: "Service not found",
//     });
//   }

//   // Get required documents
//   const requiredDocuments = service.requiredDocuments || [];

//   // Validate uploaded files
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).json({
//       success: false,
//       message: "Please upload all required documents",
//     });
//   }

//   // Upload files to Cloudinary
//   const uploadedDocuments = [];
//   const uploadPromises = [];

//   for (const docName of requiredDocuments) {
//     const file = req.files[docName];
//     if (!file) {
//       return res.status(400).json({
//         success: false,
//         message: `Missing required document: ${docName}`,
//       });
//     }

//     uploadPromises.push(
//       cloudinary.uploader.upload(file.path, {
//         folder: `applications/${serviceId}`,
//         resource_type: "auto",
//       })
//     );
//   }

//   const uploadResults = await Promise.all(uploadPromises);

//   // Map uploaded files to documents
//   requiredDocuments.forEach((docName, index) => {
//     uploadedDocuments.push({
//       documentName: docName,
//       fileURL: uploadResults[index].secure_url,
//       publicId: uploadResults[index].public_id,
//     });
//   });

//   // Create application
//   const application = await Application.create({
//     userDetails: JSON.parse(userDetails),
//     serviceId,
//     serviceName: service.title,
//     serviceSlug: service.slug,
//     uploadedDocuments,
//   });

//   res.status(201).json({
//     success: true,
//     message: "Application submitted successfully",
//     data: application,
//   });
// });

// // 📋 GET ALL APPLICATIONS (Admin)
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

// // 📄 GET SINGLE APPLICATION
// export const getApplicationById = asyncHandler(async (req, res) => {
//   const application = await Application.findById(req.params.id).populate(
//     "serviceId",
//     "title slug requiredDocuments"
//   );

//   if (!application) {
//     return res.status(404).json({
//       success: false,
//       message: "Application not found",
//     });
//   }

//   res.json({
//     success: true,
//     data: application,
//   });
// });

// // ✏️ UPDATE APPLICATION STATUS
// export const updateApplicationStatus = asyncHandler(async (req, res) => {
//   const { status, adminNotes } = req.body;

//   const application = await Application.findByIdAndUpdate(
//     req.params.id,
//     {
//       status,
//       adminNotes,
//     },
//     { new: true }
//   );

//   if (!application) {
//     return res.status(404).json({
//       success: false,
//       message: "Application not found",
//     });
//   }

//   res.json({
//     success: true,
//     message: "Application status updated",
//     data: application,
//   });
// });

// // 🗑️ DELETE APPLICATION
// export const deleteApplication = asyncHandler(async (req, res) => {
//   const application = await Application.findById(req.params.id);

//   if (!application) {
//     return res.status(404).json({
//       success: false,
//       message: "Application not found",
//     });
//   }

//   // Delete files from Cloudinary
//   for (const doc of application.uploadedDocuments) {
//     if (doc.publicId) {
//       await cloudinary.uploader.destroy(doc.publicId);
//     }
//   }

//   await Application.findByIdAndDelete(req.params.id);

//   res.json({
//     success: true,
//     message: "Application deleted successfully",
//   });
// });






import asyncHandler from "express-async-handler";
import Application from "../models/Application.js";
import Service from "../models/Service.js";
import cloudinary from "../utils/cloudinary.js";
import sendEmail from "../utils/sendEmail.js";
import { uploadBuffer } from "../utils/uploadToCloudinary.js";

/* =====================================================
   📤 SUBMIT APPLICATION (FINAL PRODUCTION VERSION)
===================================================== */
export const submitApplication = asyncHandler(async (req, res) => {
  console.log("📥 Incoming application request");

  let { userDetails, serviceId } = req.body;

  /* ================= JSON PARSE ================= */
  if (typeof userDetails === "string") {
    try {
      userDetails = JSON.parse(userDetails);
    } catch (err) {
      console.log("❌ JSON Parse Error:", err.message);
      return res.status(400).json({
        success: false,
        message: "Invalid userDetails format",
      });
    }
  }

  const { name, email, phone } = userDetails || {};

  /* ================= VALIDATION ================= */
  if (!name || !email || !phone || !serviceId) {
    console.log("❌ Missing Fields");
    return res.status(400).json({
      success: false,
      message: "Name, email, phone and serviceId are required",
    });
  }

  /* ================= SERVICE CHECK ================= */
  const service = await Service.findById(serviceId);

  if (!service) {
    console.log("❌ Service not found:", serviceId);
    return res.status(404).json({
      success: false,
      message: "Service not found",
    });
  }

  /* ================= FILE UPLOAD ================= */
  const uploadedDocuments = [];

  if (req.files && req.files.documents) {
    const files = Array.isArray(req.files.documents)
      ? req.files.documents
      : [req.files.documents];

    console.log(`📁 Uploading ${files.length} files`);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      /* FILE TYPE VALIDATION */
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "application/pdf",
      ];

      if (!allowedTypes.includes(file.mimetype)) {
        console.log("❌ Invalid file type:", file.mimetype);
        return res.status(400).json({
          success: false,
          message: "Invalid file type. Only JPG, PNG, WEBP, PDF allowed",
        });
      }

      /* UPLOAD TO CLOUDINARY */
      let result;
      try {
        result = await uploadBuffer(
          file.data,
          `applications/${serviceId}`
        );

        console.log("☁ Uploaded:", result.secure_url);
      } catch (err) {
        console.log("❌ Cloudinary Upload Error:", err.message);
        return res.status(500).json({
          success: false,
          message: "File upload failed",
        });
      }

      /* PUSH DOC */
      uploadedDocuments.push({
        documentName: service.requiredDocuments?.[i] || file.name,
        fileURL: result.secure_url,
        publicId: result.public_id,
        uploadDate: new Date(),
      });
    }
  }

  /* ================= SAVE DB ================= */
  const application = await Application.create({
    userDetails,
    serviceId,
    serviceName: service.title,
    serviceSlug: service.slug,
    uploadedDocuments,
    status: "Pending",
  });

  console.log("✅ Application Saved:", application._id);

  /* ================= EMAIL ================= */
  try {
    await sendEmail({
      to: email,
      subject: "Application Submitted Successfully",
      html: `
        <h2>Hello ${name}</h2>
        <p>Your application for <b>${service.title}</b> has been received.</p>
        <p>Status: <b>Pending</b></p>
        <p>Reference ID: <b>${application._id}</b></p>
      `,
    });

    console.log("📧 Email sent to:", email);
  } catch (err) {
    console.log("⚠ Email Failed:", err.message);
  }

  /* ================= RESPONSE ================= */
  res.status(201).json({
    success: true,
    message: "Application submitted successfully",
    data: application,
  });
});

/* =====================================================
   📋 GET ALL APPLICATIONS
===================================================== */
export const getAllApplications = asyncHandler(async (req, res) => {
  console.log("📄 Fetching applications");

  const { serviceId, status } = req.query;

  const filter = {};
  if (serviceId) filter.serviceId = serviceId;
  if (status) filter.status = status;

  const apps = await Application.find(filter)
    .populate("serviceId", "title slug")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: apps.length,
    data: apps,
  });
});

/* =====================================================
   📄 GET SINGLE APPLICATION
===================================================== */
export const getApplicationById = asyncHandler(async (req, res) => {
  console.log("🔎 Fetching application:", req.params.id);

  const app = await Application.findById(req.params.id).populate(
    "serviceId",
    "title slug requiredDocuments"
  );

  if (!app) {
    console.log("❌ Application not found");
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

/* =====================================================
   ✏ UPDATE STATUS
===================================================== */
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status, adminNotes } = req.body;

  if (!status) {
    return res.status(400).json({
      success: false,
      message: "Status is required",
    });
  }

  const app = await Application.findByIdAndUpdate(
    req.params.id,
    { status, adminNotes },
    { new: true }
  );

  if (!app) {
    return res.status(404).json({
      success: false,
      message: "Application not found",
    });
  }

  console.log("✏ Status updated:", status);

  /* EMAIL */
  try {
    await sendEmail({
      to: app.userDetails.email,
      subject: `Application ${status}`,
      html: `
        <h2>Hello ${app.userDetails.name}</h2>
        <p>Your application for <b>${app.serviceName}</b> is now:</p>
        <h1 style="color:${status === "Approved" ? "green" : "red"}">${status}</h1>
        ${adminNotes ? `<p><b>Note:</b> ${adminNotes}</p>` : ""}
      `,
    });

    console.log("📧 Status email sent");
  } catch (err) {
    console.log("⚠ Email failed:", err.message);
  }

  res.json({
    success: true,
    data: app,
  });
});

/* =====================================================
   🗑 DELETE APPLICATION
===================================================== */
export const deleteApplication = asyncHandler(async (req, res) => {
  const app = await Application.findById(req.params.id);

  if (!app) {
    return res.status(404).json({
      success: false,
      message: "Application not found",
    });
  }

  /* DELETE CLOUD FILES */
  for (const doc of app.uploadedDocuments) {
    if (doc.publicId) {
      try {
        await cloudinary.uploader.destroy(doc.publicId);
        console.log("☁ Deleted:", doc.publicId);
      } catch (err) {
        console.log("⚠ Cloud delete failed:", err.message);
      }
    }
  }

  await Application.findByIdAndDelete(req.params.id);

  console.log("🗑 Application deleted:", req.params.id);

  res.json({
    success: true,
    message: "Application deleted successfully",
  });
});