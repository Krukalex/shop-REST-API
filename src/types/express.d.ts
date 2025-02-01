import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string; // Declare userId field on the request object
    }
  }
}
