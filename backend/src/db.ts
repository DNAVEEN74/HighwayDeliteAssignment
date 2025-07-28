import { connect, Schema, model } from "mongoose";

const mongoDbUrl = process.env.MONGODB_URL;

interface IOtp extends Document {
  email: string;
  otp: string;
  expiredAt: number;
}

interface IUserSchema extends Document {
    userName: string,
    email: string,
    password: string
}

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

const userSchema: Schema = new Schema<IUserSchema>({
    userName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String}
})
export const User = model<IUserSchema>("User", userSchema);

const notesSchema: Schema = new Schema({
    userId: { type: Schema.ObjectId, ref: User},
    notesNumber: {type: Number, require: true},
    notes: {type: String, require: true}
})
export const Notes = model("Notes", notesSchema);

const otpStorageSchema = new Schema<IOtp>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiredAt: { type: Number, required: true }
});
export const OtpField = model<IOtp>('OtpField', otpStorageSchema);