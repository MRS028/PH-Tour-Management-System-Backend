/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TErrorSources, TGenericError } from "../interfaces/error.types";

export const validationError = (
  error: mongoose.Error.ValidationError,
): TGenericError => {
  const errorSources: TErrorSources[] = [];
  const errors = Object.values(error.errors);

  errors.forEach((errorObject: any) => {
    errorSources.push({
      path: errorObject.path,
      message: errorObject.message,
    });
  });
  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};