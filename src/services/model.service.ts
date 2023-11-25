import { ApiError } from "../errors";
import { brandRepository } from "../repositories/brand.repository";
import { modelRepository } from "../repositories/model.repository";

import { IModel } from "../types";


class ModelService{
  // public async findAll(): Promise<IBrand[]>{
  //   try {
  //     return await brandRepository.findAll();
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }

  public async create(value: IModel): Promise<IModel> {
      try {
      const {_brandId, name} = value;
      const {_id} = await brandRepository.findOne(_brandId);
        console.log(_brandId,  name, _id.toString());
      if(!_id){
        throw new ApiError('Brand not exists', 404)
      }

      return await modelRepository.create(_id, name);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  // public async deleteById(_id: string): Promise<IBrand> {
  //   try {
  //     return await brandRepository.deleteById(_id);
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }

}

export const modelService = new ModelService();
