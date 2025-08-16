import { Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from "http-status-codes";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });

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
