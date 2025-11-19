import { Request, Response } from "express";
import {
  createRoleService,
  getRolesService,
  getRoleByIdService,
  updateRoleService,
  deleteRoleService,
} from "../service/roleService";

export const createRoleController = async (req: Request, res: Response) => {
  try {
    const role = await createRoleService(req.body);
    res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: role,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getRolesController = async (req: Request, res: Response) => {
  const roles = await getRolesService();
  res.status(200).json({ success: true, data: roles });
};

export const getRoleByIdController = async (req: Request, res: Response) => {
  const role = await getRoleByIdService(req.params.id);
  if (!role) {
    return res.status(404).json({ success: false, message: "Role not found" });
  }
  res.status(200).json({ success: true, data: role });
};

export const updateRoleController = async (req: Request, res: Response) => {
  const role = await updateRoleService(req.params.id, req.body);
  if (!role) {
    return res.status(404).json({ success: false, message: "Role not found" });
  }
  res.status(200).json({ success: true, message: "Role updated", data: role });
};

export const deleteRoleController = async (req: Request, res: Response) => {
  const role = await deleteRoleService(req.params.id);
  if (!role) {
    return res.status(404).json({ success: false, message: "Role not found" });
  }
  res.status(200).json({ success: true, message: "Role deleted" });
};
