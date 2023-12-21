import express from "express";
import {
  addVehicle,
  checkIfVehicleExists,
  deleteVehicle,
  getSingleVehicleDetail,
  getVehicleDetails,
  updateVehicle,
  validateVehicleData,
  validateVehicleId,
  validateVehicleOwner,
} from "./vehicle.service.js";
import { validateAccessToken } from "../middlewares/authentication.middleware.js";

const router = express.Router();
export default router;

// ? create(add/register) a vehicle
router.post("/add", validateAccessToken, validateVehicleData, addVehicle);

// ? get the list of all vehicles
router.get("/details", getVehicleDetails);

// ? find a single vehicle
router.get("/details/:id", validateVehicleId, getSingleVehicleDetail);

// ? update a vehicle
router.put(
  "/edit/:id",
  validateVehicleData,
  validateVehicleId,
  checkIfVehicleExists,
  updateVehicle
);

// ? delete a vehicle
router.delete(
  "/delete/:id",
  validateAccessToken,
  validateVehicleId,
  checkIfVehicleExists,
  validateVehicleOwner,
  deleteVehicle
);
