import express from "express";
import jwt from "jsonwebtoken";
import { todoValidationSchema } from "./todo.validation.js";
import { Todo } from "./todo.model.js";
import { extractAccessTokenFromHeaders } from "../utils/token.from.headers.js";
import { User } from "../user/user.model.js";
const router = express.Router();

router.post(
  "/todo/add",
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
    // console.log(req.headers)
    const token = extractAccessTokenFromHeaders(req.headers.authorization);
    // decrypt the token
    const payLoad = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // find user with email from payload
    const user = await User.findOne({ email: payLoad.email });
    if (!user) {
      return res.status(401).send({ message: "Unauthorized user" });
    }
    newTodo.userId = user._id;

    await Todo.create(newTodo);
    return res.status(201).send({ message: "Todo is added successfully" });
  }
);

export default router;
