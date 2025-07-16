import { authUser } from "../controller/User.controller";
import express from "express";

const router = express.Router();

router.post("/login", authUser);



export default router;
