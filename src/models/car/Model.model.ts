import { model, Schema, Types } from "mongoose";

import { IModel } from "../../types";

const modelSchema = new Schema(
  {
    _brandId: {
      type: Types.ObjectId,
      ref: "brand",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Model = model<IModel>("model", modelSchema);
