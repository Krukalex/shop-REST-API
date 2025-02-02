"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsController = exports.getProductController = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getProductController = (req, res, next) => {
    const param = req.params;
    if (!param.prodId) {
        res.status(400).json({ message: "Bad Reqeust: Request param is required" });
        return;
    }
    const prodId = param.prodId;
    try {
        const product = Product_1.default.getById(prodId);
        if (!product) {
            const error = new Error("The requested product could not be found");
            error.status = 404;
            throw error;
        }
        res
            .status(200)
            .json({ message: `Retrieved product ${prodId}`, product: product });
    }
    catch (err) {
        if (!err.status) {
            err.status = 500;
        }
        next(err);
    }
};
exports.getProductController = getProductController;
const getProductsController = (req, res, next) => {
    try {
        const products = Product_1.default.fetchAll();
        const productNames = products.map((product) => {
            return { id: product.product_id, title: product.title };
        });
        res
            .status(200)
            .json({ message: "Pulled all items", products: productNames });
    }
    catch (err) {
        if (!err.status) {
            err.status = 500;
        }
        next(err);
    }
};
exports.getProductsController = getProductsController;
