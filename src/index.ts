import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import connectDB from "./config/mongooseDb";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Error handling middleware
app.use(errorHandler);

//mongose test
await connectDB();

// Server runner
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
