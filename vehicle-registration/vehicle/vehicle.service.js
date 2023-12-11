import { Vehicle } from "./vehicle.model.js";
import { vehicleValidationSchema } from "./vehicleValidation.schema.js";
import { checkMongoIdValidity } from "../utils.js";

// add a vehicle
export const addVehicle = async (req, res) => {
  const newVehicle = req.body;

  try {
    await vehicleValidationSchema.validate(newVehicle);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
  const vehicle = await Vehicle.findOne({ name: newVehicle.name });
  if (vehicle) {
    return res
      .status(409)
      .send({ message: "Vehicle with the name already exists" });
  }
  try {
    await Vehicle.create(newVehicle);
  } catch (error) {
    return res.status(400).send(error.message);
  }
  return res.status(200).send({ message: "Vehicle added successfully" });
};

// Get single vehicle details
export const getSingleVehicleDetail = async (req, res) => {
  const vehicleId = req.params.id;
  // validate for mongo id
  const isValid = checkMongoIdValidity(vehicleId);
  // if not valid mongo id
  if (!isValid) {
    return res.status(400).send({ message: "Invalid Vehicle Id" });
  }
  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) {
    res.status(400).send({ message: "Invalid vehicle Id" });
  }
  return res.status(200).send(vehicle);
};

// get  all vehicle details

export const getVehicleDetails = async (req, res) => {
  try {
    const vehicleList = await Vehicle.find();
    return res.status(200).send(vehicleList);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// update a vehicle

export const updateVehicle = async (req, res) => {
  const vehicleId = req.params.id;
  const vehicleToBeUpdated = req.body;
  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) {
    res.status(400).send({ message: "Invalid vehicle Id" });
  }
  await Vehicle.updateOne({ _id: vehicleId }, { ...vehicleToBeUpdated });
  return res.status(200).send({ message: "Vehicle updated successfully" });
};

// delete a vehicle

export const deleteVehicle = async (req, res) => {
  const vehicleId = req.params.id;
  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) {
    res.status(400).send({ message: "Invalid vehicle Id" });
  }
  await Vehicle.deleteOne({ _id: vehicleId });
  return res.status(200).send({ message: "Vehicle deleted successfully" });
};
