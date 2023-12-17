import express from "express";
import { Costumer } from "./costumerModel.js";
import { CostumerSchemaValidator } from "./costumerSchemaValidation.js";
import { mongoIdValidator } from "../middlewares/mongoIdValidator.js";
const router = express.Router();

// add a costumer
router.post("/costumer/add", async (req, res) => {
  // get new costumer data from req.body
  const newCostumerData = req.body;
  // validate the costumer data
  try {
    await CostumerSchemaValidator.validate(newCostumerData);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
  // check the uniqueness of costumer with email
  const costumer = await Costumer.findOne({ email: newCostumerData.email });
  if (costumer) {
    res
      .status(409)
      .send({ message: "Costumer with this email already exists" });
  }
  // create the costumer
  try {
    await Costumer.create(newCostumerData);
  } catch (error) {
    res.status(500).send({ message: "error.message" });
  }
  // return appropriate response
  return res.status(200).send({ message: "Costumer added successfully" });
});

// get all costumer details
router.get("/costumer/detail", async (req, res) => {
  try {
    const costumers = await Costumer.find();
    return res.status(200).send(costumers);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

// get a single costumer detail
router.get("/costumer/detail/:id", async (req, res) => {
  // get the costumer id from req.params.id
  const costumerId = req.params.id;
  // get the costumer detail with the costumerId
  try {
    const costumer = await Costumer.findById(costumerId);
    return res.status(200).send(costumer);
  } catch (error) {
    return res.status(404).send({ message: "Costumer not found" });
  }
});

// update a costumer
router.put("/costumer/edit/:id", async (req, res) => {
  // validate costumer Id to be updated
  const costumerId = req.params.id;
  const isValidCostumer = mongoIdValidator(costumerId);
  if (!isValidCostumer) {
    return res.status(400).send({ message: "not valid costumer id" });
  }
  // validate edited costumer schemaData
  const editedCostumerData = req.body;
  try {
    await CostumerSchemaValidator.validate(editedCostumerData);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
  // check if costumer exists
  const costumer = await Costumer.findById(costumerId);
  if (!costumer) {
    return res.status(404).send({ message: "cannot find costumer" });
  }
  // update the costumer
  try {
    await Costumer.findByIdAndUpdate(
      { _id: costumerId },
      { ...editedCostumerData }
    );
    return res.status(200).send({ message: "costumer updated successfully" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;
