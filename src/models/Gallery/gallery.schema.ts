import { Schema, model } from "mongoose";

// Define a schema
const gallerySchema = new Schema(
    {
        fullPath: {
            type: String,
            required: true
        },
        fileName: {
            type: String,
            required: true
        },
        type: {
            type: Schema.Types.Mixed,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        isOnServer: {
            type: Boolean,
            required: false
        },
    },
    { timestamps: true }
);

const Gallery = model('Gallery', gallerySchema);

export default Gallery;