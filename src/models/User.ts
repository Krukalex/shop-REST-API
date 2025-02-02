import { randomUUID } from "crypto";
import { db } from "../data/db";

export default class User {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;

  constructor(
    name: string,
    email: string,
    password: string,
    id?: string,
    created_at?: Date,
    updated_at?: Date
  ) {
    this.id = id || randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
    this.created_at = created_at || new Date();
    this.updated_at = updated_at || new Date();
  }

  public save() {
    const findStatement = db.prepare("select * from Users where email = ?");
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
        this.id,
        this.name,
        this.email,
        this.password,
        this.created_at.toISOString(),
        this.updated_at.toISOString()
      );
    }
    return this.id;
  }

  public static getById(id: string) {}

  public static fetchAll() {}

  public static deleteById(id: string) {}
}

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
