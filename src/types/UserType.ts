import { Document } from "mongoose";
export interface IUser extends Document {
    _id: string;
    username: string;
    phone?: string;
    address?: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}       