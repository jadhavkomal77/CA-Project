import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  documentName: { type: String, required: true },
  fileURL: { type: String, required: true },
  publicId: { type: String },
  uploadDate: { type: Date, default: Date.now },
   fileType: String, 
});

const applicationSchema = new mongoose.Schema(
  {
    userDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: String,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    serviceName: { type: String, required: true },
    serviceSlug: { type: String, required: true },
    uploadedDocuments: [documentSchema],
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    adminNotes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);