import { model, Schema } from "mongoose";

import { IActivated } from "../types";

export enum EActionActivatedTokenTypes {
  Activated = "activated",
  ForgotPassword = "forgotPassword",
}

const activatedSchema = new Schema(
  {
    accessToken: {
      type: String,
      default: "",
      required: true,
    },
    userEmail: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
    },
    tokenType: {
      required: true,
      type: String,
      enum: EActionActivatedTokenTypes,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Activated = model<IActivated>("activated", activatedSchema);
