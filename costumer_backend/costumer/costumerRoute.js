import express from "express";
import {
  addCostumer,
  checkIfCostumerExists,
  deleteCostumer,
  getCostumerDetails,
  getSingleCostumerDetail,
  validateCostumerData,
  validateCostumerId,
} from "./costumerService.js";

const router = express.Router();

// add a costumer
router.post("/costumer/add", validateCostumerData, addCostumer);

// get all costumer details
router.get("/costumer/detail", getCostumerDetails);

// get a single costumer detail
router.get("/costumer/detail/:id", validateCostumerId, getSingleCostumerDetail);

// update a costumer
router.put(
  "/costumer/edit/:id",
  validateCostumerId,
  validateCostumerData,
  checkIfCostumerExists
);

//delete a costumer
router.delete("/costumer/delete/:id", validateCostumerId, deleteCostumer);

export default router;
