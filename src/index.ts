import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/mongooseDb.js";
import { config, validateEnv } from "./config/index.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import sampleRequestRoutes from "./routes/sampleRequestRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import buyerRoutes from "./routes/buyerRoutes.js";

// Load environment variables
dotenv.config();

// Validate required environment variables
validateEnv();

// Initialize Express app
const app = express();
const PORT = config.port;

// Connect to MongoDB
await connectDB();

// Security middleware - Helmet for security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    xFrameOptions: { action: "deny" },
    xContentTypeOptions: true,
    strictTransportSecurity: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  }),
);

// CORS middleware with configured origin
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// app.use(cors());

// Body parsing middleware with size limits
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Register route modules
app.use("/api/auth", authRoutes);
app.use("/api/sample-requests", sampleRequestRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/buyers", buyerRoutes);

// Global error handler middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server started successfully`);
  console.log(`  Port: ${PORT}`);
  console.log(`  Environment: ${config.nodeEnv}`);
  console.log(`  CORS Origin: ${config.cors.origin}`);
});
