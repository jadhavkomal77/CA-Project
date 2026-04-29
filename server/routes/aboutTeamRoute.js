
import express from "express";

import {

addAboutTeam,
deleteAboutTeam,
getAboutTeam,
updateAboutTeam,

} from "../controllers/aboutTeam.controller.js";

const router = express.Router();

router.post("/add", addAboutTeam);

router.get("/all", getAboutTeam);

router.put("/update/:id", updateAboutTeam);

router.delete("/delete/:id", deleteAboutTeam);

export default router;