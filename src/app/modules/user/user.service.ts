import { IUser } from "./user.interface";
import { User } from "./user.model";


const createUser = async (payload: Partial<IUser>) => {
  const { name, email } = payload;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");

  }

  const user = await User.create({ name, email });
  return user;
};

export const UserServices = {
  createUser,
};
