import { Router } from "express";
import {
  loginController,
  signupController,
} from "../controllers/auth-controller";
import { body } from "express-validator";

const authRouter = Router();

authRouter.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    body("name").notEmpty().withMessage("Name is required"),
  ],
  signupController
);

authRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginController
);

export default authRouter;
