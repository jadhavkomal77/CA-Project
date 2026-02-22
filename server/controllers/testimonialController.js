
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



export const createTestimonial = async (req,res)=>{
 try{
  const { name, role, review, highlight } = req.body;

  if(!name || !role || !review)
   return res.status(400).json({message:"All fields required"});

  const highlightBool = highlight === "true" || highlight === true;

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
   highlight: highlightBool,
   image:imageUrl
  });

  res.status(201).json(testimonial);

 }catch(err){
  res.status(500).json({message:err.message});
 }
};


/* 🔐 UPDATE */
export const updateTestimonial = async (req,res)=>{
 try{
  const { name, role, review, highlight } = req.body;

  const highlightBool = highlight === "true" || highlight === true;

  let data = {
    name,
    role,
    review,
    highlight: highlightBool
  };

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

  res.json(testimonial);

 }catch(err){
  res.status(500).json({message:err.message});
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