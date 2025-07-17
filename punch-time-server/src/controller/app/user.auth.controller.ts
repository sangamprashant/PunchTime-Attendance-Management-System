import { Request, Response } from "express";
import errorMessage from "../../utils/errorMessage";
import { mobileLoginUser } from "../../services/app/user.auth.service";

export const appUserLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userData = await mobileLoginUser({ email, password });
    res.status(200).json(userData);
  } catch (error) {
    res.status(401).json({ message: errorMessage(error) });
  }
};
