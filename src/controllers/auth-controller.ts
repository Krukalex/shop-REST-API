import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt, { Jwt } from "jsonwebtoken";

import User from "../models/User";

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
  const body: SignupBody = req.body;
  if (!body.email && !body.name && !body.password) {
    const error = new Error("Missing required fields in request") as any;
    error.status = 400;
    return error;
  }
  try {
    const { name, email, password } = body;
    const existingUser: User | undefined = User.getByEmail(body.email);
    if (existingUser) {
      const error = new Error(
        "User with this email already exists, login or use a different email"
      ) as any;
      error.status = 409;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User(name, email, hashedPassword);
    user.save();
    res.status(200).json({ message: "User created", userId: user.user_id });
  } catch (err: any) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body: LoginBody = req.body;
  if (!body.email && !body.password) {
    const error = new Error("Missing required fields in request") as any;
    error.status = 400;
    return error;
  }
  try {
    const { email, password } = body;
    const user: User | undefined = User.getByEmail(email);
    if (!user) {
      const error = new Error(
        "A user with this email could not be found"
      ) as any;
      error.status = 404;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password!") as any;
      error.status = 401;
      throw error;
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
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
