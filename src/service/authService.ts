import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserModel from "../model/userModel";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, address, password, phone } = req.body;
    console.log("Registering user with data:", req.body);

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Full name, email, and password are required" });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      username,
      email,
      address,
      phone,
      password: hashedPassword,
    
    });

    await newUser.save();

  
    return res.status(201).json({
      message: "User registered successfully",
      data: {
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          phone: newUser.phone,
          address: newUser.address,
         
        },
      
      },
    });
  } catch (error) {
    console.error("Add user error:", error);
    return res.status(500).json({ message: "An error occurred during registration" });
  }
};
