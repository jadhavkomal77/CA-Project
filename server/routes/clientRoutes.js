import express from "express";
import {
  getPublicClients,
  getAdminClients,
  createClient,
  updateClient,
  deleteClient,
  reorderClients,
} from "../controllers/clientController.js";

import upload from "../utils/upload.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

/* PUBLIC */
router.get("/public", getPublicClients);

/* ADMIN */
router.get("/", adminAuth, getAdminClients);

router.put("/reorder/all", adminAuth, reorderClients);

router.post("/", adminAuth, upload.single("logo"), createClient);

router.put("/:id", adminAuth, upload.single("logo"), updateClient);

router.delete("/:id", adminAuth, deleteClient);

export default router;
