/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await UserServices.createUser(req.body);

//     res.status(httpStatus.CREATED).json({
//       success: true,
//       message: "User created successfully",
//       user,
//     });
//   } catch (error: any) {
//     // console.log(error);
//     next(error);
//   }
// };

//get-all-users previous code
// const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const users = await UserServices.getAllUsers();
//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "Users fetched successfully",
//       users,
//     });
//   } catch (error: any) {
//     // console.log(error);
//     next(error);
//   }
// };

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User created successfully",
      data: user,
    });
  }
);
const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const verifiedToken = req.user as JwtPayload;
    
    if (!verifiedToken) {
      throw new Error("Unauthorized");
    }

    const payload = req.body;
    const user = await UserServices.updateUser(userId, payload, verifiedToken);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User updated successfully",
      data: user,
    });
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User created successfully",
      meta: { total: result.meta },
      data: result.data,
    });
  }
);

export const UserControllers = {
  createUser,
  getAllUsers,
  updateUser
};
