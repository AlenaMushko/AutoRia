import { model, Schema, Types } from "mongoose";

import { IToken } from "../types";
import { User } from "./user/User.model";

const tokenSchema = new Schema(
  {
    _userId: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
    accessToken: {
      type: String,
      default: "",
      required: true,
    },
    refreshToken: {
      type: String,
      default: "",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Token = model<IToken>("token", tokenSchema);
