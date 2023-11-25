import { ApiError } from "../errors";
import { Car } from "../models";
import { ICar } from "../types";

class CarRepository {
  // public async searchByQuery(
  //   searchObj: {
  //     [key: string]: string;
  //   },
  //   skip: number,
  //   sortedBy: string,
  //   limit: string,
  // ): Promise<ICar[]> {
  //   try {
  //     return await Car.find(searchObj)
  //       .skip(skip)
  //       .limit(+limit)
  //       .sort(sortedBy)
  //       .populate("_ownerId");
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }

  public async getAllOwner(_userId: object): Promise<ICar[]> {
    try {
      return await Car.find({ _userId });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(value: ICar): Promise<ICar> {
    try {
      return (await Car.create({ ...value })) as unknown as ICar;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async findById(id: string): Promise<ICar> {
    try {
      return (await Car.findById(id).populate("_ownerId")) as unknown as ICar;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  //
  // public async getOneByParams(params: FilterQuery<ICar>): Promise<ICar> {
  //   try {
  //     return await Car.findOne(params);
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }
  //
  // public async updateByIdPut(id: string, value: ICar): Promise<ICar> {
  //   try {
  //     return (await Car.findByIdAndUpdate(
  //       id,
  //       { ...value },
  //       { new: true },
  //     )) as unknown as ICar;
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }

  // public async updateByIdPatch(id: string, value: ICar): Promise<ICar> {
  //   try {
  //     return (await Car.findByIdAndUpdate(
  //       id,
  //       { ...value },
  //       { new: true },
  //     )) as unknown as ICar;
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }
  //
  // public async pushImagesToCar(
  //   _id: string,
  //   imgsPaths: string[],
  // ): Promise<ICar> {
  //   try {
  //     const updatedCar = await Car.findByIdAndUpdate(
  //       _id,
  //       {
  //         $push: { img: { $each: imgsPaths } },
  //       },
  //       { new: true },
  //     );
  //     return updatedCar as unknown as ICar;
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }
  //
  // public async deleteById(id: string): Promise<ICar> {
  //   try {
  //     return (await Car.deleteOne({ _id: id })) as unknown as ICar;
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }
}

export const carRepository = new CarRepository();
