"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsController = exports.getProductController = void 0;
const dummyData_1 = require("../data/dummyData");
const getProductController = (req, res, next) => {
    const param = req.params;
    if (!param.prodId) {
        res.status(400).json({ message: "Bad Reqeust: Request param is required" });
        return;
    }
    const prodId = param.prodId;
    const product = dummyData_1.products.find((prod) => prod.id === prodId);
    if (!product) {
        const error = new Error("The requested product could not be found");
        error.status = 404;
        throw error;
    }
    res
        .status(200)
        .json({ message: `Retrieved product ${prodId}`, product: product });
};
exports.getProductController = getProductController;
const getProductsController = (req, res, next) => {
    const productNames = dummyData_1.products.map((product) => {
        return { id: product.id, title: product.title };
    });
    res.status(200).json({ message: "Pulled all items", products: productNames });
};
exports.getProductsController = getProductsController;
