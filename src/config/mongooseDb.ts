import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("✓ Already connected to MongoDB");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "DukaanDost",
      maxPoolSize: 20,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("✓ Database connection established");
    console.log(`  Database: ${mongoose.connection.name}`);
    console.log(`  Host: ${mongoose.connection.host}`);
    console.log(`  Port: ${mongoose.connection.port}`);
  } catch (error) {
    console.error("✗ MongoDB connection failed:");
    console.error(
      `  Error: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
    process.exit(1);
  }
};

export default connectDB;
