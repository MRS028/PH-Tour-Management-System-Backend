/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { STATES } from "mongoose";

export const globalErrorHandlers = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";

  if (error.code === 11000) {
    // console.log("Duplicate key error detected");
    const duplicate = error.message.match(/"([^"]*)"/);
    statusCode = 400;
    message = ` ${
      duplicate ? duplicate[1] : ""
    } already exists. Use another one!`;
  } else if (error.name === "CastError") {
    statusCode = 400;
    message = `Invalid object id: ${error.value}.Please provide a valid id`;
  }
  else if (error.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((el: any) => el.message)
      .join(", ");
  }
   else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof Error) {
    statusCode = 500;
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error,
    stack: envVars.NODE_ENV === "development" ? error.stack : null,
  });
};
