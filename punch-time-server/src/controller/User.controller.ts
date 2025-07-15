// /src/controller/User.controller.tsx
import { Request, Response } from "express";
import { loginUser } from "../services/User.service";
import errorMessage from "../utils/errorMessage";

export const authUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email.trim() || !password.trim()) {
      throw new Error("Email and password are required.");
    }
    const result = await loginUser({
      email: email.trim(),
      password: password.trim(),
    });
    res.json(result);
  } catch (err) {
    res.status(401).json({ message: errorMessage(err) });
  }
};
