import { Response } from "express";

interface TMeta {
  page: number;
  limit: number;
  total: number;
}

interface TResponse<T> {
  statuCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: TMeta;
}

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statuCode).json({
    success: data.success,
    statusCode: data.statuCode,
    message: data.message,
    data: data.data,
    meta: data.meta,
  });
};
