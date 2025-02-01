import { Router } from "express";
import { signupController } from "../controllers/auth-controller";

const authRouter = Router();

authRouter.post("/signup", signupController);

authRouter.post("/login");

export default authRouter;
