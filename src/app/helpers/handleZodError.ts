/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericError } from "../interfaces/error.types";

export const handleZodError = (error: any): TGenericError => {
  const errorSources: TErrorSources[] = [];

  error.issues.forEach((issue: any) => {
    errorSources.push({
      path: issue.path[issue.path.length - 1],
      message: issue,
    });
  });
  return {
    statusCode: 400,
    message: "Zo Error",
    errorSources: error.issues,
  };
};