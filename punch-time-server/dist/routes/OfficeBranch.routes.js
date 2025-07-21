"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OfficeBranch_controller_1 = require("../controller/OfficeBranch.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.isAuthenticated, (0, authMiddleware_1.authorizeRoles)("admin"), OfficeBranch_controller_1.createBranch); // POST /branches
router.get("/", authMiddleware_1.isAuthenticated, (0, authMiddleware_1.authorizeRoles)("admin"), OfficeBranch_controller_1.getAllBranches); // GET /branches
router.get("/pincode/:pincode", authMiddleware_1.isAuthenticated, (0, authMiddleware_1.authorizeRoles)("admin"), OfficeBranch_controller_1.getBranchByPincode);
router.get("/:id", authMiddleware_1.isAuthenticated, (0, authMiddleware_1.authorizeRoles)("admin"), OfficeBranch_controller_1.getBranchById); // GET /branches/:id
exports.default = router;
