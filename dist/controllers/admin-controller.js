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
        res.status(400).json({ message: "Bad Reqeust: Request param is required" });
        return;
    }
    const prodId = param.prodId;
    const product = dummyData_1.products.find((prod) => prod.id === prodId);
    res
        .status(200)
        .json({ message: `Retrieved product ${prodId}`, product: product });
};
exports.getProductController = getProductController;
const createProductController = (req, res, next) => {
    const body = req.body;
    if (!body.title || !body.description || body.price == null) {
        res.status(400).json({ message: "Missing required product fields" });
        return;
    }
    const { title, description, price } = body;
    const newProduct = new Product_1.default(title, description, price);
    dummyData_1.products.push(newProduct);
    res
        .status(201)
        .json({ message: "successfully created new product", products: dummyData_1.products });
};
exports.createProductController = createProductController;
const updateProductController = (req, res, next) => {
    const param = req.params;
    const body = req.body;
    if (!body) {
        res.status(400).json({ message: "Bad Reqeust: Request body is required" });
        return;
    }
    if (!param.prodId) {
        res.status(400).json({ message: "Bad Reqeust: Request param is required" });
        return;
    }
    const prodId = param.prodId;
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
};
exports.updateProductController = updateProductController;
const deleteProductController = (req, res, next) => {
    const param = req.params;
    if (!param.prodId) {
        res.status(400).json({ message: "Bad Reqeust: Request param is required" });
        return;
    }
    const prodId = param.prodId;
    const index = dummyData_1.products.findIndex((prod) => prod.id === prodId);
    if (index !== -1) {
        dummyData_1.products.splice(index, 1);
    }
    res.status(200).json({
        message: `Successfully deleted product ${prodId}`,
        products: dummyData_1.products,
    });
};
exports.deleteProductController = deleteProductController;
