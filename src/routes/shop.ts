import { Router } from "express";
import {
  getProductController,
  getProductsController,
} from "../controllers/shop-controller";
import { isAuth } from "../middleware/isAuth";
import { param } from "express-validator";

const shopRouter = Router();

shopRouter.get("/", isAuth, getProductsController);

shopRouter.get(
  "/products/:prodId",
  [param("prodId").trim().notEmpty().withMessage("Product ID is required")],
  isAuth,
  getProductController
);

export default shopRouter;
