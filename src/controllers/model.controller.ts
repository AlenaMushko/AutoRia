import { NextFunction, Request, Response } from "express";
import { modelService } from "../services/model.service";
import { IModel } from "../types";

class ModelController {
  // public async findAll(req: Request,
  //                      res: Response,
  //                      next: NextFunction
  // ): Promise<Response<IBrand[]>> {
  //   try {
  //     const brands = await brandService.findAll();
  //     if (!brands.length) {
  //       throw new ApiError("Brands not exists", 400);
  //     }
  //
  //     return res
  //       .status(200)
  //       .json({ brands: brands });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IModel>> {
    try {
      const newModel = await modelService.create(req.body);

      return res
        .status(201)
        .json({ message: "Model is created", brand: newModel});
    } catch (error) {
      next(error);
    }
  }

  // public async findById(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<Response<IBrand>> {
  //   try {
  //     const brand = res.locals.brand;
  //
  //     return res.status(200).json({ data: brand });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  //
  // public async deleteById(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<Response<IBrand>> {
  //   try {
  //     const { brandId } = req.params;
  //     await brandService.deleteById(brandId);
  //
  //     return res.status(200).json({ message: `User id=${brandId} is deleted` });
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  // public async updateById(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ): Promise<Response<IUser>> {
  //   try {
  //     const { userId } = req.params;
  //     const user = res.locals.user;
  //     const value = req.body;
  //     const updatedUser = await userService.updateById(userId, user, value);
  //
  //     return res
  //       .status(200)
  //       .json({ message: "User is updated", user: updatedUser });
  //   } catch (e) {
  //     next(e);
  //   }
  // }
  //


}

export const modelController = new ModelController();
