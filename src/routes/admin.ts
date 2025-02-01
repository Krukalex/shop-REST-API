import { Router } from "express";
import {
  createProductController,
  updateProductController,
} from "../controllers/admin-controller";

const adminRouter = Router();

adminRouter.post("/products", createProductController);

adminRouter.put("/products/:prodId", updateProductController);

export default adminRouter;
