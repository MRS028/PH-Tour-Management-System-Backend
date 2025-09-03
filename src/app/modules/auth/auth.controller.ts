/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import AppError from "../../errorHelpers/AppError";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthService.credentialsLogin(req.body);
    res.cookie("accessToken", loginInfo.accessToken, {
      httpOnly: true,
      secure: false,
    });

    res.cookie("refreshToken", loginInfo.refreshToken, {
      httpOnly: true,
      secure: false,
      // maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User login successfull",
      data: loginInfo,
    });
  }
);

const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    // const refreshToken = req.headers.authorization;
    if (!refreshToken) {
      return next(new AppError(httpStatus.UNAUTHORIZED, "Refresh token is missing"));
    }
    const tokeninfo = await AuthService.getNewAccessToken(refreshToken);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "New access token generated successfully",
      data: tokeninfo,
    });
  }
);

export const AuthControllers = {
  credentialsLogin,
  getNewAccessToken,
};
