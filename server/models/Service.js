

import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  title: String,
  desc: String,
  icon: String,
});

const processSchema = new mongoose.Schema({
  step: Number,
  title: String,
  desc: String,
});

const projectSchema = new mongoose.Schema({
  title: String,
  desc: String,
  image: String,
  tech: [String],
});

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDesc: { type: String, required: true },
    longDesc: String,
    slug: { type: String, unique: true },
    icon: { type: String, default: "⚡" },
    whyChoose: [featureSchema],
    process: [processSchema],
    technologies: [String],
    projects: [projectSchema],
    isActive: { type: Boolean, default: true },
    requiredDocuments: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);