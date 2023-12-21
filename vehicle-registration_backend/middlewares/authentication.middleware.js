import { User } from "../user/user.model.js";
import jwt from "jsonwebtoken";

export const validateAccessToken = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const splittedToken = authorization?.split(" ");
  const token = splittedToken?.length === 2 ? splittedToken[1] : null;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  let payLoad;
  try {
    payLoad = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
  const user = await User.findOne({ email: payLoad.email });
  if (!user) {
    return res.status(401).send({ message: "Unauthorized user" });
  }

  req.user = user;

  next();
};
