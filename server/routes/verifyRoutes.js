import express from "express";
import { verifyApplication } from "../controllers/verifyController.js";

const router = express.Router();

router.get("/:id", verifyApplication);

export default router;