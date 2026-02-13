import express from "express";
import {
  getPublicPricing,
  getAdminPricing,
  createPricing,
  updatePricing,
  deletePricing,
  reorderPricing,
} from "../controllers/pricingController.js";

const router = express.Router();

/* 🌍 PUBLIC */
router.get("/public", getPublicPricing);

/* 🔐 ADMIN */
router.get("/", getAdminPricing);
router.post("/", createPricing);
router.put("/:id", updatePricing);
router.delete("/:id", deletePricing);
router.put("/reorder/all", reorderPricing);

export default router;
