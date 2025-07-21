"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_auth_controller_1 = require("../../controller/app/user.auth.controller");
const router = (0, express_1.Router)();
router.post("/login", user_auth_controller_1.appUserLogin);
exports.default = router;
