// Require Mongoose
import { model, models, Schema } from 'mongoose';
import { ContentSchemaDto } from './content.schema.types';

// Define a schema
const contentSchema: Schema<ContentSchemaDto> = new Schema(
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
        content: {
            type: Schema.Types.Mixed,
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
            type: Schema.Types.ObjectId,
            ref: 'Content'
        },
    },
    { timestamps: true }
);

const Content = model('Content', contentSchema);

export default Content;