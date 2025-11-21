import jwt from "jsonwebtoken";
import { tokenPayload } from "../types/UserType";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const generateToken = (payload: tokenPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};
export const verifyToken = (token: string): tokenPayload => {
  return jwt.verify(token, JWT_SECRET) as tokenPayload;
};