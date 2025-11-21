import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

// Routes
import userRoutes from "./routes/index";
import authRoutes from "./routes/authRoute";
import roleRoutes from "./routes/roleRoute";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Test route
app.get("/", (_req, res) => res.send("Server running"));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://vichheka:IRZ4OGbEgXDvx14t@cluster0.04g4nct.mongodb.net/Agri-Connect?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});
