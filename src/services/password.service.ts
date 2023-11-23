import bcrypt from "bcrypt";

import { ApiError } from "../errors";

class PasswordService {
  public async hash(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 7);
      // 7 it is number( includes salt and round), can write default
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async compare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const passwordService = new PasswordService();
