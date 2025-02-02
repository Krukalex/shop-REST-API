"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const db_1 = require("../data/db");
class User {
    constructor(name, email, password, id, created_at, updated_at) {
        this.id = id || (0, crypto_1.randomUUID)();
        this.name = name;
        this.email = email;
        this.password = password;
        this.created_at = created_at || new Date();
        this.updated_at = updated_at || new Date();
    }
    save() {
        const findStatement = db_1.db.prepare("select * from Users where email = ?");
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
            stmtInsert.run(this.id, this.name, this.email, this.password, this.created_at.toISOString(), this.updated_at.toISOString());
        }
        return this.id;
    }
    static getById(id) { }
    static fetchAll() { }
    static deleteById(id) { }
}
exports.default = User;
// interface User {
//   user_id: number;
//   name: string;
//   email: string;
//   password: string;
//   created_at: Date;
// }
// class UserModel {
//   private db: Database.Database;
//   constructor(database: Database.Database) {
//     this.db = database;
//   }
// }
