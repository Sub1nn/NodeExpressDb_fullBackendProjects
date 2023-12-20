import express from "express";
import { validateAccessToken } from "../middlewares/authentication.middleware.js";
import { checkMongoIdValidity } from "../utils/mongoId.validity.js";
import { Todo } from "./todo.model.js";
import { todoValidationSchema } from "./todo.validation.js";

const router = express.Router();

router.post(
  "/todo/add",
  validateAccessToken,
  async (req, res, next) => {
    const newTodo = req.body;

    try {
      await todoValidationSchema.validate(newTodo);
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }

    next();
  },
  async (req, res) => {
    const newTodo = req.body;
    const user = req.userDetails;

    newTodo.userId = user._id;

    await Todo.create(newTodo);

    return res.status(201).send({ message: "Todo is added successfully." });
  }
);

router.delete("/todo/delete/:id", validateAccessToken, async (req, res) => {
  // extract id from req.params
  const todoId = req.params.id;

  // check for mongo id validity
  const isValidMongoId = checkMongoIdValidity(todoId);

  // if not valid mongo id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // check if todo with that id exists
  const todo = await Todo.findOne({ _id: todoId });

  // if not todo, throw error
  if (!todo) {
    return res.status(404).send({ message: "Todo does not exist." });
  }

  // check if loggedIn user is owner of that todo
  const tokenUserId = req.userDetails._id;
  const todoOwnerId = todo.userId;

  const isOwnerOfTodo = todoOwnerId.equals(tokenUserId);

  // if not owner ,throw error
  if (!isOwnerOfTodo) {
    return res.status(403).send({ message: "You are not owner of this todo." });
  }

  // delete todo
  await Todo.deleteOne({ _id: todoId });
  // send appropriate response

  return res.status(200).send({ message: "Todo is deleted successfully." });
});

export default router;
