import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/unauthorized-error";

interface JwtPayload {
  userId: string;
  email: string;
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    throw new UnauthorizedError();
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new UnauthorizedError();
  }
  let decodedToken: JwtPayload;
  try {
    decodedToken = jwt.verify(token, "supersecretkey") as JwtPayload;
  } catch (err) {
    throw err;
  }
  if (!decodedToken) {
    throw new UnauthorizedError();
  }
  req.userId = decodedToken.userId;
  next();
};
