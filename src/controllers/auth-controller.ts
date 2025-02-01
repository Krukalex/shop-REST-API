import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import { users } from "../data/dummyData";

import User from "../models/User";

interface SignupBody {
  email: string;
  name: string;
  password: string;
}

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body: SignupBody = req.body;
  if (!body.email && !body.name && !body.password) {
    res.status(400).json({ message: "Missing required product fields" });
    return;
  }
  try {
    const { email, name, password } = body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User(email, name, hashedPassword);
    users.push(user);
    res.status(200).json({ message: "User created", userId: user.id });
  } catch (err) {
    console.log(err);
  }
};
