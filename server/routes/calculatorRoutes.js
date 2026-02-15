import express from "express";
import { calculateEMI, calculateGST, calculateIncomeTax, calculateSIP } from "../controllers/calculatorController.js";


const router = express.Router();

// Public routes - no authentication required
router.post("/income-tax", calculateIncomeTax);
router.post("/gst", calculateGST);
router.post("/emi", calculateEMI);
router.post("/sip", calculateSIP);

export default router;