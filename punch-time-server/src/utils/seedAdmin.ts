// utils/seedAdmin.ts
import * as UserService from "../services/User.service";

export const seedAdmin = async () => {
  await UserService.createAdminIfNotExists();
};
