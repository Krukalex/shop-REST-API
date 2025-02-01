"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shop_controller_1 = require("../controllers/shop-controller");
const shopRouter = (0, express_1.Router)();
shopRouter.get("/products/:prodId", shop_controller_1.getProductController);
shopRouter.get("/", shop_controller_1.getProductsController);
exports.default = shopRouter;
