"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_controller_1 = require("../controller/User.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/login", User_controller_1.authUser);
exports.default = router;
