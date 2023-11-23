import { ApiError } from "../errors";
import { roleRepository } from "../repositories/role.repository";
import { IRole } from "../types";

class RoleService {
  public async create(dto: IRole): Promise<IRole> {
    try {
      const role = await roleRepository.getOneByParams({ name: dto.name });
      if (role) {
        throw new ApiError("Such a role already exists", 404);
      }

      return await roleRepository.create(dto);
    } catch (err) {
      throw new ApiError(err.message, err.status);
    }
  }

  public async findById(roleId: string): Promise<IRole> {
    try {
      const role = await roleRepository.getOneByParams({ _id: roleId });
      return role;
    } catch (err) {
      throw new ApiError(err.message, err.status);
    }
  }

  public async updateById(roleId: string, dto: IRole): Promise<IRole> {
    try {
      const updatedRole = await roleRepository.updateById(roleId, dto);

      return updatedRole;
    } catch (err) {
      throw new ApiError(err.message, err.status);
    }
  }

  public async deleteById(roleId: string): Promise<void> {
    try {
      await roleRepository.deleteById(roleId);
    } catch (err) {
      throw new ApiError(err.message, err.status);
    }
  }
}

export const roleService = new RoleService();
