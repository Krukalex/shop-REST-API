import bodyParser from "body-parser";
import { Express } from "express";
import express from "express";

import { create_db } from "./data/db";

import shopRouter from "./routes/shop";
import adminRouter from "./routes/admin";
import authRouter from "./routes/auth";
import { errorHandler } from "./middleware/error-handler";

const app: Express = express();

create_db();

app.use(express.json());

// app.use(bodyParser.json());

app.use(shopRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Listening on 3000");
});
