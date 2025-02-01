import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  userId: string;
  email: string;
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated") as any;
    error.status = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    const error = new Error("Not authenticated") as any;
    error.status = 401;
    throw error;
  }
  let decodedToken: JwtPayload;
  try {
    decodedToken = jwt.verify(token, "supersecretkey") as JwtPayload;
  } catch (err) {
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
