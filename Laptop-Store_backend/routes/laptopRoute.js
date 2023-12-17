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
router.get("/details", findAllLaptop);

// find single laptop detail
router.get("/details/:id", validateLaptopId, findSingleLaptop);

// add a laptop
router.post("/add", validateLaptopData, createLaptop);

// update a laptop
router.put(
  "/edit/:id",
  validateLaptopId,
  validateLaptopData,
  checkIfLaptopExists,
  editLaptop
);

// delete a laptop
router.delete("/delete/:id", validateLaptopId, deleteLaptop);

export default router;
