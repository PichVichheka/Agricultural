import UserModel from "../model/userModel";
import RoleModel from "../model/roleModel";
import bcrypt from "bcryptjs";

export const registerUserService = async (data: any) => {
  const { username, email, password, roles, phone, address } = data;

  // Check duplicate
  const exists = await UserModel.findOne({ email });
  if (exists) throw new Error("Email already exists!");

  // Hash password
  const hashedPass = await bcrypt.hash(password, 10);

  // Find role documents
  const roleDocs = await RoleModel.find({ name: { $in: roles } });

  // Create user
  const newUser = await UserModel.create({
    username,
    email,
    password: hashedPass,
    phone,
    address,
    roles: roleDocs.map((r) => r._id),
  });

  return newUser;
};

export const loginUserService = async (data: any) => {
  const { email, password } = data;

  const user = await UserModel.findOne({ email }).populate("roles");
  if (!user) throw new Error("User not found");

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Incorrect password");

  
};

export const getUserByIdService = async (id: string) => {
  const user = await UserModel.findById(id).populate("roles");
  if (!user) throw new Error("User not found");
  return user;
};

export const getAllUsersService = async () => {
  return await UserModel.find().populate("roles");
};
