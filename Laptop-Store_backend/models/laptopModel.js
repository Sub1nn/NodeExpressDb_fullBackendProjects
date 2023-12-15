import mongoose from "mongoose";

const laptopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    processor: {
      type: String,
      required: true,
      trim: true,
    },
    ram: {
      type: String,
      required: true,
      trim: true,
    },
    ssd: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 15000,
    },
  },
  {
    timestamps: true,
  }
);

export const Laptop = mongoose.model("Laptop", laptopSchema);
