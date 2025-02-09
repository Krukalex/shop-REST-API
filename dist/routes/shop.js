"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shop_controller_1 = require("../controllers/shop-controller");
const is_auth_1 = require("../middleware/is-auth");
const express_validator_1 = require("express-validator");
const shopRouter = (0, express_1.Router)();
shopRouter.get("/", is_auth_1.isAuth, shop_controller_1.getProductsController);
shopRouter.get("/products/:prodId", [(0, express_validator_1.param)("prodId").trim().notEmpty().withMessage("Product ID is required")], is_auth_1.isAuth, shop_controller_1.getProductController);
shopRouter.get("/get-cart", is_auth_1.isAuth, shop_controller_1.getCartController);
shopRouter.get("/get-orders", is_auth_1.isAuth, shop_controller_1.getOrdersController);
shopRouter.post("/add-to-cart", [
    (0, express_validator_1.body)("prodId").notEmpty().withMessage("Product ID is required"),
    (0, express_validator_1.body)("quantity").notEmpty().isNumeric().withMessage("quantity is required"),
], is_auth_1.isAuth, shop_controller_1.addToCartController);
shopRouter.post("/create-order", is_auth_1.isAuth, shop_controller_1.createOrderController);
shopRouter.delete("/remove-from-cart", [
    (0, express_validator_1.body)("prodId").notEmpty().withMessage("Product ID is required"),
    (0, express_validator_1.body)("quantity").notEmpty().isNumeric().withMessage("quantity is required"),
], is_auth_1.isAuth, shop_controller_1.removeFromCartController);
exports.default = shopRouter;
