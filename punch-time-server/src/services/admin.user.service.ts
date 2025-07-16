import { IUser } from "../models/User.model";
import {
    createUser,
    findUserByEmail,
    getManagerOfOffice,
    getUsersByRole,
} from "../repositories/User.repository";
import { Role } from "../types/common";

/**
 * Admin service to create employee or manager.
 * - Prevents duplicate email
 * - Ensures only one manager per office branch
 *
 * @param data Partial<IUser> - User details
 * @returns The created user object
 * @throws Error if user already exists or manager already assigned
 */
export const adminCreateUserService = async (data: Partial<IUser>) => {
  const existingUser = await findUserByEmail(data.email as string);

  if (existingUser) {
    throw new Error("Employee with this email already exists.");
  }

  if (data.role === "manager") {
    const existingManager = await getManagerOfOffice(
      data.officeBranch?.toString() || ""
    );

    if (existingManager) {
      throw new Error("Manager already exists for this office.");
    }
  }

  const user = await createUser(data);
  return user;
};

export const getUsersByRoleService = async (role: Role) => {
  const users = await getUsersByRole(role);
  return users;
};
