"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const db_1 = require("../data/db");
class User {
    constructor(name, email, password, user_id, created_at, updated_at) {
        this.user_id = user_id || (0, crypto_1.randomUUID)();
        this.name = name;
        this.email = email;
        this.password = password;
        this.created_at = created_at || new Date();
        this.updated_at = updated_at || new Date();
    }
    save() {
        const findStatement = db_1.db.prepare("SELECT * FROM Users WHERE email = ?");
        const existingUser = findStatement.get(this.email);
        if (existingUser) {
            const stmtUpdate = db_1.db.prepare(`
        UPDATE Users SET name = ?, password = ?, updated_at = ? WHERE email = ?
      `);
            stmtUpdate.run(this.name, this.password, new Date().toISOString(), this.email);
        }
        else {
            const stmtInsert = db_1.db.prepare(`
        INSERT INTO Users (user_id, name, email, password, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
            stmtInsert.run(this.user_id, this.name, this.email, this.password, this.created_at.toISOString(), this.updated_at.toISOString());
        }
        return this.user_id;
    }
    static getByEmail(email) {
        const findStatement = db_1.db.prepare("SELECT * FROM Users WHERE email = ?");
        const existingUser = findStatement.get(email);
        if (existingUser) {
            const { user_id, name, email, password, created_at, updated_at } = existingUser;
            const user = new User(name, email, password, user_id, created_at, updated_at);
            return user;
        }
        return undefined;
    }
    static fetchAll() { }
    static deleteById(id) { }
}
exports.default = User;
