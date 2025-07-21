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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByRoleService = exports.adminCreateUserService = void 0;
const User_repository_1 = require("../repositories/User.repository");
/**
 * Admin service to create employee or manager.
 * - Prevents duplicate email
 * - Ensures only one manager per office branch
 *
 * @param data Partial<IUser> - User details
 * @returns The created user object
 * @throws Error if user already exists or manager already assigned
 */
const adminCreateUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const existingUser = yield (0, User_repository_1.findUserByEmail)(data.email);
    if (existingUser) {
        throw new Error("Employee with this email already exists.");
    }
    if (data.role === "manager") {
        const existingManager = yield (0, User_repository_1.getManagerOfOffice)(((_a = data.officeBranch) === null || _a === void 0 ? void 0 : _a.toString()) || "");
        if (existingManager) {
            throw new Error("Manager already exists for this office.");
        }
    }
    const user = yield (0, User_repository_1.createUser)(data);
    return user;
});
exports.adminCreateUserService = adminCreateUserService;
const getUsersByRoleService = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, User_repository_1.getUsersByRole)(role);
    return users;
});
exports.getUsersByRoleService = getUsersByRoleService;
