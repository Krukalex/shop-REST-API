import { Router } from "express";
import {
  addToCartController,
  createOrderController,
  getCartController,
  getOrdersController,
  getProductController,
  getProductsController,
  removeFromCartController,
} from "../controllers/shop-controller";
import { isAuth } from "../middleware/is-auth";
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

shopRouter.get("/get-orders", isAuth, getOrdersController);

shopRouter.post(
  "/add-to-cart",
  [
    body("prodId").notEmpty().withMessage("Product ID is required"),
    body("quantity").notEmpty().isNumeric().withMessage("quantity is required"),
  ],
  isAuth,
  addToCartController
);

shopRouter.post("/create-order", isAuth, createOrderController);

shopRouter.delete(
  "/remove-from-cart",
  [
    body("prodId").notEmpty().withMessage("Product ID is required"),
    body("quantity").notEmpty().isNumeric().withMessage("quantity is required"),
  ],
  isAuth,
  removeFromCartController
);

export default shopRouter;
