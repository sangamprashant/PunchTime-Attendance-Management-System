import jwt from "jsonwebtoken";
import { ENV } from "../../_env";
import * as UserRepository from "../../repositories/User.repository";

export const mobileLoginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserRepository.findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials. Please check your password.");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials. Please check your password.");
  }

  const token = jwt.sign({ id: user._id, role: user.role }, ENV.JWT_SECRET);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      shift: user.shift,
    },
    token,
  };
};
