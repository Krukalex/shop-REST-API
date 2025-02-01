import { Router } from "express";
import {
  getProductController,
  getProductsController,
} from "../controllers/shop-controller";

const shopRouter = Router();

shopRouter.get("/", getProductsController);

shopRouter.get("/products/:prodId", getProductController);

export default shopRouter;
