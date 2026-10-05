import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // also used as the logo's alt text
    logo: { type: String }, // cloudinary url
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }, // manual display order, lowest first
  },
  { timestamps: true }
);

export default mongoose.model("Client", clientSchema);
