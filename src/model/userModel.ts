import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  status: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

// Note the default export using typed model
export const userModel = mongoose.model<IUser>("User", userSchema);
