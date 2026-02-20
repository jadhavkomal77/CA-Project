import express from "express";
import {
  submitApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication
} from "../controllers/applicationController.js";

import adminAuth from "../middlewares/adminAuth.js";
import { downloadApplicationPDF } from "../controllers/applicationPdfController.js";

const router = express.Router();


// Submit application
router.post("/", submitApplication);

router.get("/admin", adminAuth, getAllApplications);

// Get single application
router.get("/admin/:id", adminAuth, getApplicationById);

// Update status
router.put("/admin/:id/status", adminAuth, updateApplicationStatus);

// Delete application
router.delete("/admin/:id", adminAuth, deleteApplication);

// Download PDF
router.get("/admin/:id/pdf", adminAuth, downloadApplicationPDF);


export default router;