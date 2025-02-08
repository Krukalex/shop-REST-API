import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt, { Jwt } from "jsonwebtoken";

import User from "../models/User";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { ExistingUserError } from "../errors/existing-user-error";
import { NotFoundError } from "../errors/not-found-error";
import { IncorrectPasswordError } from "../errors/incorrect-password-error";

interface SignupBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new RequestValidationError(errors.array()));
  }
  const body: SignupBody = req.body;
  try {
    const { name, email, password } = body;
    const existingUser: User | undefined = User.getByEmail(body.email);
    if (existingUser) {
      throw new ExistingUserError();
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User(name, email, hashedPassword);
    user.save();
    res.status(200).json({ message: "User created", userId: user.user_id });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new RequestValidationError(errors.array()));
  }
  const body: LoginBody = req.body;
  try {
    const { email, password } = body;
    const user: User | undefined = User.getByEmail(email);
    if (!user) {
      throw new NotFoundError();
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new IncorrectPasswordError();
    }
    const token = jwt.sign(
      { email: user.email, userId: user.user_id },
      "supersecretkey",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token: token, userId: user.user_id });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
