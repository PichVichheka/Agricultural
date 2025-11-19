import mongoose from "mongoose";
import IRole from "./roleModel";

export interface IUserRole extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  roleId: mongoose.Types.ObjectId ;
}

const UserRoleSchema = new mongoose.Schema<IUserRole>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
}, { timestamps: true });

export default mongoose.model<IUserRole>("UserRole", UserRoleSchema);