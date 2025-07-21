"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/admin.routes.ts
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const admin_user_controller_1 = require("../controller/admin.user.controller");
const router = express_1.default.Router();
router.post("/create-user", authMiddleware_1.isAuthenticated, (0, authMiddleware_1.authorizeRoles)("admin"), admin_user_controller_1.adminCreateUserController);
router.get("/role-user", authMiddleware_1.isAuthenticated, (0, authMiddleware_1.authorizeRoles)("admin"), admin_user_controller_1.getUsersByRoleController);
exports.default = router;
