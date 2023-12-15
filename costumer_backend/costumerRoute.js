import express from "express";
import { Costumer } from "./costumerModel.js";
const router = express.Router();

export default router;

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
