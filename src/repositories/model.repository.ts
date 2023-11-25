import { ApiError } from "../errors";
import { Model } from "../models";
import { IModel } from "../types";

class ModelRepository {
  public async create(_brandId: string, name: string): Promise<IModel> {
    try {
      return await Model.create({ name, _brandId });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async findAllByBrand(_brandId: string): Promise<IModel[]> {
    try {
      return await Model.find({ _brandId });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async findOne(name: string): Promise<IModel> {
    try {
      return await Model.findOne({ name });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async findById(_id: string): Promise<IModel> {
    try {
      return await Model.findById(_id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async updateById(_id: string, name: string): Promise<IModel> {
    try {
      return await Model.findByIdAndUpdate(_id, { name }, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async deleteById(_id: string): Promise<IModel> {
    try {
      return await Model.findByIdAndDelete(_id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const modelRepository = new ModelRepository();
