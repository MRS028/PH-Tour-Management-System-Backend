import { envVars } from './../../config/env';
import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { IUser } from "../user/user.interface";
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import jwt, { SignOptions }  from "jsonwebtoken";

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
  const JwtPayload = {
    id: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = jwt.sign(
    JwtPayload,
    envVars.JWT_SECRET,
    { expiresIn: envVars.JWT_EXPIRES_IN } as SignOptions
  );
  
  return {
    // email: isUserExist.email,
    accessToken,
  };
};

export const AuthService = {
  credentialsLogin,
};
