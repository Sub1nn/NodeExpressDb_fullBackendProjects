import express from "express";
import { todoValidationSchema } from "./todo.validation.js";
import { Todo } from "./todo.model.js";
const router = express.Router();

router.post(
  "/todo/add",
  async (req, res, next) => {
    const newTodo = req.body;
    try {
      await todoValidationSchema.validate(newTodo);
    } catch (error) {
      return res.status(400).send({ message: "" });
    }
    next();
  },
  async (req, res) => {
    const newTodo = req.body;
    await Todo.create(newTodo);
    return res.status(201).send({ message: "" });
  }
);

export default router;
