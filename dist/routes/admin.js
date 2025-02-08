"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin-controller");
const isAuth_1 = require("../middleware/isAuth");
const express_validator_1 = require("express-validator");
const adminRouter = (0, express_1.Router)();
adminRouter.get("/products", isAuth_1.isAuth, admin_controller_1.getProductsController);
adminRouter.post("/products", [
    (0, express_validator_1.body)("title").trim().notEmpty().withMessage("Title must be included"),
    (0, express_validator_1.body)("description")
        .trim()
        .notEmpty()
        .withMessage("Description must be included"),
    (0, express_validator_1.body)("price")
        .trim()
        .isNumeric()
        .notEmpty()
        .withMessage("Price must be included"),
], isAuth_1.isAuth, admin_controller_1.createProductController);
adminRouter.put("/products/:prodId", [
    (0, express_validator_1.body)("title").optional().isString().withMessage("Title must be a string."),
    (0, express_validator_1.body)("description")
        .optional()
        .isString()
        .withMessage("Description must be a string."),
    (0, express_validator_1.body)("price").optional().isNumeric().withMessage("Price must be a number."),
    (0, express_validator_1.param)("prodId")
        .trim()
        .notEmpty()
        .withMessage("Product ID is required to make update"),
], isAuth_1.isAuth, admin_controller_1.updateProductController);
adminRouter.delete("/products/:prodId", [(0, express_validator_1.param)("prodId").trim().notEmpty().withMessage("Product ID is required")], isAuth_1.isAuth, admin_controller_1.deleteProductController);
exports.default = adminRouter;
