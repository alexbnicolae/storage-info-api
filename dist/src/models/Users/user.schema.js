"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Require Mongoose
const mongoose_1 = require("mongoose");
// Define a schema
const userSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    externId: String,
    token: String,
    validToken: Boolean,
    languageId: Number,
    visualMode: Number,
    authPlatform: Number
}, { timestamps: true });
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
