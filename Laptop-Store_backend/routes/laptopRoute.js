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

router.post("/add", validateLaptopData, createLaptop);

router.put(
  "/edit/:id",
  validateLaptopId,
  validateLaptopData,
  checkIfLaptopExists,
  editLaptop
);

router.delete("/delete/:id", validateLaptopId, deleteLaptop);

export default router;
