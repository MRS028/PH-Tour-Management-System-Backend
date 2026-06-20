import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { DivisionService } from "./division.service";
import { sendResponse } from "../../utils/sendResponse";
import { IDivision } from "./division.interface";

const createDivision = catchAsync(async (req: Request, res: Response) => {
  // const result = await DivisionService.createDivision(req.body);
  // console.log({ file: req.file, body: req.body });

  const payload: IDivision = {
    ...req.body,
    thumbnail: req.file?.path,
  };
  const result = await DivisionService.createDivision(payload);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Division created successfully",
    data: result,
  });
});

const getAllDivisions = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await DivisionService.getAllDivisions(
    query as Record<string, string>,
  );
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All divisions fetched successfully",
    data: result,
  });
});
const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const result = await DivisionService.getSingleDivision(slug);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Single division fetched successfully",
    data: result,
  });
});
const updateDivision = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload: IDivision = {
    ...req.body,
    thumbnail: req.file?.path,
  };

  const result = await DivisionService.updateDivision(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Division updated successfully",
    data: result,
  });
});
const deleteDivision = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await DivisionService.deleteDivision(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Division deleted successfully",
    data: result,
  });
});

export const DivisionController = {
  createDivision,
  getAllDivisions,
  getSingleDivision,
  updateDivision,
  deleteDivision,
};
