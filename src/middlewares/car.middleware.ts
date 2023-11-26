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

  public async findByIdModelByThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { modelId } = req.params;

      const model = await modelRepository.findById(modelId);
      if (!model) {
        throw new ApiError("Model not found", 404);
      }

      res.locals.model = model;
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
  public async isBrand(req: Request, res: Response, next: NextFunction) {
    try {
      const brand = await brandRepository.findOne(req.body.name);
      if (brand) {
        throw new ApiError("Brand already exists", 409);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isModel(req: Request, res: Response, next: NextFunction) {
    try {
      const model = await modelRepository.findOne(req.body.name);
      if (model) {
        throw new ApiError("Model already exists", 409);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public async userAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { account, _id } = res.locals.user;
      const userCars = await carRepository.getAllOwner(_id);
      if (account === "base" && userCars.length >= 1) {
        throw new ApiError(
          "Base account can create only one car. Please upgrade to premium.",
          403,
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const car = res.locals.car;
      if (car.status === "inactive") {
        throw new ApiError(
          "the status of your message is inactive, you can contact the manager",
          403,
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const carMiddleware = new CarMiddleware();
