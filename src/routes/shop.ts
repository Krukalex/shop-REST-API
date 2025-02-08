import { Router } from "express";
import {
  addToCartController,
  getCartController,
  getProductController,
  getProductsController,
} from "../controllers/shop-controller";
import { isAuth } from "../middleware/isAuth";
import { param, body } from "express-validator";

const shopRouter = Router();

shopRouter.get("/", isAuth, getProductsController);

shopRouter.get(
  "/products/:prodId",
  [param("prodId").trim().notEmpty().withMessage("Product ID is required")],
  isAuth,
  getProductController
);

shopRouter.get("/get-cart", isAuth, getCartController);

shopRouter.post(
  "/add-to-cart",
  [
    body("productId").notEmpty().withMessage("Product ID is required"),
    body("quantity").notEmpty().isNumeric().withMessage("quantity is required"),
  ],
  isAuth,
  addToCartController
);

export default shopRouter;
