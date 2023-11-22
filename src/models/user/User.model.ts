import {model, Schema, Types} from "mongoose";

import {IUser} from "../../types";
import {EAccounts} from "../../enums";

const userSchema = new Schema(
    {
        name: {
            type: String,
            min: [3, "Name min 3 symbols"],
            max: [30, "Name max 30 symbols"],
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            required: [true, "Email is required"],
        },
        password: {
            type: String,
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
        account:{
            type: String,
            enum: EAccounts,
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
