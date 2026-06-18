/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { STATES } from "mongoose";
import { error } from "console";
import mongoose from "mongoose";
import { handleDuplicateError } from "../helpers/handleDuplicateError";
import { handleCastError } from "../helpers/handleCastError";
import { handleZodError } from "../helpers/handleZodError";
import { validationError } from "../helpers/handleValidationError";
import { TErrorSources } from "../interfaces/error.types";
import { env } from "process";
import { deleteFromCloudinary } from "../config/cloudinary.config";

export const globalErrorHandlers = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (envVars.NODE_ENV === "development") {
    // console.log(error);
  }
  if (req.file) {
    await deleteFromCloudinary(req.file.path);
  }

  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    const imageUrls = (req.files as Express.Multer.File[]).map(
      (file) => file.path,
    );
    await Promise.all(imageUrls.map((url) => deleteFromCloudinary(url)));
  }

  let statusCode = 500;
  let message = "Something went wrong";
  let errorSource: any = [];

  if (error.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } else if (error.name === "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } else if (error.name === "ZodError") {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    errorSource = simplifiedError.errorSources as TErrorSources[];
    message = simplifiedError.message;
  }
  // mongoose validation error
  else if (error.name === "ValidationError") {
    const simplifiedError = validationError(error);
    statusCode = simplifiedError.statusCode;
    errorSource = simplifiedError.errorSources as TErrorSources[];
    message = simplifiedError.message;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof Error) {
    statusCode = 500;
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    error: envVars.NODE_ENV === "development" ? error : null,
    stack: envVars.NODE_ENV === "development" ? error.stack : null,
  });
};
