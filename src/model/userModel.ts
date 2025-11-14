import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, unique: true, sparse: true }, // optional, but unique
  address: String,
}, { timestamps: true });

export default model("User", UserSchema);
