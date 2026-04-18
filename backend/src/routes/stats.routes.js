import express from "express";
import * as ctrl from "../controllers/stats.controller.js";

const router = express.Router();

router.get("/", ctrl.getStats);

export default router;
