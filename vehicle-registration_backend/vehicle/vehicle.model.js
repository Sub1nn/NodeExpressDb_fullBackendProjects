import mongoose from "mongoose";

//set rule
const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 55,
    },
    model: {
      type: Number,
      min: 2010,
      max: 2100,
    },
    color: {
      type: [String],
      required: true,
    },
    power: {
      type: Number,
      required: true,
      min: 1,
    },
    torque: {
      type: Number,
      required: true,
      min: 1,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//create table

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
