import {model, Schema} from "mongoose";

import {ERoles} from "../../enums";
import {IRole} from "../../types/user.type";

const roleSchema = new Schema(
    {
        name: {
            type: String,
            enum: ERoles,
            required: [true, "Name is required"]
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Role = model<IRole>("role", roleSchema);
