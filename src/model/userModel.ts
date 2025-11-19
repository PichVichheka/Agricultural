import mongoose, { ObjectId, Schema, model } from "mongoose";




export interface IUser {
  username: string;
  email: string;
  password: string;
  status: "active" | "inactive";
  address?: string | null;
  phone?: string | null;
  // ...other fields...
}

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, unique: true, sparse: true }, // optional, but unique
  roles: [{ type: String, default: "Customer" }],
  address: String,
}, { timestamps: true });

export default model("User", UserSchema);

