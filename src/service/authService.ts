// src/service/authService.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Types } from "mongoose";

import { userModel as UserModel, IUser } from "../model/userModel";
import { roleModel as RoleModel, IRole } from "../model/roleModel";
import { userRoleModel as UserRoleModel, IUserRole } from "../model/userRoleModel";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
// Default: 7 days in seconds
const JWT_EXPIRES_IN_SECONDS = process.env.JWT_EXPIRES_IN
  ? parseInt(process.env.JWT_EXPIRES_IN, 10)
  : 7 * 24 * 60 * 60; // 7 days


const getUserRoles = async (userId: string): Promise<string[]> => {
  const userRoles = await UserRoleModel.find({ userId }).populate<{ roleId: IRole }>("roleId");
  return userRoles.map((ur) => ur.roleId.name);
};


export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}): Promise<{
  token: string;
  user: { id: string; name: string; email: string; phone?: string; roles: string[] };
}> => {
  const existingUser = await UserModel.findOne({ email: data.email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user: IUser = await UserModel.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    phone: data.phone || "",
  });

  const userId: Types.ObjectId = user._id as Types.ObjectId;

  let defaultRole = await RoleModel.findOne({ name: "User" });
  if (!defaultRole) {
    defaultRole = await RoleModel.create({ name: "User", description: "Default role" });
  }

  await UserRoleModel.create({ userId, roleId: defaultRole._id as Types.ObjectId });

  const roles = await getUserRoles(userId.toString());

  const token = jwt.sign({ id: userId.toString(), roles }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN_SECONDS,
  });

  return {
    token,
    user: {
      id: userId.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      roles,
    },
  };
};

// ------------------ Login User ------------------
export const loginUser = async (data: { email: string; password: string }) => {
  const user = await UserModel.findOne({ email: data.email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const userId: Types.ObjectId = user._id as Types.ObjectId;
  const roles = await getUserRoles(userId.toString());

  const token = jwt.sign({ id: userId.toString(), roles }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN_SECONDS,
  });

  return {
    token,
    user: {
      id: userId.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      roles,
    },
  };
};

// ------------------ Add Roles to Existing User ------------------
export const addRolesToUser = async (userId: string, newRoles: string[]): Promise<string[]> => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found");

  const dbUserId: Types.ObjectId = user._id as Types.ObjectId;

  for (const roleName of newRoles) {
    let role = await RoleModel.findOne({ name: roleName });
    if (!role) {
      role = await RoleModel.create({ name: roleName, description: "" });
    }

    const exists = await UserRoleModel.findOne({ userId: dbUserId, roleId: role._id as Types.ObjectId });
    if (!exists) {
      await UserRoleModel.create({ userId: dbUserId, roleId: role._id as Types.ObjectId });
    }
  }

  return getUserRoles(dbUserId.toString());
};

// ------------------ Logout User ------------------
export const logoutUser = async () => {
  return { message: "Logout successful. Delete token on client side." };
};
