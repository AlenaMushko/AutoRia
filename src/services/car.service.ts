import { UploadedFile } from "express-fileupload";
import { configs } from "../config";
import { EEmailAction, EFileTypes, ERoles, EStatus } from "../enums";
import { ApiError } from "../errors";
import {
  brandRepository,
  carRepository,
  modelRepository,
  roleRepository,
} from "../repositories";
import { ICar, ICarCreate, IUser } from "../types";
import { currencyConversion } from "../utils/currencyConversion";
import { profanityList } from "../utils/profanityList";
import { emailService } from "./email.service";
import { s3Service } from "./s3.service";

class CarService {
  public async getAllOwner(id: object): Promise<ICar[]> {
    try {
      return await carRepository.getAllOwner(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(value: ICarCreate, user: IUser): Promise<ICar> {
    try {
      const { _id: brandId } = await brandRepository.findOne(value.brand);
      const { _id: modelId } = await modelRepository.findOne(value.model);
      const year = value.year.toString();
      let countSendLetters = 0;
      let status;

      const correctDescription = profanityList.some((profaneWord) =>
        value.description.toLowerCase().includes(profaneWord.toLowerCase()),
      );
      if (correctDescription) {
        countSendLetters = 1;
        await emailService.profanityLatter(user.email, EEmailAction.PROFANITY, {
          name: user.name + ", " || " ",
        });
        status = EStatus.Review;
      } else {
        status = EStatus.Active;
      }

      const { priceUAN, priceEUR, priceUSD, dataUSD, dataEUR } =
        await currencyConversion(value.currency, value.price);

      const newCar = {
        _userId: user._id.toString(),
        photo: value.photo || [],
        video: value.video || [],
        type: value.type,
        _brandId: brandId.toString(),
        _modelId: modelId.toString(),
        year: year || null,
        description: value.description || null,
        newCar: value.newCar.toString(),
        region: value.region,
        city: value.city || null,
        priceUAN,
        priceEUR,
        priceUSD,
        originalCurrency: value.currency,
        originalPrice: value.price.toString(),
        dataUSD,
        dataEUR,
        count: 0,
        status,
        countSendLetters,
      } ;

      return await carRepository.create(newCar);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async findById(car: ICar): Promise<void> {
    const count: number = car.count + 1;
    const updatedCar = Object.assign(car, { count });
    await carRepository.updateById(car._id, updatedCar);
  }

  public async isCarOwnerThisUser(_id: string, _userId: string): Promise<ICar> {
    try {
      const car = await carRepository.getOneByParams({
        _id,
        _userId,
      });

      return car;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async updateById(
    id: string,
    value: ICarCreate,
    user: IUser,
  ): Promise<ICar> {
    try {
      const car = await this.isCarOwnerThisUser(id, user._id);
      let countSendLetters = car.countSendLetters;
      let status = car.status;
      let priceUAN = car.priceUAN;
      let priceEUR = car.priceEUR;
      let priceUSD = car.priceUSD;

      if (value.description) {
        const correctDescription = profanityList.some((profaneWord) =>
          value.description.toLowerCase().includes(profaneWord.toLowerCase()),
        );

        if (correctDescription) {
          countSendLetters = car.countSendLetters + 1;

          switch (countSendLetters) {
            case 1 && 2:
              await emailService.profanityLatter(
                user.email,
                EEmailAction.PROFANITY,
                {
                  name: user.name + ", " || " ",
                },
              );
              break;
            case 3:
              await emailService.profanityLatterLast(
                user.email,
                EEmailAction.PROFANITY_LAST,
                {
                  name: user.name + ", " || " ",
                },
              );
              break;
            case 4:
              await emailService.profanityLatterDelete(
                user.email,
                EEmailAction.PROFANITY_DELETE,
                {
                  name: user.name + ", " || " ",
                },
              );

              status = EStatus.Inactive;
              await emailService.letterForManager(
                configs.MANAGER_EMAIL,
                EEmailAction.MANAGER,
                {
                  carId: car._id,
                },
              );
              break;
          }
        } else {
          status = EStatus.Active;
        }
      }

      if (value.price) {
        const price = await currencyConversion(value.currency, value.price);
        priceUAN = price.priceUAN;
        priceEUR = price.priceEUR;
        priceUSD = price.priceUSD;
      }

      const newValueCar = {
        description: value.description || car.description,
        region: value.region || car.region,
        city: value.city || car.city,
        priceUAN,
        priceEUR,
        priceUSD,
        status,
        countSendLetters,
        updatedAt:new Date()
      };

      const updateCar = Object.assign(car, newValueCar);

      return await carRepository.updateById(id, updateCar);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async deleteById(_id: string, user: IUser): Promise<void> {
    try {
      const { _id: _userId, _roleId } = user;

      const car = await this.isCarOwnerThisUser(_id, _userId.toString());
      const userRole = await this.userIsRole(_roleId);
      if (!car && userRole !== ERoles.Manager && userRole !== ERoles.Admin) {
        throw new ApiError("You can not manage this car", 403);
      }

      await carRepository.deleteById(_id);
      return;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async userIsRole(_roleId: string): Promise<string> {
    try {
      const { name } = await roleRepository.getOneByParams({ _id: _roleId });

      return name;
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
