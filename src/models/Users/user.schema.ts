// Require Mongoose
import { model, Schema } from 'mongoose';

// Define a schema
const userSchema = new Schema(
    {
        name: String,
        email: String,
        externId: String,
        token: {
            type: String,
            required: false
        },
        validToken: {
            type: Boolean,
            required: false
        },
        languageId: Number,
        visualMode: Number,
        authPlatform: Number,
        tokenNonMobile: {
            type: String,
            required: false
        },
        validTokenNonMobile: {
            type: Boolean,
            required: false
        }
    },
    { timestamps: true }
);

const User = model('User', userSchema);

export default User;