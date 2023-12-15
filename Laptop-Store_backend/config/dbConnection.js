import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
export const dbConnect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Data connection established");
  } catch (error) {
    console.log("Failed to connect with database");
    console.log(error.message);
  }
};
