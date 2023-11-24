import { model, Schema, Types } from "mongoose";

import { EAccounts } from "../../enums";
import { IUser } from "../../types";

const userSchema = new Schema(
  {
    name: {
      type: String,
      set: (v: string) => v.trim(),
      min: [3, "Name min 3 symbols"],
      max: [30, "Name max 30 symbols"],
    },
    email: {
      type: String,
      set: (v: string) => v.trim().toLowerCase(),
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      set: (v: string) => v.trim(),
      required: [true, "Password is required"],
    },
    _roleId: {
      type: Types.ObjectId,
      ref: "role",
      required: [true, "Role is required"],
    },
    _dealershipId: {
      type: Types.ObjectId,
      ref: "dealership",
      default: null,
    },
    account: {
      type: String,
      set: (v: string) => v.trim().toLowerCase(),
      enum: EAccounts,
      default: EAccounts.Base,
      required: [true, "Account is required"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    lastVisited: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model<IUser>("user", userSchema);
