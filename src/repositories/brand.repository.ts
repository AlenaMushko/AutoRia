import { ApiError } from "../errors";
import { Brand} from "../models";
import { IBrand } from "../types";

class BrandRepository{
  public async create(value: IBrand): Promise<IBrand> {
    try {
      return (await Brand.create({ ...value }));
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async findAll(): Promise<IBrand[]> {
    try {
      return (await Brand.find());
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async findOne(name: string): Promise<IBrand> {
    try {
      return (await Brand.findOne({ name }));
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async findById(_id: string): Promise<IBrand>{
    try {
      return (await Brand.findById(_id));
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async deleteById(_id: string): Promise<IBrand>{
    try {
      return (await Brand.findByIdAndDelete(_id));
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const brandRepository = new BrandRepository();
