import {  EEmailAction, EStatus } from "../enums";
import { ApiError } from "../errors";
import { carRepository } from "../repositories";
import { brandRepository } from "../repositories/brand.repository";
import { modelRepository } from "../repositories/model.repository";
import { ICar, ICarCreate, IUser } from "../types";
import { currencyConversion } from "../utils/currencyConversion";
import { profanityList } from "../utils/profanityList";
import { emailService } from "./email.service";

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

  public async create(value: ICarCreate, user:IUser): Promise<ICar> {
    try {
      const { _id: brandId } = await brandRepository.findOne(value.brand);
      const { _id: modelId } = await modelRepository.findOne(value.model);
      let countSendLetters = 0;

      const correctDescription = profanityList.some(profaneWord => value.description.toLowerCase().includes(profaneWord.toLowerCase()));
      if (correctDescription) {
        countSendLetters = 1;
        await emailService.profanityLatter(user.email, EEmailAction.PROFANITY, {
          name: user.name + ", " || " ",
        });
        throw new ApiError('The description contains offensive language', 404)

      }

      const {priceUAN, priceEUR, priceUSD } = await currencyConversion(value.currency, value.price);

      const newCar = {
        _userId: user._id.toString(),
        photo: value.photo || null,
        video: value.video || null,
        type: value.type,
        _brandId: brandId.toString(),
        _modelId: modelId.toString(),
        year: value.year || null,
        description: value.description || null,
        newCar: value.newCar,
        region: value.region,
        city: value.city || null,
        priceUAN,
        priceEUR,
        priceUSD,
        count: 0,
        status: EStatus.Review,
        countSendLetters
      };
      return await carRepository.create(newCar);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  // public async isCarOwnerThisUser(
  //   carId: string,
  //   userId: string,
  // ): Promise<ICar> {
  //   try {
  //     const car = await carRepository.getOneByParams({
  //       _id: carId,
  //       _ownerId: userId,
  //     });
  //
  //     if (!car) {
  //       throw new ApiError("You can not manage this car", 403);
  //     }
  //     return car;
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }

  // public async updateByIdPut(
  //   id: string,
  //   value: ICar,
  //   userId: string,
  // ): Promise<ICar> {
  //   try {
  //     await this.isCarOwnerThisUser(id, userId);
  //     return await carRepository.updateByIdPut(id, value);
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }
  //
  // public async updateByIdPatch(
  //   id: string,
  //   value: ICar,
  //   userId: string,
  // ): Promise<ICar> {
  //   try {
  //     await this.isCarOwnerThisUser(id, userId);
  //     return await carRepository.updateByIdPatch(id, value);
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }
  //
  // public async deleteById(id: string, userId: string): Promise<ICar> {
  //   try {
  //     await this.isCarOwnerThisUser(id, userId);
  //     return await carRepository.deleteById(id);
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }
  //
  // public async uploadPhoto(
  //   imgsFile: UploadedFile[] | UploadedFile,
  //   carId: string,
  //   userId: string,
  // ): Promise<ICar> {
  //   try {
  //     await this.isCarOwnerThisUser(carId, userId);
  //     let imgsPaths: string[] = [];
  //     if (Array.isArray(imgsFile)) {
  //       imgsPaths = await s3Service.uploadFiles(
  //         imgsFile,
  //         EFileTypes.Car,
  //         userId,
  //       );
  //     } else {
  //       const singleImgPath = await s3Service.uploadSingleFile(
  //         imgsFile,
  //         EFileTypes.Car,
  //         userId,
  //       );
  //       imgsPaths.push(singleImgPath);
  //     }
  //
  //     const updatedCar = await carRepository.pushImagesToCar(carId, imgsPaths);
  //     return updatedCar;
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }
}

export const carService = new CarService();
