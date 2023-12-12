import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connection established");
  } catch (error) {
    console.log(error.message);
    console.log("Failed to connect to database");
  }
};
