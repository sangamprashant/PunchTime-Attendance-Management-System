"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByRoleController = exports.adminCreateUserController = void 0;
const admin_user_service_1 = require("../services/admin.user.service");
const errorMessage_1 = __importDefault(require("../utils/errorMessage"));
const adminCreateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, admin_user_service_1.adminCreateUserService)(req.body);
        res.status(201).json({
            message: "User created successfully.",
        });
    }
    catch (error) {
        res.status(400).json({ message: (0, errorMessage_1.default)(error) });
    }
});
exports.adminCreateUserController = adminCreateUserController;
const getUsersByRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req.query;
        const users = yield (0, admin_user_service_1.getUsersByRoleService)(role);
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ message: (0, errorMessage_1.default)(error) });
    }
});
exports.getUsersByRoleController = getUsersByRoleController;
