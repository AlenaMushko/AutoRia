import { ApiError } from "../errors";
import { Model } from "../models";
import { IModel } from "../types";

class ModelRepository{
  public async create(_brandId:string, name:string): Promise<IModel> {
    try {
      return (await Model.create({name, _brandId}));
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  // public async findAll(): Promise<IBrand[]> {
  //   try {
  //     return (await Brand.find());
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }

  public async findOne(name: string): Promise<IModel> {
    try {
      return (await Model.findOne({ name }));
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  // public async findById(_id: string): Promise<IBrand>{
  //   try {
  //     return (await Brand.findById(_id));
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }
  //
  // public async deleteById(_id: string): Promise<IBrand>{
  //   try {
  //     return (await Brand.findByIdAndDelete(_id));
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }
}

export const modelRepository = new ModelRepository();
