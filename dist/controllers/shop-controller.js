"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderController = exports.removeFromCartController = exports.addToCartController = exports.getOrdersController = exports.getCartController = exports.getProductsController = exports.getProductController = void 0;
const express_validator_1 = require("express-validator");
const Product_1 = __importDefault(require("../models/Product"));
const request_validation_error_1 = require("../errors/request-validation-error");
const not_found_error_1 = require("../errors/not-found-error");
const User_1 = __importDefault(require("../models/User"));
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
const getCartController = (req, res, next) => {
    const userId = req.userId;
    try {
        const user = User_1.default.getById(userId);
        if (!user) {
            throw new not_found_error_1.NotFoundError();
        }
        const cart = user.getCart();
        res.status(200).json({ message: "Retrieved cart items", cart: cart });
    }
    catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.getCartController = getCartController;
const getOrdersController = (req, res, next) => {
    const userId = req.userId;
    try {
        const user = User_1.default.getById(userId);
        if (!user) {
            throw new not_found_error_1.NotFoundError();
        }
        const orders = user === null || user === void 0 ? void 0 : user.getOrder();
        res.status(200).json({ messge: "Retrieved orders", orders: orders });
    }
    catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.getOrdersController = getOrdersController;
const addToCartController = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    const body = req.body;
    const { prodId, quantity } = body;
    const userId = req.userId;
    try {
        const user = User_1.default.getById(userId);
        if (!user) {
            throw new not_found_error_1.NotFoundError();
        }
        const product = Product_1.default.getById(prodId);
        if (!product) {
            throw new not_found_error_1.NotFoundError();
        }
        user.addToCart(product, quantity);
        res.status(200).json({
            message: "Added product to cart",
            product: {
                id: product.product_id,
                name: product.title,
                desription: product.description,
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
exports.addToCartController = addToCartController;
const removeFromCartController = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    const { prodId, quantity } = req.body;
    const userId = req.userId;
    try {
        const user = User_1.default.getById(userId);
        if (!user) {
            throw new not_found_error_1.NotFoundError();
        }
        user.removeFromCart(prodId, quantity);
        const updatedCart = user.getCart();
        res.status(200).json({
            message: "Successfully remove items from cart",
            cart: updatedCart,
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.removeFromCartController = removeFromCartController;
const createOrderController = (req, res, next) => {
    const userId = req.userId;
    try {
        const user = User_1.default.getById(userId);
        if (!user) {
            throw new not_found_error_1.NotFoundError();
        }
        user.createOrder();
        const order = user.getOrder();
        res
            .status(200)
            .json({ message: "Order created successfully", order: order });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.createOrderController = createOrderController;
