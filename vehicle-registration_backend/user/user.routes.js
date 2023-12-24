import { Router } from "express";

import {
  loginInUser,
  registerUser,
  validateEmail,
  validateNewUser,
} from "./user.service.js";

const router = Router();

// ? register new user
router.post("/user/register", validateNewUser, registerUser);

// ? login user
router.post("/user/login", validateEmail, loginInUser);

export default router;
