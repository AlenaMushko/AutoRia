import {model, Schema, Types} from "mongoose";

import {ICar} from "../../types";


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
        type:{
            type: String,
            required: [true, "Type is required"],
        },
        _brandId: {
            type: Types.ObjectId,
            ref: "brand",
            required: [true, "Brand is required"]
        },
       _modelId: {
            type: Types.ObjectId,
            ref: "model",
            required: [true, "Model is required"]
        },
        year: {
            type: Number,
            min: [1995, "Year min 1995"],
            max: [currentYear, `Year max ${currentYear}`],
        },
        description:{
            type: String,
            min: [3, "Name min 3 symbols"],
            max: [500, "Name max 500 symbols"],
        },
        newCar:{
            type: Boolean,
            required: [true, "Is car new?"],
        },
        region:{
            type: String,
            min: [3, "Name min 3 symbols"],
            max: [30, "Name max 30 symbols"],
            required: [true, "Region is required"]
        },
        town:{
            type: String,
            min: [3, "Name min 3 symbols"],
            max: [30, "Name max 30 symbols"],
        },
        price: {
            type: Number,
            min: [1, "Price min 1"],
            required: [true, "Price is required"]
        },
        count:{
            type: Number,
            default: 0,
        },
        status:{
            type: String,
            default: "review",
        }
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Car = model<ICar>("car", carSchema);
