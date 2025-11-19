import { Router } from "express";
import authRoutes from "./authRoute";
import roleRoutes from "./roleRoute";

const router = Router();

router.use("/auth", authRoutes);
router.use("/roles", roleRoutes);

export default router;  