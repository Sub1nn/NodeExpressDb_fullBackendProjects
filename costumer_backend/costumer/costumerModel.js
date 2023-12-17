import mongoose from "mongoose";

const costumerSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 65,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  address: {
    type: String,
    minlength: 2,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: false,
    trim: true,
  },
});

export const Costumer = mongoose.model("Costumer", costumerSchema);
