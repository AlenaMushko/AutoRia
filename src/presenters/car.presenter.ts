import { configs } from "../config";
import { ICar, IPresenter } from "../types";

class CarPresenter implements IPresenter<ICar, Partial<ICar>> {
  present(data: ICar): Partial<ICar> {
    return {
      _id: data._id,
      _userId: data._userId,
      type: data.type,
      _brandId: data._brandId,
      _modelId: data._modelId,
      year:data.year,
      description: data.description,
      newCar: data.newCar,
      region: data.region,
      priceUAN: data.priceUAN,
      priceEUR: data.priceEUR,
      priceUSD: data.priceUSD,
      originalCurrency: data.originalCurrency,
      originalPrice: data.originalPrice,
      dataUSD:data.dataUSD,
      dataEUR:data.dataEUR,
      count: data.count,
      status: data.status,
      photo: Array.isArray(data.photo)
        ? data.photo.map((path) => `${configs.AWE_S3_URL}/${path}`)
        : `${configs.AWE_S3_URL}/${data.photo}`,
      video: data.video,
    };
  }
}

export const carPresenter = new CarPresenter();
