import { model, Schema, Types } from "mongoose";

import { ERegion, EStatus } from "../../enums";
import { ICar } from "../../types";

const currentYear = new Date().getFullYear();

const carSchema = new Schema(
  {
    _userId: {
      type: Types.ObjectId,
      required: true,
      ref: "user",
    },
    photo: {
      type: [String],
    },
    video: {
      type: [String],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    _brandId: {
      type: Types.ObjectId,
      ref: "brand",
      required: [true, "Brand is required"],
    },
    _modelId: {
      type: Types.ObjectId,
      ref: "model",
      required: [true, "Model is required"],
    },
    year: {
      type: String,
      min: [1995, "Year min 1995"],
      max: [currentYear, `Year max ${currentYear}`],
    },
    description: {
      type: String,
      min: [3, "description min 3 symbols"],
      max: [500, "description max 500 symbols"],
    },
    newCar: {
      type: String,
      required: [true, "Is car new?"],
    },
    region: {
      type: String,
      enum: ERegion,
      required: [true, "Region is required"],
    },
    city: {
      type: String,
      min: [3, "City min 3 symbols"],
      max: [30, "City max 30 symbols"],
    },
    priceUAN: {
      type: String,
      required: [true, "Price is required"],
    },
    priceEUR: {
      type: String,
      required: [true, "Price is required"],
    },
    priceUSD: {
      type: String,
      required: [true, "Price is required"],
    },
    count: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: EStatus,
      default: EStatus.Review,
      required: [true, "Status is required"],
    },
    countSendLetters: {
      type: Number,
      min: [0, "countSendLetters min 0"],
      max: [4, "countSendLetters max 4"],
      required: [true, "countSendLetters is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Car = model<ICar>("car", carSchema);
