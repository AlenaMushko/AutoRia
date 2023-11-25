import { ApiError } from "../errors";
import { brandRepository } from "../repositories/brand.repository";
import { IBrand } from "../types";

class BrandService {
  public async findAll(): Promise<IBrand[]> {
    try {
      return await brandRepository.findAll();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(value: IBrand): Promise<IBrand> {
    try {
      return await brandRepository.create(value);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async deleteById(_id: string): Promise<IBrand> {
    try {
      return await brandRepository.deleteById(_id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const brandService = new BrandService();
