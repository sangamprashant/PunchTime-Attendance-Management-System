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
exports.appUserLogin = void 0;
const errorMessage_1 = __importDefault(require("../../utils/errorMessage"));
const user_auth_service_1 = require("../../services/app/user.auth.service");
const appUserLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userData = yield (0, user_auth_service_1.mobileLoginUser)({ email, password });
        res.status(200).json(userData);
    }
    catch (error) {
        res.status(401).json({ message: (0, errorMessage_1.default)(error) });
    }
});
exports.appUserLogin = appUserLogin;
