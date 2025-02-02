import Database from "better-sqlite3";

export const db = new Database("shop.db", { verbose: console.log });

export const create_db = () => {
  db.exec(`
        CREATE TABLE IF NOT EXISTS Users (
            user_id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL
        )
        `);
};
