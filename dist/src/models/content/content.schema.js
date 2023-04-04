"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Require Mongoose
const mongoose_1 = require("mongoose");
// Define a schema
const contentSchema = new mongoose_1.Schema({
    name: String,
}, { timestamps: true });
const Content = mongoose_1.models.User || (0, mongoose_1.model)('Content', contentSchema);
exports.default = Content;
