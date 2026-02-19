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

/* =====================================================
   📤 SUBMIT APPLICATION (ENHANCED)
===================================================== */
export const submitApplication = asyncHandler(async (req, res) => {
  let { userDetails, serviceId } = req.body;

  /* JSON parse */
  if (typeof userDetails === "string") {
    try {
      userDetails = JSON.parse(userDetails);
    } catch {
      return res.status(400).json({
        success:false,
        message:"Invalid userDetails format"
      });
    }
  }

  const { name, email, phone } = userDetails || {};

  if (!name || !email || !phone || !serviceId)
    return res.status(400).json({
      success:false,
      message:"Required fields missing"
    });

  /* Service check */
  const service = await Service.findById(serviceId);
  if (!service)
    return res.status(404).json({
      success:false,
      message:"Service not found"
    });

  /* =========================================
     FILE UPLOAD WITH REAL DOCUMENT NAMES
  ========================================= */
  const uploadedDocuments = [];

  if (req.files?.length) {
    for (let i = 0; i < req.files.length; i++) {

      const file = req.files[i];

      const result = await cloudinary.uploader.upload(file.path, {
        folder:`applications/${serviceId}`,
        resource_type:"auto"
      });

      uploadedDocuments.push({
        documentName:
          service.requiredDocuments?.[i] ||
          file.originalname,     // fallback
        fileURL: result.secure_url,
        publicId: result.public_id,
        uploadDate: new Date()
      });
    }
  }

  /* SAVE */
  const application = await Application.create({
    userDetails,
    serviceId,
    serviceName: service.title,
    serviceSlug: service.slug,
    uploadedDocuments,
    status:"Pending"
  });

  /* EMAIL RECEIPT */
  try{
    await sendEmail({
      to: email,
      subject: "Application Submitted Successfully",
      html: `
        <h2>Hello ${name}</h2>
        <p>Your application for <b>${service.title}</b> has been received.</p>
        <p>Status: <b>Pending</b></p>
        <p>Reference ID: <b>${application._id}</b></p>
      `
    });
  }catch(e){
    console.log("Mail failed:",e.message);
  }

  res.status(201).json({
    success:true,
    message:"Application submitted successfully",
    data:application
  });
});


/* =====================================================
   📋 GET ALL APPLICATIONS
===================================================== */
export const getAllApplications = asyncHandler(async (req,res)=>{

  const {serviceId,status}=req.query;

  const filter={};
  if(serviceId) filter.serviceId=serviceId;
  if(status) filter.status=status;

  const apps = await Application.find(filter)
    .populate("serviceId","title slug")
    .sort({createdAt:-1});

  res.json({
    success:true,
    count:apps.length,
    data:apps
  });
});


/* =====================================================
   📄 GET SINGLE APPLICATION
===================================================== */
export const getApplicationById = asyncHandler(async (req,res)=>{

  const app = await Application.findById(req.params.id)
  .populate("serviceId","title slug requiredDocuments");

  if(!app)
    return res.status(404).json({
      success:false,
      message:"Application not found"
    });

  res.json({
    success:true,
    data:app
  });
});


/* =====================================================
   ✏ UPDATE STATUS (EMAIL ENABLED)
===================================================== */
export const updateApplicationStatus = asyncHandler(async (req,res)=>{

  const {status,adminNotes}=req.body;

  const app = await Application.findByIdAndUpdate(
    req.params.id,
    {status,adminNotes},
    {new:true}
  );

  if(!app)
    return res.status(404).json({message:"Application not found"});

  /* SEND EMAIL */
  try{
  await sendEmail({
    to: app.userDetails.email,
    subject:`Application ${status}`,
    html:`
      <h2>Hello ${app.userDetails.name}</h2>
      <p>Your application for <b>${app.serviceName}</b> is now:</p>
      <h1 style="color:${status==="Approved"?"green":"red"}">${status}</h1>
      ${adminNotes?`<p><b>Note:</b> ${adminNotes}</p>`:""}
    `
  });
  }catch(e){
    console.log("Mail error:",e.message);
  }

  res.json({
    success:true,
    data:app
  });
});


/* =====================================================
   🗑 DELETE APPLICATION + CLOUDINARY CLEANUP
===================================================== */
export const deleteApplication = asyncHandler(async (req,res)=>{

  const app = await Application.findById(req.params.id);

  if(!app)
    return res.status(404).json({
      success:false,
      message:"Application not found"
    });

  /* delete cloudinary files */
  for(const doc of app.uploadedDocuments){
    if(doc.publicId){
      try{
        await cloudinary.uploader.destroy(doc.publicId);
      }catch(e){
        console.log("Cloud delete failed:",e.message);
      }
    }
  }

  await Application.findByIdAndDelete(req.params.id);

  res.json({
    success:true,
    message:"Application deleted successfully"
  });
});
