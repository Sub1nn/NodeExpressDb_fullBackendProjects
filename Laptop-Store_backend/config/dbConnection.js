import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sub_1n:maya2046Lai@subin01.bbc2g1d.mongodb.net/laptop-store?retryWrites=true&w=majority"
    );
    console.log("Data connection established");
  } catch (error) {
    console.log("Failed to connect with database");
    console.log(error.message);
  }
};
