import bodyParser from "body-parser";
import { Express } from "express";
import express from "express";

import shopRouter from "./routes/shop";
import adminRouter from "./routes/admin";
import authRouter from "./routes/auth";

const app: Express = express();

app.use(express.json());

// app.use(bodyParser.json());

app.use(shopRouter);
app.use(adminRouter);
app.use("/auth", authRouter);

app.listen(3000);
