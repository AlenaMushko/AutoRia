import { NextFunction, Request, Response } from "express";
import { modelService } from "../services/model.service";
import { IModel } from "../types";

class ModelController {
  public async findAllByBrand(req: Request,
                       res: Response,
                       next: NextFunction
  ): Promise<Response<IModel[]>> {
    try {
      const { brandId } = req.params;
      const brand = res.locals.brand.name

      const models = await modelService.findAllByBrand(brandId, brand);

      return res
        .status(200)
        .json({ data: models });
    } catch (error) {
      next(error);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IModel>> {
    try {
      const newModel = await modelService.create(req.body);

      return res
        .status(201)
        .json({ message: "Model is created", data: newModel});
    } catch (error) {
      next(error);
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IModel>> {
    try {
      const model = res.locals.model;

      return res.status(200).json({ data: model });
    } catch (error) {
      next(error);
    }
  }

  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IModel>> {
    try {
      const { modelId } = req.params;
      const value = req.body;
      const updatedModel = await modelService.updateById(modelId,  value);

      return res
        .status(200)
        .json({ message: "Model is updated", data: updatedModel });
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IModel>> {
    try {
      const { modelId } = req.params;
      await modelService.deleteById(modelId);

      return res.status(200).json({ message: `Model id=${modelId} is deleted` });
    } catch (e) {
      next(e);
    }
  }
}

export const modelController = new ModelController();
