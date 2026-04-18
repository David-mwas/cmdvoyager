import mongoose from "mongoose";

export const connectDB = async () => {
  console.log("Connecting to MongoDB...");
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    conn.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    conn.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected. Attempting to reconnect...");
      setTimeout(connectDB, 5000); // Try to reconnect after 5 seconds
    });
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};
