import httpStatus from "http-status-codes";
import { Request, Response } from "express";

const notfound = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Route not found",
  });
};

export default notfound;
