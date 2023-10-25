import { model, models, Schema } from 'mongoose';

// Define schema for note content

const noteContentSchema = new Schema({
    content: {
        type: Schema.Types.Mixed,
        required: false
    },
    type: {
        type: Schema.Types.Mixed,
        required: true
    },
    additional: {
        type: Schema.Types.Mixed,
        required: false
    },
    gallery: {
        type: Schema.Types.ObjectId,
        ref: 'Gallery',
        required: false
    },

})

// Define a schema
const noteSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
            ref: 'Content'
        },
    },
    { timestamps: true }
);

const Note = model('Note', noteSchema);

export default Note;