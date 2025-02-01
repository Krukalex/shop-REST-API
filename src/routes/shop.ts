import { Router } from "express";
import { getProductsController } from "../controllers/shop-controller";

const shopRouter = Router();

shopRouter.get("/", getProductsController);

export default shopRouter;
