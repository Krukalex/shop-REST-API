import bodyParser from "body-parser";
import { Express } from "express";
import express from "express";
import { Request, Response, NextFunction } from "express";

import { create_db } from "./data/db";

import shopRouter from "./routes/shop";
import adminRouter from "./routes/admin";
import authRouter from "./routes/auth";

const app: Express = express();

create_db();

app.use(express.json());

// app.use(bodyParser.json());

app.use(shopRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  const status = error.status || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

app.listen(3000);
