import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    review: { type: String, required: true },
    image: { type: String }, // cloudinary url
    highlight: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);