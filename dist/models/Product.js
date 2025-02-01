"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class Product {
    constructor(title, description, price) {
        this.id = (0, crypto_1.randomUUID)();
        this.title = title;
        this.description = description;
        this.price = price;
    }
}
exports.default = Product;
