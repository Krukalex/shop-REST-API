"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shop_controller_1 = require("../controllers/shop-controller");
const isAuth_1 = require("../middleware/isAuth");
const express_validator_1 = require("express-validator");
const shopRouter = (0, express_1.Router)();
shopRouter.get("/", isAuth_1.isAuth, shop_controller_1.getProductsController);
shopRouter.get("/products/:prodId", [(0, express_validator_1.param)("prodId").trim().notEmpty().withMessage("Product ID is required")], isAuth_1.isAuth, shop_controller_1.getProductController);
shopRouter.get("/get-cart", isAuth_1.isAuth, shop_controller_1.getCartController);
shopRouter.post("/add-to-cart", [
    (0, express_validator_1.body)("prodId").notEmpty().withMessage("Product ID is required"),
    (0, express_validator_1.body)("quantity").notEmpty().isNumeric().withMessage("quantity is required"),
], isAuth_1.isAuth, shop_controller_1.addToCartController);
shopRouter.delete("/remove-from-cart", [
    (0, express_validator_1.body)("prodId").notEmpty().withMessage("Product ID is required"),
    (0, express_validator_1.body)("quantity").notEmpty().isNumeric().withMessage("quantity is required"),
], isAuth_1.isAuth, shop_controller_1.removeFromCartController);
exports.default = shopRouter;
