import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit process on failure
  }

  // Optional: log on disconnect
  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected!");
  });

  // Optional: log on reconnect
  mongoose.connection.on("reconnected", () => {
    console.log("🔄 MongoDB reconnected!");
  });
};

export default connectDB;
