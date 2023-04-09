"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Require Mongoose
const mongoose_1 = require("mongoose");
// Define a schema
const contentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    content: {
        type: mongoose_1.Schema.Types.Mixed,
        required: false
    },
    encrypted: {
        type: Boolean,
        required: false
    },
    folderPassword: {
        type: String,
        required: false
    },
    parentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Content'
    },
}, { timestamps: true });
const Content = (0, mongoose_1.model)('Content', contentSchema);
exports.default = Content;
