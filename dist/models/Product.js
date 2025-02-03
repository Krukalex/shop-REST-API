"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const db_1 = require("../data/db");
class Product {
    constructor(title, description, price, user_id, product_id, created_at, updated_at) {
        this.product_id = product_id || (0, crypto_1.randomUUID)();
        this.title = title;
        this.description = description;
        this.price = price;
        this.user_id = user_id;
        this.created_at = created_at || new Date();
        this.updated_at = updated_at || new Date();
    }
    save() {
        const findStatement = db_1.db.prepare("SELECT * FROM Products WHERE product_id = ?");
        const existingProduct = findStatement.get(this.product_id);
        if (existingProduct) {
            const stmtUpdate = db_1.db.prepare(`
        UPDATE Products SET title = ?, description = ?, price = ?, updated_at = ? WHERE product_id = ?
      `);
            stmtUpdate.run(this.title, this.description, this.price, new Date().toISOString(), this.product_id);
        }
        else {
            const stmtInsert = db_1.db.prepare(`
          INSERT INTO Products (product_id, title, description, price, user_id, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ? , ?)
        `);
            stmtInsert.run(this.product_id, this.title, this.description, this.price, this.user_id, this.created_at.toISOString(), this.updated_at.toISOString());
        }
        return this.product_id;
    }
    static getById(product_id) {
        const findStatement = db_1.db.prepare(`
        SELECT * FROM Products WHERE product_id = ?
      `);
        const existingProduct = findStatement.get(product_id);
        if (existingProduct) {
            const { product_id, title, description, price, user_id, created_at, updated_at, } = existingProduct;
            const product = new Product(title, description, price, user_id, product_id, created_at, updated_at);
            return product;
        }
        return undefined;
    }
    static getUserProducts(user_id) {
        const findStatement = db_1.db.prepare(`
        SELECT * FROM Products WHERE user_id = ?
      `);
        const userProducts = findStatement.all(user_id);
        return userProducts.map((productData) => new Product(productData.title, productData.description, productData.price, productData.user_id, productData.product_id, productData.created_at, productData.updated_at));
    }
    static fetchAll() {
        const findStatement = db_1.db.prepare(`
        SELECT * FROM Products
      `);
        const products = findStatement.all();
        return products.map((productData) => new Product(productData.title, productData.description, productData.price, productData.user_id, productData.product_id, productData.created_at, productData.updated_at));
    }
    static deleteById(product_id) {
        const deleteStatement = db_1.db.prepare(`
        DELETE FROM Products WHERE product_id = ?
      `);
        const result = deleteStatement.run(product_id);
        return result.changes > 0;
    }
}
exports.default = Product;
