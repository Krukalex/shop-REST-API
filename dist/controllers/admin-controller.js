"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductController = void 0;
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
