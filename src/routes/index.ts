import { Router } from "express";
import authRoutes from "./authRoute";
import roleRoutes from "./roleRoute";
import { createRoleController } from "../controllers/roleController";
import { registerUser } from "../service/authService";
import {loginUser} from "../service/authService"
import { logoutUser } from "../service/authService";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser),


router.use("/auth", authRoutes);
router.use("/roles", roleRoutes);
router.post("/roles", createRoleController);
router.post("/", createRoleController);

export default router;  