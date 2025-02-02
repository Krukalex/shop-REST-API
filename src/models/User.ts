import { randomUUID } from "crypto";
import { db } from "../data/db";

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

  public static fetchAll() {}

  public static deleteById(id: string) {}
}
