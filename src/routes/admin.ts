import { Router } from "express";
import { createProductController } from "../controllers/admin-controller";

const adminRouter = Router();

adminRouter.post("/products", createProductController);

export default adminRouter;
