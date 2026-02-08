import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { createDivisionSchema } from "./division.validation";


const router = Router();

router.post("/", 
    checkAuth(Role.ADMIN,Role.SUPER_ADMIN),
    validateRequest(createDivisionSchema)
)