// src/routes/admin.routes.ts
import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/authMiddleware";
import {
  adminCreateUserController,
  getUsersByRoleController,
} from "../controller/admin.user.controller";

const router = express.Router();

router.post(
  "/create-user",
  isAuthenticated,
  authorizeRoles("admin"),
  adminCreateUserController
);
router.get(
  "/role-user",
  isAuthenticated,
  authorizeRoles("admin"),
  getUsersByRoleController
);

export default router;
