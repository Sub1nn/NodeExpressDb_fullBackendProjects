import { Vehicle } from "./vehicle.model.js";
import { vehicleValidationSchema } from "./vehicleValidation.schema.js";
import { checkMongoIdValidity } from "../utils/mongoId.validation.js";

// ? validate vehicle data
export const validateVehicleData = async (req, res, next) => {
  // extract vehicle data from req.body
  const newVehicle = req.body;
  // validate vehicle data
  try {
    await vehicleValidationSchema.validate(newVehicle);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
  next();
};

// ? validate vehicle id
export const validateVehicleId = (req, res, next) => {
  // validate vehicle id for mongo id validation
  const vehicleId = req.params.id;
  const isValidId = checkMongoIdValidity(vehicleId);
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid Vehicle Id" });
  }
  next();
};

// ? validate vehicle owner
export const validateVehicleOwner = async (req, res, next) => {
  //extract id from req.params
  const vehicleId = req.params.id;
  // check of the owner of todo is the logged in user with token userId
  const vehicle = await Vehicle.findById(vehicleId);
  const vehicleOwnerId = vehicle.userId;
  const tokenUserId = req.user._id;
  const isOwnerOfVehicle = vehicleOwnerId.equals(tokenUserId);
  if (!isOwnerOfVehicle) {
    res.status(403).send({
      message: "Only owner of the vehicle has authority to manipulate data",
    });
  }
  next();
};

// ? check if vehicle exists
export const checkIfVehicleExists = async (req, res, next) => {
  // check if vehicle with the id exists
  const vehicleId = req.params.id;
  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) {
    res.status(400).send({ message: "Vehicle does not exist" });
  }
  next();
};

// ? add a vehicle to db
export const addVehicle = async (req, res) => {
  const newVehicle = req.body;
  const user = req.user;
  if (!user) {
    return res.status(401).send({ message: "user authorization failed" });
  }
  newVehicle.userId = user._id;

  await Vehicle.create(newVehicle);
  return res.status(200).send({ message: "Vehicle added successfully" });
};

// ? Get a single vehicle details
export const getSingleVehicleDetail = async (req, res) => {
  const vehicleId = req.params.id;
  const vehicle = await Vehicle.findById(vehicleId, { userId: 0 });
  if (!vehicle) {
    return res.status(400).send({ message: "Invalid vehicle Id" });
  }
  return res.status(200).send(vehicle);
};

// ? get all vehicle details
export const getVehicleDetails = async (req, res) => {
  try {
    const vehicleList = await Vehicle.find({}, { userId: 0 });
    return res.status(200).send(vehicleList);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// ? update a vehicle
export const updateVehicle = async (req, res) => {
  // extract id from req.params
  const vehicleId = req.params.id;
  //extract new values form req.body
  const vehicleToBeUpdated = req.body;
  // finally update vehicle with find condition and update condition
  await Vehicle.updateOne({ _id: vehicleId }, { ...vehicleToBeUpdated });
  // return appropriate response
  return res.status(200).send({ message: "Vehicle updated successfully" });
};

// ? delete a vehicle
export const deleteVehicle = async (req, res) => {
  //extract id from req.params
  const vehicleId = req.params.id;
  // delete vehicle
  await Vehicle.deleteOne({ _id: vehicleId });
  return res.status(200).send({ message: "Vehicle deleted successfully" });
};
