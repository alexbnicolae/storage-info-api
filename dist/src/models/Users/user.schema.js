"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Require Mongoose
const mongoose_1 = require("mongoose");
// Define a schema
const userSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    externId: String,
    token: {
        type: String,
        required: false
    },
    validToken: {
        type: Boolean,
        required: false
    },
    languageId: Number,
    visualMode: Number,
    authPlatform: Number,
    tokenNonMobile: {
        type: String,
        required: false
    },
    validTokenNonMobile: {
        type: Boolean,
        required: false
    }
}, { timestamps: true });
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
