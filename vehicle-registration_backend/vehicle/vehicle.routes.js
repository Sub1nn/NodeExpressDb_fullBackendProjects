import express from "express";
import {
  addVehicle,
  checkIfVehicleExists,
  deleteVehicle,
  getSingleVehicleDetail,
  getVehicleDetails,
  updateVehicle,
  validateVehicleId,
  validateVehicleOwner,
} from "./vehicle.service.js";
import { validateAccessToken } from "../middlewares/authentication.middleware.js";
import { Vehicle } from "./vehicle.model.js";
import {
  getVehicleListValidationSchema,
  vehicleValidationSchema,
} from "./vehicleValidation.schema.js";
import { validateReqBody } from "../middlewares/validation.middleware.js";

const router = express.Router();

// ? create(add/register) a vehicle
router.post(
  "/add",
  validateAccessToken,
  validateReqBody(vehicleValidationSchema),
  addVehicle
);

// ? get the list of all vehicles
router.get("/details", validateAccessToken, getVehicleDetails);

// ? find a single vehicle
router.get(
  "/details/:id",
  validateAccessToken,
  validateVehicleId,
  checkIfVehicleExists,
  validateVehicleOwner,
  getSingleVehicleDetail
);

// ? update a vehicle
router.put(
  "/edit/:id",
  validateAccessToken,
  validateVehicleId,
  checkIfVehicleExists,
  validateReqBody(vehicleValidationSchema),
  validateVehicleOwner,
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

router.post(
  "/list",
  validateAccessToken,
  validateReqBody(getVehicleListValidationSchema),
  async (req, res) => {
    const { page, limit, search } = req.body;
    const skip = (page - 1) * limit;
    const userId = req.user._id;
    const vehicles = await Vehicle.aggregate([
      {
        $match: {
          userId: userId,
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          userId: 0,
        },
      },
    ]);
    return res.status(200).send(vehicles);
  }
);

export default router;
