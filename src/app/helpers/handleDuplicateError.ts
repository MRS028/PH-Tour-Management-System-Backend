/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericError } from "../interfaces/error.types";

export const handleDuplicateError = (error: any): TGenericError => {
  const duplicate = error.message.match(/"([^"]*)"/);

  return {
    statusCode: 400,
    message: ` ${
      duplicate ? duplicate[1] : ""
    } already exists. Use another one!`,
  };
};