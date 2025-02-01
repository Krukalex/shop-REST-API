import { Router } from "express";
import {
  getProductController,
  getProductsController,
} from "../controllers/shop-controller";

const shopRouter = Router();

shopRouter.get("/products/:prodId", getProductController);

shopRouter.get("/", getProductsController);

export default shopRouter;
