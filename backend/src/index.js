import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import commandRoutes from "./routes/command.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import {apiKey }from "./middleware/apiKey.middleware.js";
dotenv.config();

const app = express();
app.use(express.json());

// cors
app.use(cors());
// app.use("/api", apiKey);

// routes
app.use("/api/commands", commandRoutes);
app.use("/api/stats", statsRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to CmdVoyager API...",
    timestamp: new Date(),
  });
});

await connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `🚀 Server running on http://localhost:${process.env.PORT || 5000}`,
      );
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
  });
