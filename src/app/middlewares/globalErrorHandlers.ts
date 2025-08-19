/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";

export const globalErrorHandlers = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(error.statusCode || 500).json({
        success: false,
        message: `Something went wrong ${error.message} from global error handler`,
        error,
        stack: envVars.NODE_ENV === "development" ? error.stack : null,
    });
};