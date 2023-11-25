import { Document } from "mongoose";

import { ECurrency, ERegion } from "../enums";

export interface ICarCreate {
  photo?: string | string[];
  video?: string | string[];
  type: string;
  brand: string;
  model: string;
  year?: number;
  description?: string;
  newCar: boolean;
  region: ERegion;
  city?: string;
  price: number;
  currency: ECurrency;
}

export interface ICar extends Document {
  _userId: string;
  photo?: string | string[] | null;
  video?: string | string[] | null;
  type: string;
  _brandId: string;
  _modelId: string;
  year?: number | null;
  description?: string | null;
  newCar: boolean;
  region: ERegion;
  city?: string | null;
  priceUAN: string;
  priceEUR: string;
  priceUSD: string;
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
