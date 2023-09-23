"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Require Mongoose
const mongoose_1 = require("mongoose");
// Define a schema
const wordFileSchema = new mongoose_1.Schema({
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
        word: {
            value: {
                type: String,
                required: true
            },
            isRequired: Boolean,
            error: Boolean
        },
        meaning: {
            value: {
                type: String,
                required: true
            },
            isRequired: Boolean,
            error: Boolean
        },
        partOfSpeech: {
            value: {
                type: String,
                required: true
            },
            isRequired: Boolean,
            error: Boolean
        },
        wordLanguage: {
            value: {
                type: String,
                required: false
            },
            isRequired: Boolean,
            error: Boolean
        },
        moreDetails: {
            value: {
                type: String,
                required: false
            },
            isRequired: Boolean,
            error: Boolean
        },
        optionalContent: {
            value: {
                type: Boolean,
                required: false
            },
            isRequired: Boolean,
            error: Boolean
        },
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
    isDuplicate: {
        type: Boolean,
        required: false
    },
}, { timestamps: true });
const Wordfile = (0, mongoose_1.model)('Wordfile', wordFileSchema);
exports.default = Wordfile;
