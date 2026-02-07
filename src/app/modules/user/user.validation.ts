import z from "zod";
import { isActive, Role } from "./user.interface";

export const createUserSchema = z.object({
 name: z.string({ message: "Name Must be String" }).min(2, { message: "Name is too short" }).max(50),
  email: z
    .string({ message: "Email Must be String" })
    .email({ message: "Invalid Email Address" }),
  password: z
    .string({ message: "Password Must be String" })
    .min(8, { message: "Password is too short" })
    .max(50)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    })
    .optional(),
  phone: z
    .string({ message: "Phone Must be String" })
    .regex(/^\+8801\d{9}|01\d{9}$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
  address: z.string({ message: "Address Must be String" }).max(150).optional(),
});

export const updateUserSchema = z.object({
  id: z.string({ message: "ID must be a string" }).uuid(),
  name: z
    .string({ message: "Name Must be String" })
    .min(2, { message: "Name is too short" })
    .max(50, { message: "Name is too long" })
    .optional(),
  email: z
    .string({ message: "Email Must be String" })
    .email({ message: "Invalid Email Address" })
    .optional(),
  password: z
    .string({ message: "Password Must be String" })
    .min(8, { message: "Password is too short" })
    .max(50)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    })
    .optional(),
  phone: z
    .string({ message: "Phone Must be String" })
    .regex(/^\+8801\d{9}|01\d{9}$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
  address: z.string({ message: "Address Must be String" }).max(150).optional(),
  role: z
    // enum(["user", "admin"], { message: "Role must be either 'user' or 'admin'" })
    .enum(Object.values(Role) as [string, ...string[]], {
      message: "Role must be either 'user' or 'admin'",
    })
    .optional(),
  isActive: z
    .enum(Object.values(isActive) as [string, ...string[]], {
      message: "isActive must be either 'active' or 'inactive'",
    })
    .optional(),
  isDeleted: z.boolean({ message: "isDeleted must be boolean" }).optional(),
  isVerified: z.boolean({ message: "isVerified must be boolean" }).optional(),
});
