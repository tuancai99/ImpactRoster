import express from "express";
import { database } from "./database.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"; // Adjust the path as needed
import connectDB from "./config/dbConn.js";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

// Connect to the database
connectDB();
const app = express();
const port = 5001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/bog/users", userRoutes);

// Start the server
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
