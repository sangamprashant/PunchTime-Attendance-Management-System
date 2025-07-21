"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const OfficeBranch_routes_1 = __importDefault(require("./routes/OfficeBranch.routes"));
const User_routes_1 = __importDefault(require("./routes/User.routes"));
const admin_user_routes_1 = __importDefault(require("./routes/admin.user.routes"));
const user_auth_routes_1 = __importDefault(require("./routes/app/user.auth.routes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
// ✅ CORS configuration
const allowedOrigins = [
    "http://localhost:5173",
    "http://192.168.107.177:19006", // Expo dev tools (browser UI)
    "exp://192.168.107.177:8081", // Expo app connection
    "http://192.168.107.177:8081", // Sometimes RN sends request from http
    "http://192.168.107.177:8080", // Backup if dev tools use this port
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express_1.default.json());
// routes - for dashboad
app.use("/api/v1/users", User_routes_1.default);
app.use("/api/v1/branches", OfficeBranch_routes_1.default);
app.use("/api/v1/admin", admin_user_routes_1.default);
// routes - for mobile app
app.use("/api/v2/user", user_auth_routes_1.default);
exports.default = app;
