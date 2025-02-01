import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  updateProductController,
} from "../controllers/admin-controller";
import { isAuth } from "../middleware/isAuth";

const adminRouter = Router();

adminRouter.post("/products", isAuth, createProductController);

adminRouter.put("/products/:prodId", isAuth, updateProductController);

adminRouter.delete("/products/:prodId", isAuth, deleteProductController);

export default adminRouter;
