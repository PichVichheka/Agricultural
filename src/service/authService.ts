import { Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../model/userModel";

export const registerUser = async (req: Request) => {
  const { username, email, address, password, phone } = req.body;

  if (!username || !email || !password) {
    return {
      status: 400,
      body: { success: false, message: "Username, email, and password are required" },
    };
  }

  const existingUser = await UserModel.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) {
    const duplicateField = existingUser.email === email ? "Email" : "Phone";
    return {
      status: 409,
      body: { success: false, message: `${duplicateField} already exists` },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    username,
    email,
    address,
    phone,
    password: hashedPassword,
    roles: "Customer"
  });

  await newUser.save();

  return {
    status: 201,
    body: {
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          phone: newUser.phone,
          address: newUser.address,
          roles: newUser.roles,
        },
      },
    },
  };
};

export const loginUser = async (req: Request) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return { status: 400, body: { success: false, message: "Email does not exist" } };
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return { status: 401, body: { success: false, message: "Password is incorrect" } };
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || "your-secret-key",
    { expiresIn: "7d" }
  );

  return {
    status: 200,
    body: {
      success: true,
      message: "Login successful",
      data: {
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          address: user.address,
        },
        token,
      },
    },
  };
};

// --------------------
// Logout service
// --------------------
export const logoutUser = async (req: Request) => {
  // For JWT, server usually doesn't track logout (stateless)
  // We just return a success message. Client deletes the token.
  return {
    status: 200,
    body: {
      success: true,
      message: "Logout successful",
    },
  };
};
