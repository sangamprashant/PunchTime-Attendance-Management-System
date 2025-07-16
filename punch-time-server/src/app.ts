import cors from "cors";
import express from "express";
import morgan from "morgan";
import officeBranchRoutes from "./routes/OfficeBranch.routes";
import userRoutes from "./routes/User.routes";
import adminUserRoutes from "./routes/admin.user.routes";

const app = express();
app.use(morgan("dev"));

// ✅ CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.107.177:19006", // Expo dev tools (browser UI)
  "exp://192.168.107.177:8081", // Expo app connection
  "http://192.168.107.177:8081", // Sometimes RN sends request from http
  "http://192.168.107.177:8080", // Backup if dev tools use this port
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/branches", officeBranchRoutes);
app.use("/api/v1/admin", adminUserRoutes);

export default app;
