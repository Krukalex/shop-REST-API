import { Router } from "express";
import {
  getProductsController,
  createProductController,
  deleteProductController,
  updateProductController,
} from "../controllers/admin-controller";
import { isAuth } from "../middleware/isAuth";

const adminRouter = Router();

adminRouter.get("/products", isAuth, getProductsController);

adminRouter.post("/products", isAuth, createProductController);

adminRouter.put("/products/:prodId", isAuth, updateProductController);

adminRouter.delete("/products/:prodId", isAuth, deleteProductController);

export default adminRouter;
