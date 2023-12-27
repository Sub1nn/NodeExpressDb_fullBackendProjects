import { Router } from "express";

import { validateReqBody } from "../middlewares/validation.middleware.js";
import {
  userDataSchemaValidation,
  // userEmailSchemaValidation,
} from "./user.schema.validation.js";
import { loginInUser, registerUser } from "./user.service.js";

const router = Router();

// ? register new user
router.post(
  "/user/register",
  validateReqBody(userDataSchemaValidation),
  registerUser
);

// ? login user
router.post(
  "/user/login",
  // validateReqBody(userEmailSchemaValidation),
  loginInUser
);

export default router;
