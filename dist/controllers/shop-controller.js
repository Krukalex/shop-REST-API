"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsController = exports.getProductController = void 0;
const express_validator_1 = require("express-validator");
const Product_1 = __importDefault(require("../models/Product"));
const request_validation_error_1 = require("../errors/request-validation-error");
const not_found_error_1 = require("../errors/not-found-error");
const getProductController = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    const param = req.params;
    const prodId = param.prodId;
    try {
        const product = Product_1.default.getById(prodId);
        if (!product) {
            throw new not_found_error_1.NotFoundError();
        }
        res
            .status(200)
            .json({ message: `Retrieved product ${prodId}`, product: product });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
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
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.getProductsController = getProductsController;
