import { FilterQuery } from "mongoose";

import { ApiError } from "../errors";
import { Role } from "../models";
import { IRole } from "../types";

class RoleRepository {
  public async create(dto: IRole): Promise<IRole> {
    try {
      return await Role.create({ ...dto });
    } catch (err) {
      throw new ApiError(err.message, err.status);
    }
  }

  public async getOneByParams(params: FilterQuery<IRole>): Promise<IRole> {
    try {
      return await Role.findOne(params);
    } catch (err) {
      throw new ApiError(err.message, err.status);
    }
  }

  public async updateById(_id: string, role: IRole): Promise<IRole> {
    try {
      return await Role.findByIdAndUpdate(_id, { ...role }, { new: true });
    } catch (err) {
      throw new ApiError(err.message, err.status);
    }
  }

  public async deleteById(_id: string): Promise<void> {
    try {
      await Role.deleteOne({ _id });
    } catch (err) {
      throw new ApiError(err.message, err.status);
    }
  }
}
export const roleRepository = new RoleRepository();
