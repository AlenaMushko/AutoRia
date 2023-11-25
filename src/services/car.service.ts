import { UploadedFile } from "express-fileupload";

import { EFileTypes } from "../enums/file.enum";
import { ApiError } from "../errors";
import { carRepository } from "../repositories";
import { ICar } from "../types";
import { s3Service } from "./s3.service";

class CarService {
  // public async findWithPagination(
  //   query: IQuery,
  // ): Promise<IPaginationResponse<ICar>> {
  //   try {
  //     const queryStr = JSON.stringify(query);
  //     const queryObg = JSON.parse(
  //       queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
  //     );
  //
  //     const { page, limit, sortedBy, ...searchObj } = queryObg;
  //     const skip = +limit * (+page - 1);
  //
  //     const [cars, allUsers] = await Promise.all([
  //       await carRepository.searchByQuery(searchObj, skip, sortedBy, limit),
  //       await carRepository.count(searchObj),
  //     ]);
  //
  //     return {
  //       page: +page,
  //       perPage: +limit,
  //       allItems: allUsers,
  //       foundItems: cars.length,
  //       data: cars,
  //     };
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }

  public async getAllOwner(id: object): Promise<ICar[]> {
    try {
      return await carRepository.getAllOwner(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(value: ICar): Promise<ICar> {
    try {
      return await carRepository.create(value);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async isCarOwnerThisUser(
    carId: string,
    userId: string,
  ): Promise<ICar> {
    try {
      const car = await carRepository.getOneByParams({
        _id: carId,
        _ownerId: userId,
      });

      if (!car) {
        throw new ApiError("You can not manage this car", 403);
      }
      return car;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async updateByIdPut(
    id: string,
    value: ICar,
    userId: string,
  ): Promise<ICar> {
    try {
      await this.isCarOwnerThisUser(id, userId);
      return await carRepository.updateByIdPut(id, value);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async updateByIdPatch(
    id: string,
    value: ICar,
    userId: string,
  ): Promise<ICar> {
    try {
      await this.isCarOwnerThisUser(id, userId);
      return await carRepository.updateByIdPatch(id, value);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async deleteById(id: string, userId: string): Promise<ICar> {
    try {
      await this.isCarOwnerThisUser(id, userId);
      return await carRepository.deleteById(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async uploadPhoto(
    imgsFile: UploadedFile[] | UploadedFile,
    carId: string,
    userId: string,
  ): Promise<ICar> {
    try {
      await this.isCarOwnerThisUser(carId, userId);
      let imgsPaths: string[] = [];
      if (Array.isArray(imgsFile)) {
        imgsPaths = await s3Service.uploadFiles(
          imgsFile,
          EFileTypes.Car,
          userId,
        );
      } else {
        const singleImgPath = await s3Service.uploadSingleFile(
          imgsFile,
          EFileTypes.Car,
          userId,
        );
        imgsPaths.push(singleImgPath);
      }

      const updatedCar = await carRepository.pushImagesToCar(carId, imgsPaths);
      return updatedCar;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const carService = new CarService();
