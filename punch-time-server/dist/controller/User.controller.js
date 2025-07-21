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
exports.authUser = void 0;
const User_service_1 = require("../services/User.service");
const errorMessage_1 = __importDefault(require("../utils/errorMessage"));
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email.trim() || !password.trim()) {
            throw new Error("Email and password are required.");
        }
        const result = yield (0, User_service_1.loginUser)({
            email: email.trim(),
            password: password.trim(),
        });
        res.json(result);
    }
    catch (err) {
        res.status(401).json({ message: (0, errorMessage_1.default)(err) });
    }
});
exports.authUser = authUser;
