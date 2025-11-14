import mongoose from "mongoose"
import { environment } from "../config/environment"
import dotenv from "dotenv"

dotenv.config()

let cachedConnection: typeof mongoose | null = null

const connectDB = async (): Promise<void> => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log("[v0] Using cached MongoDB connection")
    return
  }

  try {
    const conn = await mongoose.connect(environment.MONGODB_URI)
    cachedConnection = conn
    console.log("[v0] MongoDB Connected:", conn.connection.host)
  } catch (error) {
    console.error("[v0] Database connection error:", error)
    throw new Error("Failed to connect to database")
  }
}

export default connectDB
