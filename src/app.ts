import bodyParser from "body-parser";
import { Express } from "express";
import express from "express";

import shopRouter from "./routes/shop";

const app: Express = express();

app.use(bodyParser.json());

app.use(shopRouter);

app.listen(3000);
