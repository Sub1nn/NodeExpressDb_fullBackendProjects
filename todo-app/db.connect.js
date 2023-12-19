import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL;

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Data connection successful");
  } catch (error) {
    console.log("DB connection failed");
    console.log(error.message);
  }
};
