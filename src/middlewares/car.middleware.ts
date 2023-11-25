import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { carRepository } from "../repositories";
import { brandRepository } from "../repositories/brand.repository";
import { modelRepository } from "../repositories/model.repository";

class CarMiddleware {
  public async findByIdBrandByThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { brandId } = req.params;

      const brand = await brandRepository.findById(brandId);
      if (!brand) {
        throw new ApiError("Brand not found", 404);
      }

      res.locals.brand = brand;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async findByIdByThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { carId } = req.params;
      const car = await carRepository.findById(carId);

      if (!car) {
        throw new ApiError("Car not found", 404);
      }

      res.locals.car = car;
      next();
    } catch (e) {
      next(e);
    }
  }
  public async isBrand( req: Request,
                        res: Response,
                        next: NextFunction,){
    try {
      const brand = await brandRepository.findOne(req.body.name);
      if(brand){
        throw new ApiError('Brand already exists', 409)
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isModel( req: Request,
                        res: Response,
                        next: NextFunction,){
    try {
      const model = await modelRepository.findOne(req.body.name);
      if(model){
        throw new ApiError('Model already exists', 409)
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const carMiddleware = new CarMiddleware();
