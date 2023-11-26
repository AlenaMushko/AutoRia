import { FilterQuery } from "mongoose";

import { ApiError } from "../errors";
import { Car } from "../models";
import { ICar } from "../types";

class CarRepository {
  public async getAllOwner(_userId: object): Promise<ICar[]> {
    try {
      return await Car.find({ _userId });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(value: Partial<ICar>): Promise<ICar> {
    try {
      return (await Car.create({ ...value })) as unknown as ICar;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async findById(id: string): Promise<ICar> {
    try {
      return (await Car.findById(id)) as unknown as ICar;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getOneByParams(params: FilterQuery<ICar>): Promise<ICar> {
    try {
      return await Car.findOne(params);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async updateById(id: string, value: ICar): Promise<ICar> {
    try {
      return (await Car.findByIdAndUpdate(
        id,
        { ...value },
        { new: true },
      )) as unknown as ICar;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async deleteById(_id: string): Promise<ICar> {
    try {
      return (await Car.deleteOne({ _id })) as unknown as ICar;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const carRepository = new CarRepository();
