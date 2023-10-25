"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define a schema
const gallerySchema = new mongoose_1.Schema({
    fullPath: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    type: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    isOnServer: {
        type: Boolean,
        required: false
    },
}, { timestamps: true });
const Gallery = (0, mongoose_1.model)('Gallery', gallerySchema);
exports.default = Gallery;
