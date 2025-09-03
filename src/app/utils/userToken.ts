import { envVars } from "../config/env";
import { IUser } from "../modules/user/user.interface";
import { generateToken } from "./jwt";

export const createUserToken = (user: Partial<IUser>) => {
  const JwtPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    JwtPayload,
    envVars.JWT_SECRET,
    envVars.JWT_EXPIRES_IN
  );
  const refreshToken = generateToken(
    JwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES_IN
  );
  return { accessToken, refreshToken };
};
