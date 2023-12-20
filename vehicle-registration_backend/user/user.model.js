import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 55,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 65,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxlength: 70,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "preferNotToSay"],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
