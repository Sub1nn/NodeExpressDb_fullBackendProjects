import mongoose from "mongoose";

export const mongoIdValidator = (id) => {
  const isValidId = mongoose.Types.ObjectId.isValidId(id);
  return isValidId;
};
