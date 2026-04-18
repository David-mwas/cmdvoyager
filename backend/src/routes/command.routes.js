import express from "express";
import * as ctrl from "../controllers/command.controller.js";

const router = express.Router();

router.get("/", ctrl.getCommands);
router.post("/", ctrl.createCommand);

router.get("/:id", ctrl.getCommand);
router.patch("/:id", ctrl.updateCommand);
router.delete("/:id", ctrl.deleteCommand);

router.post("/:id/interact", ctrl.interact);

export default router;
