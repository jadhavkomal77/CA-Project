// import express from "express";
// import { calculateEMI, calculateGST, calculateIncomeTax, calculateSIP } from "../controllers/calculatorController.js";


// const router = express.Router();

// // Public routes - no authentication required
// router.post("/income-tax", calculateIncomeTax);
// router.post("/gst", calculateGST);
// router.post("/emi", calculateEMI);
// router.post("/sip", calculateSIP);

// export default router;




import express from "express";
import {
  calculateEMI,
  calculateSIP,
  calculateGST,
  calculateIncomeTax,
  calculateAdvanceTax,
} from "../controllers/calculatorController.js";

const router = express.Router();

router.post("/emi", calculateEMI);
router.post("/sip", calculateSIP);
router.post("/gst", calculateGST);
router.post("/income-tax", calculateIncomeTax);
router.post("/advance-tax", calculateAdvanceTax);

export default router;
