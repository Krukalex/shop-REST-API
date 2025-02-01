import bodyParser from "body-parser";
import { Express } from "express";
import express from "express";

import shopRouter from "./routes/shop";
import adminRouter from "./routes/admin";

const app: Express = express();

app.use(express.json());

// app.use(bodyParser.json());

app.use(shopRouter);
app.use(adminRouter);

app.listen(3000);
