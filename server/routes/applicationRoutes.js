import express from "express";
import * as ctrl from "../controllers/applicationController.js";
import { downloadApplicationPDF } from "../controllers/applicationPdfController.js";
import adminAuth from "../middlewares/adminAuth.js";
import upload from "../utils/applicationUpload.js";


const router = express.Router();

router.post("/",upload.fields([{ name: "documents" }]),ctrl.submitApplication);

router.get("/admin", adminAuth, ctrl.getAllApplications);
router.get("/admin/:id", adminAuth, ctrl.getApplicationById);
router.put("/admin/:id/status", adminAuth, ctrl.updateApplicationStatus);
router.delete("/admin/:id", adminAuth, ctrl.deleteApplication);

router.get("/admin/:id/pdf", adminAuth, downloadApplicationPDF);

export default router;