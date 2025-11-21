import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUserRole extends Document {
  userId: Types.ObjectId;
  roleId: Types.ObjectId;
}

const userRoleSchema = new Schema<IUserRole>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
});

export const userRoleModel = mongoose.model<IUserRole>("UserRole", userRoleSchema);
