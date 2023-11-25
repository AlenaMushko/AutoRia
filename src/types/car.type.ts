import { Document, Types } from "mongoose";

export interface ICar extends Document {
  _userId: Types.ObjectId;
  photo?: string | string[];
  video?: string | string[];
  type: string;
  _brandId: Types.ObjectId;
  _modelId: Types.ObjectId;
  year?: number;
  description?: string;
  newCar: boolean;
  region: string;
  town?: string;
  price: number;
  count: number;
  status: string;
}

export interface IModel extends Document{
  _brandId: string;
  name: string;
}

export interface IBrand extends Document{
  name: string;
}
