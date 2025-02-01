"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsController = void 0;
const dummyData_1 = require("../data/dummyData");
const getProductsController = (req, res, next) => {
    res.status(200).json({ message: "Pulled all items", products: dummyData_1.products });
};
exports.getProductsController = getProductsController;
