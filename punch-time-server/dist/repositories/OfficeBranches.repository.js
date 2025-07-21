"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = exports.findByPincode = exports.getAllOfficeBranch = exports.createOfficeBranch = void 0;
const OfficeBranch_model_1 = require("../models/OfficeBranch.model");
/**
 * Create a new office branch
 * @param data Partial branch data
 * @returns The created office branch
 */
const createOfficeBranch = (data) => OfficeBranch_model_1.OfficeBranchModel.create(data);
exports.createOfficeBranch = createOfficeBranch;
/**
 * Get all office branches
 * @returns Array of all office branches
 */
const getAllOfficeBranch = () => OfficeBranch_model_1.OfficeBranchModel.find();
exports.getAllOfficeBranch = getAllOfficeBranch;
/**
 * Find office branches by pincode
 * @param pincode Pincode to search by
 * @returns Array of matching branches
 */
const findByPincode = (pincode) => OfficeBranch_model_1.OfficeBranchModel.find({ pincode });
exports.findByPincode = findByPincode;
/**
 * Find a branch by ID
 * @param id MongoDB branch ID
 * @returns The matching office branch or null
 */
const findById = (id) => OfficeBranch_model_1.OfficeBranchModel.findById(id);
exports.findById = findById;
