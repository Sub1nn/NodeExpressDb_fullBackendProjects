import mongoose from "mongoose";

const dbName = "vehicle-registration";
const dbPass = "maya2046Lai";
export const connectDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://sub_1n:${dbPass}@subin01.bbc2g1d.mongodb.net/${dbName}?retryWrites=true&w=majority`
    );
    console.log("Data connection successful");
  } catch (error) {
    console.log("DB connection failed");
    console.log(error.message);
  }
};
