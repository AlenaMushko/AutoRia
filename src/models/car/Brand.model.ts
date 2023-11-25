import { model, Schema } from "mongoose";

import { IBrand } from "../../types";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      set: (v: string) => v.trim(),
      unique: true,
      required: [true, "Name is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Brand = model<IBrand>("brand", brandSchema);
