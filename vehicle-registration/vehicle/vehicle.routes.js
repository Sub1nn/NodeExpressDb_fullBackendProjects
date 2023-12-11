import express from "express";
import {
  addVehicle,
  deleteVehicle,
  getSingleVehicleDetail,
  getVehicleDetails,
  updateVehicle,
} from "./vehicle.service.js";

const router = express.Router();
export default router;

// create(add/register) a vehicle
router.post("/add", addVehicle);

// get the list of all vehicles
router.get("/details", getVehicleDetails);

// find a single vehicle
router.get("/details/:id", getSingleVehicleDetail);

// update a vehicle
router.put("/edit/:id", updateVehicle);

// delete a vehicle
router.delete("/delete/:id", deleteVehicle);
