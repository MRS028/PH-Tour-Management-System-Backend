import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import UserServices from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserServices.createUser(req.body);

    res.status(httpStatus.CREATED).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: `Internal server error occured ${error}`,
      error,
    });
  }
};

export const UserControllers = {
  createUser,
};
