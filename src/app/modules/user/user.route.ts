import { Router } from "express";
import { UserControllers } from "./user.controller";

import { createUserSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";

import { Role } from "./user.interface";

import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.post(
  "/register",
  // validateRequest(createUserSchema),
  UserControllers.createUser
);

router.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  UserControllers.getAllUsers
);
router.patch(
  "/:id",
  checkAuth(...Object.values(Role)),
  UserControllers.updateUser
);

export const UserRoutes = router;
