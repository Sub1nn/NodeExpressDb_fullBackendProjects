import { Router } from "express";
import {
  userDataSchemaValidation,
  userEmailSchemaValidation,
} from "./user.schema.validation.js";
import { User } from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = Router();

// register new user
router.post(
  "/user/register",
  async (req, res, next) => {
    const newUser = req.body;
    try {
      await userDataSchemaValidation.validate(newUser);
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
    next();
  },
  async (req, res) => {
    const newUser = req.body;
    const user = await User.findOne({ email: newUser.email });
    if (user) {
      return res
        .status(409)
        .send({ message: "user with the email already exists" });
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    await User.create(newUser);
    return res.status(201).send({ message: "user registered successfully" });
  }
);

// login user

router.post(
  "/user/login",
  async (req, res, next) => {
    const loginCredentials = req.body;
    try {
      await userEmailSchemaValidation.validate(loginCredentials.email);
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
    next();
  },
  async (req, res) => {
    const loginCredentials = req.body;
    const user = User.findOne({ email: loginCredentials.email });
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    const passwordMatch = await bcrypt.compare(
      loginCredentials.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    user.password = undefined;
    const token = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET
    );
    return res.status(200).send({ user, accessToken: token });
  }
);

export default router;
