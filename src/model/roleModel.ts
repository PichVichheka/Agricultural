import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
  description?: string;
}

const roleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export const roleModel = mongoose.model<IRole>("Role", roleSchema);
