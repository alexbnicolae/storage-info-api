// Require Mongoose
import { model, models, Schema } from 'mongoose';

// Define a schema
const contentSchema = new Schema(
    {
        name: String,
    },
    { timestamps: true }
);

const Content = models.User || model('Content', contentSchema);

export default Content;