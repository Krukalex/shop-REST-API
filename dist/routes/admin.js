"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin-controller");
const adminRouter = (0, express_1.Router)();
adminRouter.post("/products", admin_controller_1.createProductController);
exports.default = adminRouter;
