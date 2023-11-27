
import { Document } from "mongoose";

import { ECurrency, ERegion } from "../enums";

export interface ICarCreate {
  photo?: string | string[];
  video?: string | string[];
  type: string;
  brand: string;
  model: string;
  year?: string | number;
  description?: string;
  newCar: string;
  region: ERegion;
  city?: string;
  price: number;
  currency: ECurrency;
}

interface IOriginal{
  ccy: string,
  base_ccy: string,
  buy: string,
  sale: string
}

export interface ICar extends Document {
  _userId: string;
  photo?: string | string[] | null;
  video?: string | string[] | null;
  type: string;
  _brandId: string;
  _modelId: string;
  year?: string;
  description?: string | null;
  newCar: string;
  region: ERegion;
  city?: string | null;
  priceUAN: string;
  priceEUR: string;
  priceUSD: string;
  originalCurrency: string,
  originalPrice: string,
  dataUSD:IOriginal,
  dataEUR:IOriginal,
  count: number;
  status: string;
  countSendLetters: number;
}

export interface IModel extends Document {
  _brandId: string;
  name: string;
}

export interface IBrand extends Document {
  name: string;
}
