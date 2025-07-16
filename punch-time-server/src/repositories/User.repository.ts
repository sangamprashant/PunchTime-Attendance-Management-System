// repositories/User.repository.ts
import { IUser, UserModel } from "../models/User.model";
import { Role } from "../types/common";

export const findUserByEmail = (email: string) => UserModel.findOne({ email });
export const createUser = (data: Partial<IUser>) => UserModel.create(data);
export const getAllUsers = () => UserModel.find();
export const getManagerOfOffice = (office: string) =>
  UserModel.findOne({ officeBranch: office, role: "manager" });
export const getUsersByRole = (role: Role) =>
  UserModel.find({ role: role }).populate("officeBranch");
