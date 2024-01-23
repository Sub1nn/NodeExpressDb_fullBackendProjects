import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./user.model.js";

// ? register new user
export const registerUser = async (req, res) => {
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
};

// ? log the user in
export const loginInUser = async (req, res) => {
  // get login credentials from req.body
  const loginCredentials = req.body;
  // check if user exists
  const user = await User.findOne({ email: loginCredentials.email });
  if (!user) {
    return res.status(404).send({ message: "user not found" });
  }
  // check if password matches
  const passwordMatch = await bcrypt.compare(
    loginCredentials.password,
    user.password
  );
  if (!passwordMatch) {
    return res.status(401).send({ message: "Invalid email or password" });
  }
  // remove password from user
  user.password = undefined;
  // generate access-token, refresh-token
  const accessToken = jwt.sign(
    { email: user.email, _id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2h" }
  );
  const refreshToken = jwt.sign(
    { email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "2d" }
  );
  user.refreshToken = refreshToken;
  // logged in user
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  // return appropriate response
  return res.status(200).send({
    user: loggedInUser,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
};
