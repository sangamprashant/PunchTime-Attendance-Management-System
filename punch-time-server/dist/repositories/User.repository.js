"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByRole = exports.getManagerOfOffice = exports.getAllUsers = exports.createUser = exports.findUserByEmail = void 0;
// repositories/User.repository.ts
const User_model_1 = require("../models/User.model");
const findUserByEmail = (email) => User_model_1.UserModel.findOne({ email });
exports.findUserByEmail = findUserByEmail;
const createUser = (data) => User_model_1.UserModel.create(data);
exports.createUser = createUser;
const getAllUsers = () => User_model_1.UserModel.find();
exports.getAllUsers = getAllUsers;
const getManagerOfOffice = (office) => User_model_1.UserModel.findOne({ officeBranch: office, role: "manager" });
exports.getManagerOfOffice = getManagerOfOffice;
const getUsersByRole = (role) => User_model_1.UserModel.find({ role: role }).populate("officeBranch");
exports.getUsersByRole = getUsersByRole;
