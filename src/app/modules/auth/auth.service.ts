import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
// import { IUser } from "../user/user.interface";
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import {
  createNewAccessTokenWithRefreshToken,
  // createUserToken,
} from "../../utils/userToken";
import {  JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";

// const credentialsLogin = async (payload: Partial<IUser>) => {
//   const { email, password } = payload;
//   const isUserExist = await User.findOne({ email });
//   if (!isUserExist) {
//     throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
//   }

//   const isPasswordMatched = await bcryptjs.compare(
//     password as string,
//     isUserExist.password as string
//   );
//   if (!isPasswordMatched) {
//     throw new AppError(httpStatus.BAD_REQUEST, "incorrect password");
//   }

//   const userTokens = createUserToken(isUserExist);

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { password: pass, ...rest } = isUserExist.toObject();

//   return {
//     accessToken: userTokens.accessToken,
//     refreshToken: userTokens.refreshToken,
//     user: rest,
//   };
// };

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );
  return { accessToken: newAccessToken };
};
const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {
  const user = await User.findById(decodedToken.id);

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found");
  }

  const isOldPasswordMatched = await bcryptjs.compare(
    oldPassword,
    user.password as string
  );

  if (!isOldPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Old password is incorrect");
  }


  const saltRounds = Number(envVars.BCRYPT_SALT_ROUNDS);
  if (!newPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, "New password is required");
  }

  user.password = await bcryptjs.hash(newPassword, saltRounds);
  await user.save();

  return "Password reset successful";
};


export const AuthService = {
  // credentialsLogin,
  getNewAccessToken,
  resetPassword,
};
