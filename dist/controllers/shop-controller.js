"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsController = void 0;
const getProductsController = (req, res, next) => {
    res.status(200).json({ message: "Pulled all items" });
};
exports.getProductsController = getProductsController;
