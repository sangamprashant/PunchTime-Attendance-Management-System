// src/app.ts
import express from "express";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));

// Middleware
app.use(express.json());

// Routes

export default app;
