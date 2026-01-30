import mongoose from "mongoose";
import { TGenericError } from "../interfaces/error.types";

export const handleCastError = (Error: mongoose.Error.CastError): TGenericError => {
  return {
    statusCode: 400,
    message: `Invalid object id: ${Error.value}.Please provide a valid id`,
  };
};
