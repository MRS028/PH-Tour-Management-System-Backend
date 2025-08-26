/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import { ZodObject, z } from "zod";
import { createUserSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserSchema),
  UserControllers.createUser
);
router.get("/all-users", UserControllers.getAllUsers);

export const UserRoutes = router;
