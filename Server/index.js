import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/userRouter.routes.js";

dotenv.config();

const app = express();
const Port = process.env.PORT || 3000; // Fallback port in case process.env.PORT is undefined

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Default for development
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.get("/", (req, res) => {
  res.json({
    message: `Listening to Port ${Port}`,
  });
});

app.use("/api/user", userRouter);

// Connecting to the database and running server
connectDB()
  .then(() => {
    app.listen(Port, () => {
      console.log(`Listening To Port: ${Port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
