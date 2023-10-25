"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define schema for note content
const noteContentSchema = new mongoose_1.Schema({
    content: {
        type: mongoose_1.Schema.Types.Mixed,
        required: false
    },
    type: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true
    },
    additional: {
        type: mongoose_1.Schema.Types.Mixed,
        required: false
    },
    gallery: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Gallery',
        required: false
    },
});
// Define a schema
const noteSchema = new mongoose_1.Schema({
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
    content: [noteContentSchema],
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
const Note = (0, mongoose_1.model)('Note', noteSchema);
exports.default = Note;
