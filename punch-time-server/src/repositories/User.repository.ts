// repositories/User.repository.ts
import { UserModel, IUser } from "../models/User.model";

export const findUserByEmail = (email: string) => UserModel.findOne({ email });
export const createUser = (data: Partial<IUser>) => UserModel.create(data);
export const getAllUsers = () => UserModel.find();
