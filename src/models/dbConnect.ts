import mongoose from "mongoose";
export async function dbConnect() {
    const MONGODB_URI = process.env.MONGODB_URI!;
    return await mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((mongoose) => {
        return mongoose;
    });
}