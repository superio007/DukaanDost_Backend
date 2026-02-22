import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
    if (mongoose.connection.readyState === 1)
        return;
    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "DukaanDost",
        maxPoolSize: 20,
        minPoolSize: 5,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    });
    console.log("CONNECTED TO DB:", mongoose.connection.name);
    console.log("HOST:", mongoose.connection.host);
    console.log("PORT:", mongoose.connection.port);
    console.log("MongoDB connected with pool");
};
export default connectDB;
//# sourceMappingURL=mongooseDb.js.map