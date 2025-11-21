import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  addRolesToUser,
  logoutUser,
} from "../service/authService";
import { IRegisterInput, ILoginInput } from "../types/authType";


export const registerController = async (req: Request, res: Response) => {
  try {
    const input: IRegisterInput = req.body;
    const result = await registerUser(input);
    return res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const loginController = async (req: Request, res: Response) => {
  try {
    const input: ILoginInput = req.body;
    const result = await loginUser(input);
    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};


export const addRolesController = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const { roles } = req.body;
    const updatedRoles = await addRolesToUser(userId, roles);
    return res.status(200).json({ success: true, roles: updatedRoles });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  const result = await logoutUser();
  return res.status(200).json({ success: true, message: result.message });
};
