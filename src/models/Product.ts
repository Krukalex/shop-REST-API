import { randomUUID } from "crypto";
import { db } from "../data/db";

export default class Product {
  product_id: string;
  title: string;
  description: string;
  price: number;
  user_id: string;
  created_at: Date;
  updated_at: Date;

  constructor(
    title: string,
    description: string,
    price: number,
    user_id: string,
    product_id?: string,
    created_at?: Date,
    updated_at?: Date
  ) {
    this.product_id = product_id || randomUUID();
    this.title = title;
    this.description = description;
    this.price = price;
    this.user_id = user_id;
    this.created_at = created_at || new Date();
    this.updated_at = updated_at || new Date();
  }

  public save() {
    const findStatement = db.prepare(
      "SELECT * FROM Products WHERE product_id = ?"
    );
    const existingProduct = findStatement.get(this.product_id);
    if (existingProduct) {
      const stmtUpdate = db.prepare(`
        UPDATE Products SET title = ?, description = ?, price = ?, updated_at = ? WHERE product_id = ?
      `);
      stmtUpdate.run(
        this.title,
        this.description,
        this.price,
        new Date().toISOString(),
        this.product_id
      );
    } else {
      const stmtInsert = db.prepare(`
          INSERT INTO Products (product_id, title, description, price, user_id, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ? , ?)
        `);
      stmtInsert.run(
        this.product_id,
        this.title,
        this.description,
        this.price,
        this.user_id,
        this.created_at.toISOString(),
        this.updated_at.toISOString()
      );
    }
    return this.product_id;
  }

  public static getById(product_id: string) {
    const findStatement = db.prepare(`
        SELECT * FROM Products WHERE product_id = ?
      `);
    const existingProduct = findStatement.get(product_id) as
      | Product
      | undefined;
    if (existingProduct) {
      const {
        product_id,
        title,
        description,
        price,
        user_id,
        created_at,
        updated_at,
      } = existingProduct;
      const product = new Product(
        title,
        description,
        price,
        user_id,
        product_id,
        created_at,
        updated_at
      );
      return product;
    }
    return undefined;
  }

  public static fetchAll() {
    const findStatement = db.prepare(`
        SELECT * FROM Products
      `);
    const products = findStatement.all();
    return products.map(
      (productData: any) =>
        new Product(
          productData.title,
          productData.description,
          productData.price,
          productData.user_id,
          productData.product_id,
          productData.created_at,
          productData.updated_at
        )
    );
  }

  public static deleteById(product_id: string) {
    const deleteStatement = db.prepare(`
        DELETE FROM Products WHERE product_id = ?
      `);
    const result = deleteStatement.run(product_id);
    return result.changes > 0;
  }
}
