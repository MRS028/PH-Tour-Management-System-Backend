/* eslint-disable @typescript-eslint/no-unused-vars */
import { envVars } from "./../../config/env";
import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { IUser } from "../user/user.interface";
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { createUserToken } from "../../utils/userToken";
import { generateToken } from "../../utils/jwt";

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
  // const JwtPayload = {
  //   id: isUserExist._id,
  //   email: isUserExist.email,
  //   role: isUserExist.role,
  // };

  // const accessToken = jwt.sign(
  //   JwtPayload,
  //   envVars.JWT_SECRET,
  //   { expiresIn: envVars.JWT_EXPIRES_IN } as SignOptions
  // );
  // const refreshToken = jwt.sign(
  //   JwtPayload,
  //   envVars.JWT_REFRESH_SECRET,
  //   { expiresIn: envVars.JWT_REFRESH_EXPIRES_IN } as SignOptions
  // );
  const userTokens = createUserToken(isUserExist);

  const { password: pass, ...rest } = isUserExist.toObject();

  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: rest,
  };
};

const getNewAccessToken = async (refreshToken: string) => {
  const verifiedRefreshToken = jwt.verify(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as JwtPayload;
  const isUserExist = await User.findOne({ email: verifiedRefreshToken.email });
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
  }

  if (isUserExist.isActive === "INACTIVE") {
    throw new AppError(httpStatus.UNAUTHORIZED, "User is inactive");
  }
  if (isUserExist.isActive === "BLOCKED") {
    throw new AppError(httpStatus.UNAUTHORIZED, "User is blocked");
  }
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User is deleted");
  }

  const JwtPayload = {
    id: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = generateToken(
    JwtPayload,
    envVars.JWT_SECRET,
    envVars.JWT_EXPIRES_IN
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  credentialsLogin,
  getNewAccessToken,
};
