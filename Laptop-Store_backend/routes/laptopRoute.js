import express from "express";
import {
  checkIfLaptopExists,
  createLaptop,
  deleteLaptop,
  editLaptop,
  findAllLaptop,
  findSingleLaptop,
  validateLaptopData,
  validateLaptopId,
} from "../services/laptopService.js";
const router = express.Router();

// find all laptop details
router.get("/laptop/details", findAllLaptop);

// find single laptop detail
router.get("/laptop/details/:id", validateLaptopId, findSingleLaptop);

router.post("/laptop/add", validateLaptopData, createLaptop);

router.put(
  "/laptop/edit/:id",
  validateLaptopId,
  validateLaptopData,
  checkIfLaptopExists,
  editLaptop
);

router.delete("/laptop/delete/:id", validateLaptopId, deleteLaptop);

export default router;
