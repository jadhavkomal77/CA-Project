// import Testimonial from "../models/Testimonial.js";
// import cloudinary from "../utils/cloudinary.js";


// /* CREATE */
// export const createTestimonial = async (req, res) => {
//   try {
//     const { name, role, review, image, highlight } = req.body;

//     let imageUrl = "";

//     if (image) {
//       const uploaded = await cloudinary.uploader.upload(image, {
//         folder: "testimonials",
//       });
//       imageUrl = uploaded.secure_url;
//     }

//     const newItem = await Testimonial.create({
//       name,
//       role,
//       review,
//       highlight,
//       image: imageUrl,
//     });

//     res.json({ success: true, data: newItem });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// /* GET ALL */
// export const getTestimonials = async (req, res) => {
//   try {
//     const data = await Testimonial.find().sort({ createdAt: -1 });
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// /* DELETE */
// export const deleteTestimonial = async (req, res) => {
//   try {
//     await Testimonial.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// /* UPDATE */
// export const updateTestimonial = async (req, res) => {
//   try {
//     const { name, role, review, image, highlight } = req.body;

//     let updatedData = { name, role, review, highlight };

//     if (image) {
//       const uploaded = await cloudinary.uploader.upload(image, {
//         folder: "testimonials",
//       });
//       updatedData.image = uploaded.secure_url;
//     }

//     const updated = await Testimonial.findByIdAndUpdate(
//       req.params.id,
//       updatedData,
//       { new: true }
//     );

//     res.json({ success: true, data: updated });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };




import fs from "fs";
import Testimonial from "../models/Testimonial.js";
import cloudinary from "../utils/cloudinary.js";

/* 🌍 PUBLIC — GET ALL ACTIVE */
export const getPublicTestimonials = async (req,res)=>{
 try{
  const data = await Testimonial.find().sort({createdAt:-1});
  res.json(data);
 }catch(err){
  res.status(500).json({message:"Failed to load testimonials"});
 }
};



/* 🔐 ADMIN — GET ALL */
export const getAdminTestimonials = async (req,res)=>{
 try{
  const data = await Testimonial.find().sort({createdAt:-1});
  res.json(data);
 }catch(err){
  res.status(500).json({message:"Failed to load testimonials"});
 }
};



/* 🔐 CREATE */
export const createTestimonial = async (req,res)=>{
 try{

  const { name, role, review, highlight } = req.body;

  if(!name || !role || !review)
   return res.status(400).json({message:"All fields required"});


  /* IMAGE UPLOAD */
  let imageUrl;

  if(req.file){
   const uploadRes = await cloudinary.uploader.upload(
     req.file.path,
     { folder:"testimonials" }
   );

   imageUrl = uploadRes.secure_url;

   fs.unlinkSync(req.file.path);
  }


  const testimonial = await Testimonial.create({
   name,
   role,
   review,
   highlight,
   image:imageUrl
  });

  res.status(201).json({
   message:"Testimonial created",
   testimonial
  });

 }catch(err){
  res.status(500).json({message:"Create failed"});
 }
};



/* 🔐 UPDATE */
export const updateTestimonial = async (req,res)=>{
 try{

  const { name, role, review, highlight } = req.body;

  let data = { name, role, review, highlight };

  if(req.file){
   const uploadRes = await cloudinary.uploader.upload(
     req.file.path,
     { folder:"testimonials" }
   );

   data.image = uploadRes.secure_url;

   fs.unlinkSync(req.file.path);
  }

  const testimonial = await Testimonial.findByIdAndUpdate(
   req.params.id,
   data,
   { new:true }
  );

  res.json({
   message:"Updated successfully",
   testimonial
  });

 }catch(err){
  res.status(500).json({message:"Update failed"});
 }
};



/* 🔐 DELETE */
export const deleteTestimonial = async (req,res)=>{
 try{

  await Testimonial.findByIdAndDelete(req.params.id);

  res.json({message:"Deleted successfully"});

 }catch(err){
  res.status(500).json({message:"Delete failed"});
 }
};