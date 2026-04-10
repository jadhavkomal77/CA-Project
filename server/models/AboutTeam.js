// models/aboutteam/AboutTeam.js
import mongoose from "mongoose";

const aboutTeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      default: "",
    },
    img: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const AboutTeam = mongoose.model("AboutTeam", aboutTeamSchema);

export default AboutTeam;