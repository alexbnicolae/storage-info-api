// Require Mongoose
import { model, models, Schema } from 'mongoose';
import { WordFileSchemaDto } from './wordfile.schema.types';

// Define a schema
const wordFileSchema: Schema<WordFileSchemaDto> = new Schema(
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
            type: Schema.Types.ObjectId,
            ref: 'Content'
        },
        isDuplicate: {
            type: Boolean,
            required: false
        },
    },
    { timestamps: true }
);

const Wordfile = model('Wordfile', wordFileSchema);

export default Wordfile;