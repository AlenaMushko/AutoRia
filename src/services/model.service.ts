import { ApiError } from "../errors";
import { brandRepository } from "../repositories/brand.repository";
import { modelRepository } from "../repositories/model.repository";
import { IModel } from "../types";

class ModelService {
  public async findAllByBrand(
    brandId: string,
    brand: string,
  ): Promise<IModel[]> {
    try {
      const brands = await modelRepository.findAllByBrand(brandId);
      if (!brands.length) {
        throw new ApiError(`Models not exists for ${brand} brand`, 400);
      }
      return brands;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(value: IModel): Promise<IModel> {
    try {
      const { _brandId, name } = value;
      const { _id } = await brandRepository.findOne(_brandId);
      if (!_id) {
        throw new ApiError("Brand not exists", 404);
      }

      return await modelRepository.create(_id, name);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async updateById(
    modelId: string,
    value: Partial<IModel>,
  ): Promise<IModel> {
    try {
      return await modelRepository.updateById(modelId, value.name);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async deleteById(_id: string): Promise<IModel> {
    try {
      return await modelRepository.deleteById(_id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const modelService = new ModelService();
