// models/About.js
import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String, // Cloudinary URL
    required: true,
  },
  shortDetails: {
    type: String,
    required: true,
  },
});


const aboutSchema = new mongoose.Schema(
  {
    headingSmall: {
      type: String,
      default: "WHO WE ARE",
    },
    title: {
      type: String,
      required: true,
    },
    description1: {
      type: String,
      required: true,
    },
    description2: {
      type: String,
    },
    experience: {
      type: Number,
      default: 15,
    },
    image: {
      type: String, 
      required: true,
    },
      teamMembers: {
      type: [teamMemberSchema],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);
