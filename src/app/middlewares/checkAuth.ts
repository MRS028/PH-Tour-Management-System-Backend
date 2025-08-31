import { verifyToken } from "./../utils/jwt";
import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";

import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new AppError(httpStatus.UNAUTHORIZED, "No token provided");
      }
      const verifiedToken = verifyToken(
        accessToken as string,
        envVars.JWT_SECRET
      ) as JwtPayload;

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
      }
      req.user = verifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  };
