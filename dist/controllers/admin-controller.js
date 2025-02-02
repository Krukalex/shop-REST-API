"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductController = exports.updateProductController = exports.createProductController = exports.getProductController = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const dummyData_1 = require("../data/dummyData");
const getProductController = (req, res, next) => {
    const param = req.params;
    if (!param.prodId) {
        const error = new Error("Bad Request: Request params is required");
        error.status = 400;
        throw error;
    }
    const prodId = param.prodId;
    try {
        const product = dummyData_1.products.find((prod) => prod.id === prodId);
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
const createProductController = (req, res, next) => {
    const body = req.body;
    if (!body.title || !body.description || body.price == null) {
        const error = new Error("Missing required product fields");
        error.status = 400;
        throw error;
    }
    const { title, description, price } = body;
    const userId = req.userId;
    try {
        const newProduct = new Product_1.default(title, description, price, userId);
        dummyData_1.products.push(newProduct);
        res.status(201).json({
            message: "successfully created new product",
            products: dummyData_1.products,
        });
    }
    catch (err) {
        if (!err.status) {
            err.status = 500;
        }
        next(err);
    }
};
exports.createProductController = createProductController;
const updateProductController = (req, res, next) => {
    const param = req.params;
    const body = req.body;
    if (!body) {
        const error = new Error("Bad Request: Request body is required");
        error.status = 400;
        throw error;
    }
    if (!param.prodId) {
        const error = new Error("Bad Request: Request params is required");
        error.status = 400;
        throw error;
    }
    const prodId = param.prodId;
    try {
        const prodIndex = dummyData_1.products.findIndex((prod) => prod.id === prodId);
        const product = dummyData_1.products[prodIndex];
        if (body.title) {
            product.title = body.title;
        }
        if (body.description) {
            product.description = body.description;
        }
        if (body.price) {
            product.price = body.price;
        }
        dummyData_1.products[prodIndex] = product;
        res.status(200).json({
            message: `Successfully updated product ${prodId}`,
            product: product,
        });
    }
    catch (err) {
        if (!err.status) {
            err.status = 500;
        }
        next(err);
    }
};
exports.updateProductController = updateProductController;
const deleteProductController = (req, res, next) => {
    const param = req.params;
    if (!param.prodId) {
        const error = new Error("Missing required fields in request");
        error.status = 400;
        throw error;
    }
    const prodId = param.prodId;
    try {
        const index = dummyData_1.products.findIndex((prod) => prod.id === prodId);
        if (index !== -1) {
            dummyData_1.products.splice(index, 1);
        }
        res.status(200).json({
            message: `Successfully deleted product ${prodId}`,
            products: dummyData_1.products,
        });
    }
    catch (err) {
        if (!err.status) {
            err.status = 500;
        }
        next(err);
    }
};
exports.deleteProductController = deleteProductController;
