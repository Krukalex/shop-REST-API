"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductController = exports.createProductController = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const dummyData_1 = require("../data/dummyData");
const createProductController = (req, res, next) => {
    const body = req.body;
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
