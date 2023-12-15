import { Laptop } from "../models/laptopModel.js";
import { laptopSchemaValidator } from "../middlewares/LaptopSchemaValidator.js";
import { mongoIdValidator } from "../middlewares/mongoIdValidator.js";

export const validateLaptopId = (req, res, next) => {
  const laptopId = req.params.id;
  const isValidId = mongoIdValidator(laptopId);
  if (!isValidId) {
    return res.status(404).send({ message: "Invalid Laptop Id" });
  }
  next();
};

export const validateLaptopData = async (req, res, next) => {
  const newLaptopData = req.body;
  try {
    await laptopSchemaValidator.validate(newLaptopData);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
  next();
};

export const checkIfLaptopExists = async (req, res, next) => {
  const laptopId = req.params.id;
  const laptop = await Laptop.findById(laptopId);
  if (!laptop) {
    return res.status(404).send({ message: "Laptop not found" });
  }
  next();
};

// find all laptop details
export const findAllLaptop = async (req, res) => {
  try {
    const laptopDetails = await Laptop.find();
    return res.status(200).send(laptopDetails);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// find a single laptop detail
export const findSingleLaptop = async (req, res) => {
  const laptopId = req.params.id;
  try {
    const laptop = await Laptop.findById(laptopId);
    return res.status(200).send(laptop);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// create a laptop
export const createLaptop = async (req, res) => {
  const newLaptopData = req.body;
  try {
    await Laptop.create(newLaptopData);
    return res.status(200).send({ message: "New Laptop data created" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// edit a laptop
export const editLaptop = async (req, res) => {
  const editedLaptopData = req.body;
  const laptopId = req.params.id;
  try {
    await Laptop.updateOne({ _id: laptopId }, { ...editedLaptopData });
    return res.status(200).send({ message: "Laptop updated successfully" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// delete a laptop
export const deleteLaptop = async (req, res) => {
  const laptopId = req.params.id;
  try {
    await Laptop.deleteOne({ _id: laptopId });
    return res.status(200).send({ message: "Laptop deleted successfully" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
