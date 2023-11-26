import { model, Schema } from "mongoose";

import { ERoles } from "../../enums";
import { IRole } from "../../types";

const roleSchema = new Schema(
  {
    name: {
      type: String,
      enum: ERoles,
      required: [true, "Name is required"],
    },
    permissions: {
      canContactSeller: {
        type: Boolean,
        default: true,
      },
      canContactManager: {
        type: Boolean,
        default: false,
      },
      canContactAdmin: {
        type: Boolean,
        default: false,
      },
      canSaleCars: {
        type: Boolean,
        default: false,
      },
      canBanUsers: {
        type: Boolean,
        default: false,
      },
      canDeleteInvalidAnnoun: {
        type: Boolean,
        default: false,
      },
      canChangeCarStatus: {
        type: Boolean,
        default: false,
      },
      canCreateManager: {
        type: Boolean,
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
