
// import asyncHandler from "express-async-handler";

// import Application from "../models/Application.js";
// import Service from "../models/Service.js";
// import cloudinary from "../utils/cloudinary.js";
// import { uploadBuffer } from "../utils/uploadToCloudinary.js";
// import generatePDFBuffer from "../utils/generatePDF.js";

// const getResourceType = (mime="")=>{
//   if(mime.startsWith("image")) return "image";
//   if(mime.startsWith("video")) return "video";
//   return "raw";
// };

// const cleanName = (name="file")=>{
//   return name
//    .replace(/\.[^/.]+$/,"")
//    .replace(/\s+/g,"-")
//    .toLowerCase();
// };
// export const submitApplication = asyncHandler(async (req,res)=>{

//   if(!req.body)
//     return res.status(400).json({message:"Body missing"});

//   let {userDetails,serviceId} = req.body;

//   if(!userDetails || !serviceId)
//     return res.status(400).json({message:"Missing fields"});

//   if(typeof userDetails==="string"){
//     try{
//       userDetails = JSON.parse(userDetails);
//     }catch{
//       return res.status(400).json({message:"Invalid JSON"});
//     }
//   }

//   const service = await Service.findById(serviceId);
//   if(!service)
//     return res.status(404).json({message:"Service not found"});

//   const uploadedDocuments = [];

//   /* ---------- FILE UPLOAD ---------- */
//   if(req.files?.documents){

//     const files = Array.isArray(req.files.documents)
//       ? req.files.documents
//       : [req.files.documents];

//     for(const file of files){

//       const filename =
//         `${service.slug}-${cleanName(file.originalname)}-${Date.now()}`;

//       const result = await uploadBuffer(
//         file.buffer,
//         `applications/${service.slug}`,
//         filename,
//         file.mimetype
//       );

//       uploadedDocuments.push({
//         documentName:file.originalname,
//         fileURL:result.secure_url,
//         publicId:result.public_id,
//         fileType:file.mimetype
//       });
//     }
//   }

//   const app = await Application.create({
//     userDetails,
//     serviceId,
//     serviceName:service.title,
//     serviceSlug:service.slug,
//     uploadedDocuments
//   });

//   res.status(201).json({success:true,data:app});
// });
// export const getAllApplications = asyncHandler(async (req,res)=>{

//   const {serviceId,status} = req.query;

//   const filter={};
//   if(serviceId) filter.serviceId=serviceId;
//   if(status) filter.status=status;

//   const apps = await Application.find(filter)
//     .populate("serviceId","title slug")
//     .sort({createdAt:-1});

//   res.json({success:true,data:apps});
// });
// export const getApplicationById = asyncHandler(async (req,res)=>{

//   const app = await Application.findById(req.params.id)
//     .populate("serviceId","title slug requiredDocuments");

//   if(!app)
//     return res.status(404).json({message:"Application not found"});

//   res.json({success:true,data:app});
// });
// export const updateApplicationStatus = asyncHandler(async (req,res)=>{

//   const app = await Application.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     {new:true}
//   );

//   if(!app)
//     return res.status(404).json({message:"Application not found"});

//   res.json({success:true,data:app});
// });
// export const deleteApplication = asyncHandler(async (req,res)=>{

//   const app = await Application.findById(req.params.id);
//   if(!app)
//     return res.status(404).json({message:"Application not found"});

//   /* delete uploaded docs */
//   for(const file of app.uploadedDocuments || []){

//     if(!file.publicId) continue;

//     try{
//       await cloudinary.uploader.destroy(
//         file.publicId,
//         {resource_type:getResourceType(file.fileType)}
//       );
//     }catch(err){
//       console.log("Cloud delete error:",err.message);
//     }
//   }

//   /* delete pdf */
//   if(app.pdfPublicId){
//     try{
//       await cloudinary.uploader.destroy(
//         app.pdfPublicId,
//         {resource_type:"raw"}
//       );
//     }catch{}
//   }

//   await app.deleteOne();

//   res.json({
//     success:true,
//     message:"Application deleted successfully"
//   });
// });
// export const generateAndUploadPDF = asyncHandler(async (req,res)=>{

//   const app = await Application.findById(req.params.id);

//   if(!app)
//     return res.status(404).json({message:"Application not found"});

//   /* delete old pdf */
//   if(app.pdfPublicId){
//     try{
//       await cloudinary.uploader.destroy(
//         app.pdfPublicId,
//         {resource_type:"raw"}
//       );
//     }catch{}
//   }

//   /* generate pdf buffer */
//   const pdfBuffer = await generatePDFBuffer(app);

//   const filename =
//     `Application-${cleanName(app.userDetails?.name || "user")}-${app._id}`;

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
//     success:true,
//     pdfUrl:result.secure_url
//   });
// });







import asyncHandler from "express-async-handler";
import Application from "../models/Application.js";
import Service from "../models/Service.js";
import cloudinary from "../utils/cloudinary.js";
import { uploadBuffer } from "../utils/uploadToCloudinary.js";

/* SUBMIT */
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