import { Router } from "express";
import {
  getProductController,
  getProductsController,
} from "../controllers/shop-controller";
import { isAuth } from "../middleware/isAuth";

const shopRouter = Router();

shopRouter.get("/", isAuth, getProductsController);

shopRouter.get("/products/:prodId", isAuth, getProductController);

export default shopRouter;
