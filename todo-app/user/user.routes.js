import { Router } from "express";
import * as bcrypt from "bcrypt";
import * as Yup from "yup";
import { registerUserValidation } from "./user.validation.js";
import { User } from "./user.model.js";
const router = Router();

router.post(
  "/user/register",
  async (req, res) => {
    //extract new user data from req.body
    const newUser = req.body;
    // validate new user
    try {
      await registerUserValidation.validate(newUser);
    } catch (error) {
      // if validation fails throw error
      return res.status(400).send({ message: error.message });
    }
    next();
  },
  async (req, res) => {
    // extract new user data from req.body
    const newUser = req.body;

    // check if user with the email exists
    const user = await User.findOne({ email: newUser.email });
    // if user exists, throw error
    if (user) {
      return res
        .status(409)
        .send({ message: "User with this email already exists" });
    }
    // hash password using bcrypt
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    // create user
    await User.create(newUser);
    return res.status(201).send({ message: "User created successfully" });
  }
);

router.post(
  "/user/login",
  async (req, res) => {
    // extract login credentials from req.body
    const loginCredentials = req.body;
    // validate email
    try {
      const emailValidation = Yup.string()
        .email()
        .required()
        .trim()
        .lowercase();
      await emailValidation.validate(loginCredentials);
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
    next();
  },
  async (req, res) => {
    // extract login credentials from re.body
    const loginCredentials = req.body;
    // check if email matches
    const user = await User.findOne({ email: loginCredentials.email });
    if (!user) {
      return res.status(404).send({ message: "Invalid credentials" });
    }
    // check for password matches or not
    const passwordMatch = await bcrypt.compare(
      loginCredentials.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(404).send({ message: "Invalid credentials" });
    }
    user.password = undefined;
    return res.status(200).send(user);
  }
);

export default router;
