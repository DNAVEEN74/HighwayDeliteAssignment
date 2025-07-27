import { connect, Schema, model } from "mongoose";

const mongoDbUrl = process.env.MONGODB_URL;

export async function connectDb() {
    try {
        if (!mongoDbUrl) {
        throw new Error("MONGODB_URL environment variable is not defined.");
        }
        await connect(mongoDbUrl);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

const userSchema: Schema = new Schema ({
    googleId: { type: String, require: true },
    userName: { type: String, require: true },
    email: { type: String, require: true }
})
export const User = model("User", userSchema);

const notesSchema: Schema = new Schema ({
    userId: { type: Schema.ObjectId, ref: User},
    notesNumber: {type: Number, require: true},
    notes: {type: String, require: true}
})
export const Notes = model("Notes", notesSchema);