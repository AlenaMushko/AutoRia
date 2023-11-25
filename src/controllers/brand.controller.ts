import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors";
import { brandService } from "../services/brand.service";
import { IBrand } from "../types";

class BrandController {
  public async findAll(req: Request,
                       res: Response,
                       next: NextFunction
  ): Promise<Response<IBrand[]>> {
    try {
      const brands = await brandService.findAll();
      if (!brands.length) {
        throw new ApiError("Brands not exists", 400);
      }

      return res
        .status(200)
        .json({ brands: brands });
    } catch (error) {
      next(error);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IBrand>> {
    try {
      const newBrand = await brandService.create(req.body);

      return res
        .status(201)
        .json({ message: "Brand is created", brand: newBrand });
    } catch (error) {
      next(error);
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IBrand>> {
    try {
      const brand = res.locals.brand;

      return res.status(200).json({ data: brand });
    } catch (error) {
      next(error);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IBrand>> {
    try {
      const { brandId } = req.params;
      await brandService.deleteById(brandId);

      return res.status(200).json({ message: `User id=${brandId} is deleted` });
    } catch (e) {
      next(e);
    }
  }
}

export const brandController = new BrandController();
