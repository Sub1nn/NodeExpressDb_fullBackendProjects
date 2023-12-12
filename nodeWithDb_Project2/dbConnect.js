import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to the mongoose DB");
  } catch (error) {
    console.log(error.message);
    console.log("Error connecting");
  }
};
