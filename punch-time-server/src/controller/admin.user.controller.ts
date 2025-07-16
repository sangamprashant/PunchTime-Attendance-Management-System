// src/controllers/admin.user.controller.ts
import { Request, Response } from "express";
import {
  adminCreateUserService,
  getUsersByRoleService,
} from "../services/admin.user.service";
import errorMessage from "../utils/errorMessage";
import { Role } from "../types/common";

export const adminCreateUserController = async (
  req: Request,
  res: Response
) => {
  try {
    await adminCreateUserService(req.body);
    res.status(201).json({
      message: "User created successfully.",
    });
  } catch (error) {
    res.status(400).json({ message: errorMessage(error) });
  }
};

export const getUsersByRoleController = async (req: Request, res: Response) => {
  try {
    const { role } = req.query;
    const users = await getUsersByRoleService(role as Role);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: errorMessage(error) });
  }
};
