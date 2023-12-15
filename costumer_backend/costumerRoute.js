import express from "express";
import { Costumer } from "./costumerModel.js";
const router = express.Router();

export default router;

// add a costumer
router.post("/costumer/add", async (req, res) => {
  const newCostumer = req.body;
  const costumer = await Costumer.findOne({ email: newCostumer.email });
  if (costumer) {
    res
      .status(409)
      .send({ message: "Costumer with this email already exists" });
  }
  try {
    await Costumer.create(newCostumer);
  } catch (error) {
    res.status(400).send({ message: "error.message" });
  }
  return res.status(200).send({ message: "Costumer added successfully" });
});

// get all costumer details
router.get("/costumer/details", async (req, res) => {
  try {
    const costumers = await Costumer.find();
    return res.status(200).send(costumers);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

// get a single costumer detail
router.get("/costumer/detail/:id", async (req, res) => {
  const costumerId = req.params.id;
  try {
    const costumer = await Costumer.findById(costumerId);
    return res.status(200).send(costumer);
  } catch (error) {
    return res.status(404).send({ message: "Costumer not found" });
  }
});
