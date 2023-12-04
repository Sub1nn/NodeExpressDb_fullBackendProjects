import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sub_1n:maya2046Lai@subin01.bbc2g1d.mongodb.net/narrowway?retryWrites=true&w=majority"
    );
    console.log("Database Connection established");
  } catch (error) {
    console.log(error.message);
    console.log("Failed to connect to database");
  }
};
