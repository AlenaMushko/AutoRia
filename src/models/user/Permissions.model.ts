import {model, Schema, Types} from "mongoose";

import {IPermission} from "../../types/user.type";

const permissionSchema = new Schema(
    {
        _roleId: {
            type: Types.ObjectId,
            ref: "role",
            required: true
        },
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        description:{
            type: String,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Permission = model<IPermission>("permission", permissionSchema);
