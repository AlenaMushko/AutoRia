import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { carPresenter } from "../presenters";
import { carService } from "../services";
import { ICar } from "../types";

class CarController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar[]>> {
    try {
      // const cars = await carService.findWithPagination(
      //   req.query as unknown as IQuery,
      // );

      return res.status(200).json();
    } catch (e) {
      next(e);
    }
  }

  public async getAllOwner(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar[]>> {
    try {
      const { _id } = res.locals.user;
      const cars = await carService.getAllOwner(_id);

      return res.status(200).json(cars);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar>> {
    try {
      const { _id: _ownerId } = res.locals.user;
      const newCar = await carService.create({ ...req.body, _ownerId });
      return res.status(201).json({ message: "Car is created", car: newCar });
    } catch (e) {
      next(e);
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar>> {
    try {
      const car = res.locals.car;

      return res.status(200).json({ data: car });
    } catch (e) {
      next(e);
    }
  }

  public async updateByIdPut(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar>> {
    try {
      const { _id } = res.locals.user;
      const { carId } = req.params;
      const updatedCar = await carService.updateByIdPut(carId, req.body, _id);

      return res
        .status(200)
        .json({ messaga: "Car is updated", car: updatedCar });
    } catch (e) {
      next(e);
    }
  }

  public async updateByIdPatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar>> {
    try {
      const { _id } = res.locals.user;
      const { carId } = req.params;
      const updatedCar = await carService.updateByIdPatch(carId, req.body, _id);

      return res
        .status(200)
        .json({ message: "Car is updated", user: updatedCar });
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar>> {
    try {
      const { _id } = res.locals.user;
      const { carId } = req.params;
      await carService.deleteById(carId, _id);

      return res.status(200).json({ message: `Car id=${carId} is deleted` });
    } catch (e) {
      next(e);
    }
  }

  public async uploadPhoto(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar>> {
    try {
      const { _id } = res.locals.user;
      const { carId } = req.params;
      const imgsFile = req.files.img as UploadedFile[];

      const car = await carService.uploadPhoto(imgsFile, carId, _id);

      const presenterCar = carPresenter.present(car);

      return res.status(200).json(presenterCar);
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
