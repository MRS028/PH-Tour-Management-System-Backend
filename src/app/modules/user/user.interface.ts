import { Types } from "mongoose";

export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    USER = "USER",
    ADMIN = "ADMIN",
    GUIDE = "GUIDE"
}
export interface IAuthProvider {
    // id: string;
    provider: "google" | "facebook" | "twitter" | "github" | "credentials";
    providerId: string;
}
export enum isActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}
export interface IUser {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password ?: string;
    phone ?: string;
    picture?: string;
    address?: string;
    isDeleted?: boolean;
    isActive?: isActive;
    isVerified?: boolean;
    role : Role;
    auths: IAuthProvider[];
    bookings?: Types.ObjectId[];
    guides?: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;

}