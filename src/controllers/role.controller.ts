import { NextFunction, Request, Response } from "express";

import { roleService } from "../services/role.service";
import { IMessage, IRole } from "../types";

class RoleController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IRole>> {
    try {
      const newRole = await roleService.create(req.body);

      return res
        .status(201)
        .json({ message: "User is created", data: newRole });
    } catch (error) {
      next(error);
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IRole>> {
    try {
      const { roleId } = req.params;
      const role = await roleService.findById(roleId);
      return res.status(200).json({ data: role });
    } catch (error) {
      next(error);
    }
  }

  public async updateByIdPut(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IRole>> {
    try {
      const { roleId } = req.params;
      const updatedRole = await roleService.updateById(roleId, req.body);

      return res.status(200).json({ message: "User is updated", data: updatedRole });
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IMessage>> {
    try {
      const { roleId } = req.params;
      await roleService.deleteById(roleId);
      return res.status(200).json({ message: "User is deleted" });
    } catch (e) {
      next(e);
    }
  }
}

export const roleController = new RoleController();
