import { Document, Types } from "mongoose";

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
  _userId: Types.ObjectId;
  photo?: string | string[];
  video?: string | string[];
  type: string;
  _brandId: string;
  _modelId: string;
  year?: number;
  description?: string;
  newCar: boolean;
  region: ERegion;
  city?: string;
  priceUAN: number;
  priceEUR: number;
  priceUSD: number;
  count: number;
  status: string;
  countSendLetters:number
}

export interface IModel extends Document {
  _brandId: string;
  name: string;
}

export interface IBrand extends Document {
  name: string;
}
