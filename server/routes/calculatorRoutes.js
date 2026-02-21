

import express from "express";
import {
  calculateEMI,
  calculateSIP,
  calculateGST,
  calculateIncomeTax,
  calculateAdvanceTax,
  searchGST,
} from "../controllers/calculatorController.js";

const router = express.Router();

router.post("/emi", calculateEMI);
router.post("/sip", calculateSIP);
router.post("/gst", calculateGST);
router.post("/income-tax", calculateIncomeTax);
router.post("/advance-tax", calculateAdvanceTax);
router.post("/gst-search", searchGST);

export default router;
