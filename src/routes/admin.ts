import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  updateProductController,
} from "../controllers/admin-controller";

const adminRouter = Router();

adminRouter.post("/products", createProductController);

adminRouter.put("/products/:prodId", updateProductController);

adminRouter.delete("/products/:prodId", deleteProductController);

export default adminRouter;
