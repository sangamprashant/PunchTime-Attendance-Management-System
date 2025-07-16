import { Router } from "express";
import {
  createBranch,
  getAllBranches,
  getBranchById,
  getBranchByPincode,
} from "../controller/OfficeBranch.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/authMiddleware";

const router = Router();

router.post("/", isAuthenticated, authorizeRoles("admin"), createBranch); // POST /branches
router.get("/", isAuthenticated, authorizeRoles("admin"), getAllBranches); // GET /branches
router.get("/pincode/:pincode", isAuthenticated, authorizeRoles("admin"), getBranchByPincode);
router.get("/:id", isAuthenticated, authorizeRoles("admin"), getBranchById); // GET /branches/:id

export default router;
