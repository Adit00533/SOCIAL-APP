import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import PostRoutes from "./routes/PostRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import messageRoutes from "./routes/messsageRoutes.js";
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // MUST come before routes
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/posts", PostRoutes);

app.use("/api/users", userRoutes);
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use("/api/messages", messageRoutes);
app.use("/api/comments", commentRoutes);// comments

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running ✅" });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error(err));

app.listen(5000, () => console.log("Server running on port 5000 🚀"));
