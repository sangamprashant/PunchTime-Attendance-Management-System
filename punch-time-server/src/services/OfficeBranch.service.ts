// src/services/OfficeBranch.service.ts

import { IOfficeBranch } from "../models/OfficeBranch.model";
import * as OfficeBranchRepository from "../repositories/OfficeBranches.repository";

// Create a new branch if no duplicate pincode exists
export const createBranch = async (data: Partial<IOfficeBranch>) => {
  const existingBranches = await OfficeBranchRepository.findByPincode(data.pincode as number);

  if (existingBranches.length > 0) {
    throw new Error("A branch with this pincode already exists.");
  }

  return await OfficeBranchRepository.createOfficeBranch(data);
};

// Get all branches
export const getBranches = async () => {
  return await OfficeBranchRepository.getAllOfficeBranch();
};

// Get branch by ID
export const getBranchById = async (id: string) => {
  const branch = await OfficeBranchRepository.findById(id);
  if (!branch) throw new Error("Branch not found.");
  return branch;
};

// Get branches by pincode
export const getBranchByPincode = async (pincode: number) => {
  return await OfficeBranchRepository.findByPincode(pincode);
};
