import { Request, Response } from "express";
import * as OfficeBranchService from "../services/OfficeBranch.service";
import errorMessage from "../utils/errorMessage";

export const createBranch = async (req: Request, res: Response) => {
  try {
    const branch = await OfficeBranchService.createBranch(req.body);
    res.status(201).json(branch);
  } catch (error) {
    res.status(400).json({ message: errorMessage(error) });
  }
};

export const getAllBranches = async (_req: Request, res: Response) => {
  try {
    const branches = await OfficeBranchService.getBranches();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: errorMessage(error) });
  }
};

export const getBranchById = async (req: Request, res: Response) => {
  try {
    const branch = await OfficeBranchService.getBranchById(req.params.id);
    if (!branch) return res.status(404).json({ message: "Branch not found" });
    res.json(branch);
  } catch (error) {
    res.status(400).json({ message: errorMessage(error) });
  }
};

export const getBranchByPincode = async (req: Request, res: Response) => {
  try {
    const branches = await OfficeBranchService.getBranchByPincode(
      Number(req.params.pincode)
    );
    res.json(branches);
  } catch (error) {
    res.status(400).json({ message: errorMessage(error) });
  }
};
