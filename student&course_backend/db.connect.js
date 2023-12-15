import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

export const dbConnect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("DB connection established");
  } catch (error) {
    console.log(error.message);
    console.log("DB connection failed");
  }
};
