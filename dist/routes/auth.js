"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth-controller");
const express_validator_1 = require("express-validator");
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email must be valid"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters"),
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
], auth_controller_1.signupController);
authRouter.post("/login", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email must be valid"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
], auth_controller_1.loginController);
exports.default = authRouter;
