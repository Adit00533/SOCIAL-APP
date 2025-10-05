import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
      default: "",
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true, // speeds up lookups by username
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email"], // basic email validation
      index: true, // speeds up lookups by email
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    bio: {
      type: String,
      default: "",
      trim: true,
      maxlength: [160, "Bio cannot exceed 160 characters"], // like Twitter
    },
    followers: [
      {
        type: Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    following: [
      {
        type: Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false, // remove __v field
  }
);

// Optional: index for fast queries on followers/following
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

export default model("User", userSchema);
