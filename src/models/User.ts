import { randomUUID } from "crypto";
import { db } from "../data/db";
import Product from "./Product";

export default class User {
  user_id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;

  constructor(
    name: string,
    email: string,
    password: string,
    user_id?: string,
    created_at?: Date,
    updated_at?: Date
  ) {
    this.user_id = user_id || randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
    this.created_at = created_at || new Date();
    this.updated_at = updated_at || new Date();
  }

  public save() {
    const findStatement = db.prepare("SELECT * FROM Users WHERE email = ?");
    const existingUser = findStatement.get(this.email);

    if (existingUser) {
      const stmtUpdate = db.prepare(`
        UPDATE Users SET name = ?, password = ?, updated_at = ? WHERE email = ?
      `);
      stmtUpdate.run(
        this.name,
        this.password,
        new Date().toISOString(),
        this.email
      );
    } else {
      const stmtInsert = db.prepare(`
        INSERT INTO Users (user_id, name, email, password, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      stmtInsert.run(
        this.user_id,
        this.name,
        this.email,
        this.password,
        this.created_at.toISOString(),
        this.updated_at.toISOString()
      );
    }
    return this.user_id;
  }

  public getCart() {
    const findStatement = db.prepare(`
        SELECT
          *
        FROM 
          CartItems ci
          LEFT OUTER JOIN Cart c on ci.cart_id = c.cart_id
        WHERE
          c.user_id = ?
      `);
    const cartItems = findStatement.all(this.user_id);
    return cartItems;
  }

  public addToCart(product: Product, quantity: number) {
    const findStatement = db.prepare(
      "SELECT cart_id FROM Cart WHERE user_id = ?"
    );
    const existingCart = findStatement.get(this.user_id) as { cart_id: string };
    let cartId: string;

    if (!existingCart) {
      const createCartStmt = db.prepare(`
        INSERT INTO Cart(user_id, created_at, updated_at)
        VALUES (?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `);
      createCartStmt.run(this.user_id);

      const cartIdStmt = db.prepare(
        "SELECT cart_id FROM Cart WHERE user_id = ?"
      );
      const newCart = cartIdStmt.get(this.user_id) as { cart_id: string };
      cartId = newCart.cart_id;
    } else {
      cartId = existingCart.cart_id;
    }

    const findProdStmt = db.prepare(
      "SELECT cart_item_id FROM CartItems WHERE cart_id = ? and product_id = ?"
    );
    const existingProduct = findProdStmt.get(cartId, product.product_id) as {
      cart_item_id: number;
    };
    if (existingProduct) {
      const updateCartStmt = db.prepare(`
        UPDATE CartItems
        SET quantity = quantity + ?, updated_at = CURRENT_TIMESTAMP
        WHERE cart_item_id = ?
        `);
      updateCartStmt.run(quantity, existingProduct.cart_item_id);
    } else {
      const addToCartStmt = db.prepare(`
      INSERT INTO CartItems(cart_id, product_id, quantity, price, created_at, updated_at)
      VALUES(?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `);
      addToCartStmt.run(cartId, product.product_id, quantity, product.price);
    }
    return true;
  }

  public removeFromCart(productId: string, quantity: number) {
    const findStatement = db.prepare(
      "SELECT cart_id FROM Cart WHERE user_id = ?"
    );
    const existingCart = findStatement.get(this.user_id) as { cart_id: string };
    if (!existingCart) {
      return false;
    }

    const { cart_id } = existingCart;
    const findProdStmt = db.prepare(
      "SELECT cart_item_id, quantity FROM CartItems WHERE cart_id = ? and product_id = ?"
    );
    const existingProduct = findProdStmt.get(cart_id, productId) as {
      cart_item_id: number;
      quantity: number;
    };

    if (!existingProduct) {
      return false;
    }

    const newQuantity = existingProduct.quantity - quantity;
    if (newQuantity > 0) {
      const updateCartStmt = db.prepare(`
        UPDATE CartItems
        SET quantity = ?, updated_at = CURRENT_TIMESTAMP
        WHERE cart_item_id = ?
        `);
      updateCartStmt.run(newQuantity, existingProduct.cart_item_id);
    } else {
      const deleteItemStmt = db.prepare(`
        DELETE FROM CartItems
        WHERE cart_item_id = ?
        `);
      deleteItemStmt.run(existingProduct.cart_item_id);
    }

    return true;
  }

  public static getByEmail(email: string) {
    const findStatement = db.prepare("SELECT * FROM Users WHERE email = ?");
    const existingUser = findStatement.get(email) as User | undefined;
    if (existingUser) {
      const { user_id, name, email, password, created_at, updated_at } =
        existingUser;
      const user = new User(
        name,
        email,
        password,
        user_id,
        created_at,
        updated_at
      );
      return user;
    }
    return undefined;
  }

  public static getById(id: string) {
    const findStatement = db.prepare("SELECT * FROM Users WHERE user_id = ?");
    const existingUser = findStatement.get(id) as User | undefined;
    if (existingUser) {
      const { user_id, name, email, password, created_at, updated_at } =
        existingUser;
      const user = new User(
        name,
        email,
        password,
        user_id,
        created_at,
        updated_at
      );
      return user;
    }
    return undefined;
  }

  public static fetchAll() {}

  public static deleteById(id: string) {}
}
