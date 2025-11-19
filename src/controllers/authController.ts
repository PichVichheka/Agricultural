import { Request, Response } from "express";
import { registerUser, loginUser, logoutUser } from "../service/authService";

export const registerController = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req);
    return res.status(result.status).json(result.body);
  } catch (error: any) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req);
    return res.status(result.status).json(result.body);
  } catch (error: any) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  try {
    const result = await logoutUser(req);
    return res.status(result.status).json(result.body);
  } catch (error: any) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
