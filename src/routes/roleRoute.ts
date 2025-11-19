import express from "express";
import { createRoleController } from "../controllers/roleController";

const router = express.Router();

router.post("/roles", createRoleController);
router.post("/", createRoleController);


export default router;
