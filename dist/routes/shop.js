"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shop_controller_1 = require("../controllers/shop-controller");
const shopRouter = (0, express_1.Router)();
shopRouter.get("/", shop_controller_1.getProductsController);
shopRouter.get("/products/:prodId", shop_controller_1.getProductController);
exports.default = shopRouter;
