"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductController = exports.updateProductController = exports.createProductController = exports.getProductsController = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const not_found_error_1 = require("../errors/not-found-error");
const unauthorized_error_1 = require("../errors/unauthorized-error");
const request_validation_error_1 = require("../errors/request-validation-error");
const express_validator_1 = require("express-validator");
const getProductsController = (req, res, next) => {
    try {
        const userId = req.userId;
        const products = Product_1.default.getUserProducts(userId);
        const productNames = products.map((product) => {
            return { id: product.product_id, title: product.title };
        });
        res.status(200).json({
            message: `Pulled all items for user ${userId}`,
            products: productNames,
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.getProductsController = getProductsController;
const createProductController = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    const body = req.body;
    const { title, description, price } = body;
    const userId = req.userId;
    try {
        const newProduct = new Product_1.default(title, description, price, userId);
        newProduct.save();
        res.status(201).json({
            message: "successfully created new product",
            products: {
                product_id: newProduct.product_id,
                title: newProduct.title,
                description: newProduct.description,
                price: newProduct.price,
                creator: newProduct.user_id,
            },
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.createProductController = createProductController;
const updateProductController = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    const param = req.params;
    const body = req.body;
    const prodId = param.prodId;
    const userId = req.userId;
    try {
        const product = Product_1.default.getById(prodId);
        if (!product) {
            throw new not_found_error_1.NotFoundError();
        }
        if (userId != product.user_id) {
            throw new unauthorized_error_1.UnauthorizedError();
        }
        if (body.title) {
            product.title = body.title;
        }
        if (body.description) {
            product.description = body.description;
        }
        if (body.price) {
            product.price = body.price;
        }
        product.save();
        res.status(200).json({
            message: `Successfully updated product ${prodId}`,
            product: product,
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.updateProductController = updateProductController;
const deleteProductController = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    const param = req.params;
    const prodId = param.prodId;
    const userId = req.userId;
    try {
        const product = Product_1.default.getById(prodId);
        if (!product) {
            throw new not_found_error_1.NotFoundError();
        }
        if (userId != product.user_id) {
            throw new unauthorized_error_1.UnauthorizedError();
        }
        const deleted = Product_1.default.deleteById(prodId);
        res.status(200).json({
            message: `Successfully deleted product ${prodId}`,
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.deleteProductController = deleteProductController;
