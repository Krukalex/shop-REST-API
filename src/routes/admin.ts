import { Router } from "express";
import {
  getProductsController,
  createProductController,
  deleteProductController,
  updateProductController,
} from "../controllers/admin-controller";
import { isAuth } from "../middleware/isAuth";
import { body, param } from "express-validator";

const adminRouter = Router();

adminRouter.get("/products", isAuth, getProductsController);

adminRouter.post(
  "/products",
  [
    body("title").trim().notEmpty().withMessage("Title must be included"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description must be included"),
    body("price")
      .trim()
      .isNumeric()
      .notEmpty()
      .withMessage("Price must be included"),
  ],
  isAuth,
  createProductController
);

adminRouter.put(
  "/products/:prodId",
  [
    body("title").optional().isString().withMessage("Title must be a string."),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string."),
    body("price").optional().isNumeric().withMessage("Price must be a number."),
    param("prodId")
      .trim()
      .notEmpty()
      .withMessage("Product ID is required to make update"),
  ],
  isAuth,
  updateProductController
);

adminRouter.delete(
  "/products/:prodId",
  [param("prodId").trim().notEmpty().withMessage("Product ID is required")],
  isAuth,
  deleteProductController
);

export default adminRouter;
