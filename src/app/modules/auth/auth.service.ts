import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { IUser } from "../user/user.interface";
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
  }

  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "incorrect password");
  }
  return {
    email: isUserExist.email,
  };
};

export const AuthService = {
  credentialsLogin,
};
