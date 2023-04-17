// Require Mongoose
import { model, Schema } from 'mongoose';

// Define a schema
const userSchema = new Schema(
    {
        name: String,
        email: String,
        externId: String,
        token: String,
        validToken: Boolean,
        languageId: Number
    },
    { timestamps: true }
);

const User = model('User', userSchema);

export default User;