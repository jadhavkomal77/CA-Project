
import express from "express";
import {
  submitApplication,
  getAllApplications,
  updateApplicationStatus,
  generateAndUploadPDF,
  deleteApplication,
  downloadApprovedPDF,
  getApplicationAnalytics,
  getApplicationById,
} from "../controllers/applicationController.js";

import upload from "../utils/applicationUpload.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([{ name: "documents" }]),
  submitApplication
);

router.get("/admin/analytics", adminAuth, getApplicationAnalytics);

router.get("/admin", adminAuth, getAllApplications);

router.get("/admin/:id", adminAuth, getApplicationById);

router.put("/admin/:id/status", adminAuth, updateApplicationStatus);

router.post("/admin/:id/generate-pdf", adminAuth, generateAndUploadPDF);

router.get("/admin/:id/download", adminAuth, downloadApprovedPDF);

router.delete("/admin/:id", adminAuth, deleteApplication);

export default router;