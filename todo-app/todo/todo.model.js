import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 20,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: 55,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const Todo = mongoose.model("Todo", todoSchema);
