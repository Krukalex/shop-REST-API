"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductController = exports.updateProductController = exports.createProductController = exports.getProductsController = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getProductsController = (req, res, next) => {
    try {
        const userId = req.userId;
        const products = Product_1.default.getUserProducts(userId);
        const productNames = products.map((product) => {
            return { id: product.product_id, title: product.title };
        });
        res
            .status(200)
            .json({
            message: `Pulled all items for user ${userId}`,
            products: productNames,
        });
    }
    catch (err) {
        if (!err.status) {
            err.status = 500;
        }
        next(err);
    }
};
exports.getProductsController = getProductsController;
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
    const userId = req.userId;
    try {
        const product = Product_1.default.getById(prodId);
        if (!product) {
            const error = new Error(`Product ${prodId} could not be found`);
            error.status = 404;
            throw error;
        }
        if (userId != product.user_id) {
            const error = new Error(`Only the creator of a product is authorized to modify or delete it`);
            error.status = 401;
            throw error;
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
    const userId = req.userId;
    try {
        const product = Product_1.default.getById(prodId);
        if (!product) {
            const error = new Error(`Product ${prodId} not found`);
            error.status = 404;
            throw error;
        }
        if (userId != product.user_id) {
            const error = new Error(`Only the creator of a product is authorized to modify or delete it`);
            error.status = 401;
            throw error;
        }
        const deleted = Product_1.default.deleteById(prodId);
        res.status(200).json({
            message: `Successfully deleted product ${prodId}`,
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
