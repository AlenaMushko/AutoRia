"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activated = exports.EActionActivatedTokenTypes = void 0;
const mongoose_1 = require("mongoose");
var EActionActivatedTokenTypes;
(function (EActionActivatedTokenTypes) {
    EActionActivatedTokenTypes["Activated"] = "activated";
    EActionActivatedTokenTypes["ForgotPassword"] = "forgotPassword";
})(EActionActivatedTokenTypes || (exports.EActionActivatedTokenTypes = EActionActivatedTokenTypes = {}));
const activatedSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    versionKey: false,
});
exports.Activated = (0, mongoose_1.model)("activated", activatedSchema);
