import { IOfficeBranch, OfficeBranchModel } from "../models/OfficeBranch.model";

/**
 * Create a new office branch
 * @param data Partial branch data
 * @returns The created office branch
 */
export const createOfficeBranch = (data: Partial<IOfficeBranch>): Promise<IOfficeBranch> =>
  OfficeBranchModel.create(data);

/**
 * Get all office branches
 * @returns Array of all office branches
 */
export const getAllOfficeBranch = (): Promise<IOfficeBranch[]> =>
  OfficeBranchModel.find();

/**
 * Find office branches by pincode
 * @param pincode Pincode to search by
 * @returns Array of matching branches
 */
export const findByPincode = (pincode: number): Promise<IOfficeBranch[]> =>
  OfficeBranchModel.find({ pincode });

/**
 * Find a branch by ID
 * @param id MongoDB branch ID
 * @returns The matching office branch or null
 */
export const findById = (id: string): Promise<IOfficeBranch | null> =>
  OfficeBranchModel.findById(id);
