import { mongoIdValidator } from "../middlewares/mongoIdValidator.js";
import { Costumer } from "./costumerModel.js";
import { CostumerSchemaValidator } from "./costumerSchemaValidation.js";

// validate costumer id (mongoose id)
export const validateCostumerId = async (req, res, next) => {
  // get costumer id
  const costumerId = req.params.id;
  // validate the id with mongo id validator file
  const isValidId = await mongoIdValidator(costumerId);
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid costumer id" });
  }
  next();
};

// validate costumer data (mongoose schema)
export const validateCostumerData = async (req, res, next) => {
  // get costumer data
  const costumerData = req.body;
  // validate the data with yup schema validator file
  try {
    await CostumerSchemaValidator.validate(costumerData);
  } catch (error) {
    return res.status(400).send(error.message);
  }
  next();
};

// check if the costumer exists in the database
export const checkIfCostumerExists = async (req, res, next) => {
  // get the costumer id
  const costumerId = req.params.id;
  // check if costumer exists
  const costumer = await Costumer.findById(costumerId);
  if (!costumer) {
    return res.status(404).send({ message: "Cannot find costumer" });
  }
  next();
};

// add a costumer to db
export const addCostumer = async (req, res) => {
  // get costumer data
  const costumerData = req.body;
  // create the costumer
  try {
    await Costumer.create(costumerData);
  } catch (error) {
    res.status(500).send({ message: "error.message" });
  }
  // return appropriate response
  return res.status(200).send({ message: "Costumer added successfully" });
};

// get all costumer details
export const getCostumerDetails = async (req, res) => {
  try {
    const costumers = await Costumer.find();
    return res.status(200).send(costumers);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// get a single costumer detail
export const getSingleCostumerDetail = async (req, res) => {
  // get the costumer id from req.params.id
  const costumerId = req.params.id;
  // get the costumer detail with the costumerId
  try {
    const costumer = await Costumer.findById(costumerId);
    return res.status(200).send(costumer);
  } catch (error) {
    return res.status(404).send({ message: "Costumer not found" });
  }
};

// update a costumer
export const updateCostumer = async (req, res) => {
  // get the costumer id from req.params
  const costumerId = req.params.id;
  // get the edited costumer data from req.body
  const editedCostumerData = req.body;
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
};

// delete a costumer
export const deleteCostumer = async (req, res) => {
  // get the costumer Id to be updated
  const costumerId = req.params.id;
  //delete the costumer
  try {
    await Costumer.findByIdAndDelete({ _id: costumerId });
    return res.status(200).send({ message: "costumer deleted successfully" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
