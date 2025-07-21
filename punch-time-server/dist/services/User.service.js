"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.getAllUsers = exports.loginUser = exports.createAdminIfNotExists = void 0;
// src/services/User.service.ts
const _env_1 = require("../_env");
const UserRepository = __importStar(require("../repositories/User.repository"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createAdminIfNotExists = () => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield UserRepository.findUserByEmail(_env_1.ENV.ADMIN_EMAIL);
    if (!existing) {
        yield UserRepository.createUser({
            name: "Admin",
            email: _env_1.ENV.ADMIN_EMAIL,
            shift: "Morning Shift",
            role: "admin",
            password: _env_1.ENV.ADMIN_PASSWORD,
        });
        console.log("✅ Admin created");
    }
    else {
        console.log("ℹ️ Admin exists");
    }
});
exports.createAdminIfNotExists = createAdminIfNotExists;
const loginUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password, }) {
    const user = yield UserRepository.findUserByEmail(email);
    if (!user) {
        throw new Error("Invalid credentials. Please check your password.");
    }
    const isMatch = yield user.comparePassword(password);
    if (!isMatch) {
        throw new Error("Invalid credentials. Please check your password.");
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, _env_1.ENV.JWT_SECRET);
    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            shift: user.shift,
        },
        token,
    };
});
exports.loginUser = loginUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield UserRepository.getAllUsers();
});
exports.getAllUsers = getAllUsers;
