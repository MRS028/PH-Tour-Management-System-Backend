import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { createDivisionSchema } from "./division.validation";
import { DivisionController } from "./division.controller";



const router = Router();

router.post("/", 
    checkAuth(Role.ADMIN,Role.SUPER_ADMIN),
    validateRequest(createDivisionSchema),
    DivisionController.createDivision
)
router.get("/", DivisionController.getAllDivisions);
router.get("/:slug", DivisionController.getSingleDivision);
router.patch("/:id", 
    checkAuth(Role.ADMIN,Role.SUPER_ADMIN),
    validateRequest(createDivisionSchema),
    DivisionController.updateDivision
);

router.delete("/:id",checkAuth(Role.ADMIN,Role.SUPER_ADMIN), DivisionController.deleteDivision);

export const DivisionRoute = router;