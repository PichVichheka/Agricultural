import mongoose from "mongoose";
import UserModel from "../model/userModel";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log("DB Connected...");

    // Clear old users
    await UserModel.deleteMany({});
    console.log("Old user data removed.");

    // Insert seed data
    const users = [
      {
        username: "admin",
        email: "admin@gmail.com",
        password: await bcrypt.hash("123456", 10),
        phone: "097900000",
        address: "Phnom Penh",
        role: "admin"
      },
      {
        username: "user1",
        email: "user1@gmail.com",
        password: await bcrypt.hash("123456", 10),
        phone: "097911111",
        address: "Kandal",
        role: "user"
      }
    ];

    await UserModel.insertMany(users);

    console.log("Seed data added successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedUsers();
