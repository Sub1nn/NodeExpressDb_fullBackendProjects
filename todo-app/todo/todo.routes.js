import express from "express";
import { validateAccessToken } from "../middlewares/authentication.middleware.js";
import { checkMongoIdValidity } from "../utils/mongoId.validity.js";
import { Todo } from "./todo.model.js";
import {
  getTodoListValidationSchema,
  todoValidationSchema,
} from "./todo.validation.js";
import { validateReqBody } from "../middlewares/validation.middleware.js";

const router = express.Router();

// ? add/create a todo
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

// ? delete a todo
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

// ? get todo with id
router.get("/todo/details/:id", validateAccessToken, async (req, res) => {
  // extract id from req.params
  const todoId = req.params.id;

  // check for mongo id validity
  const isValidMongoId = checkMongoIdValidity(todoId);

  // if not valid mongo id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // check if todo exists with provided todoId
  const todo = await Todo.findOne({ _id: todoId });

  // if todo not found, throw error
  if (!todo) {
    return res.status(404).send({ message: "Todo does not exist." });
  }

  // check for todo ownership
  const todoOwnerId = todo.userId;
  const loggedInUserId = req.userDetails._id;

  const isOwnerOfTodo = todoOwnerId.equals(loggedInUserId);

  if (!isOwnerOfTodo) {
    return res.status(403).send({ message: "You are not owner of this todo." });
  }

  todo.userId = undefined;

  return res.status(200).send(todo);
});

// ? add skip-limit-search
router.post(
  "/todo/list",
  validateAccessToken,
  validateReqBody(getTodoListValidationSchema),
  async (req, res) => {
    // extract page limit data from req.body
    const { page, limit, search } = req.body;
    // skip, limit, search
    const skip = (page - 1) * limit;

    let userId = req.userDetails._id;

    const todos = await Todo.aggregate([
      {
        $match: {
          userId: userId,
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        }, // i => case sensitive meaning it searches both upper and lowercase characters
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      // {
      //   $unwind: "$userDetails",
      // },
      {
        $project: {
          userId: 0,
          "userDetails._id": 0,
          "userDetails.password": 0,
        },
      },
    ]);
    return res.status(200).send(todos);
  }
);

export default router;
