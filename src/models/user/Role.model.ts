import { model, Schema } from "mongoose";

import { ERoles } from "../../enums";
import { IRole } from "../../types";

const roleSchema = new Schema(
  {
    name: {
      type: String,
      set: (v: string) => v.trim().toLowerCase(),
      enum: ERoles,
      required: [true, "Name is required"],
    },
    permissions: {
      canContactSeller: {
        type: Boolean,
        set: (v: string) => v.trim(),
        default: true,
      },
      canContactManager: {
        type: Boolean,
        set: (v: string) => v.trim(),
        default: false,
      },
      canContactAdmin: {
        type: Boolean,
        set: (v: string) => v.trim(),
        default: false,
      },
      canSaleCars: {
        type: Boolean,
        set: (v: string) => v.trim(),
        default: false,
      },
      canBanUsers: {
        type: Boolean,
        set: (v: string) => v.trim(),
        default: false,
      },
      canDeleteInvalidAnnoun: {
        type: Boolean,
        set: (v: string) => v.trim(),
        default: false,
      },
      canChangeCarStatus: {
        type: Boolean,
        set: (v: string) => v.trim(),
        default: false,
      },
      canCreateManager: {
        type: Boolean,
        set: (v: string) => v.trim(),
        default: false,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Role = model<IRole>("role", roleSchema);
