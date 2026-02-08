import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { DivisionService } from "./division.service";
import { sendResponse } from "../../utils/sendResponse";

const createDivision = catchAsync(async (req:Request,res: Response)=>{
    const result = await DivisionService.createDivision(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Division created successfully",
        data: result,
    });
});

const getAllDivisions = catchAsync(async (req:Request,res: Response)=>{
    const result = await DivisionService.getAllDivisions();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All divisions fetched successfully",
        data: result,
    });
});
const getSingleDivision = catchAsync(async (req:Request,res: Response)=>{
    const slug = req.params.slug
    const result = await DivisionService.getSingleDivision(slug);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Single division fetched successfully",
        data: result,
    });
});
const updateDivision = catchAsync(async (req:Request,res: Response)=>{
    const id = req.params.id;
    const result = await DivisionService.updateDivision(id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division updated successfully",
        data: result,
    });
});
const deleteDivision = catchAsync(async (req:Request,res: Response)=>{
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
    deleteDivision
}