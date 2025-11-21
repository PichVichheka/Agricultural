// src/seed/seedRoles.ts
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { roleModel as RoleModel } from "../model/roleModel";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/agricultural";

// Updated roles with new descriptions
const rolesToSeed = [
  {
    name: "Admin",
    description: "Full access to the system, including managing users, roles, products, orders, and system settings."
  },
  {
    name: "Farmer",
    description: "Can manage their own products: add, edit, delete, and view product inventory and orders related to their products."
  },
  {
    name: "User",
    description: "Regular user with access to browse products, place orders, and manage their own profile and order history."
  },
];


const seedRoles = async () => {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB.");

    for (const roleData of rolesToSeed) {
      // Check if role already exists
      const existingRole = await RoleModel.findOne({ name: roleData.name });
      if (existingRole) {
        console.log(`Role "${roleData.name}" already exists. Skipping...`);
        continue;
      }

      const role = await RoleModel.create(roleData);
      console.log(`Role "${role.name}" created with description: "${role.description}"`);
    }

    console.log("All roles seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding roles:", err);
    process.exit(1);
  }
};

seedRoles();
