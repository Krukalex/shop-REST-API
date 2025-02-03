# TypeScript REST API for Shop Application

This application is a **TypeScript REST API** designed to service a **shop application**. It allows users to:

- **Sign up**
- **Login**
- **Create, view, update, and delete products**

The application uses **JSON Web Tokens (JWT)** for authorization, ensuring that routes are **protected**. The data is stored in a **SQLite3** database.

## Project Structure

The project follows the **Model-View-Controller (MVC)** design pattern. It is divided into three main sections:

1. **Auth Routes**:

   - Manage user sign-up and login.
   - Secure routes with **JSON Web Tokens** (JWT).

2. **Admin Routes**:

   - Allows users to view their own products.
   - Create new products.
   - Update or delete existing products.

3. **Shop Routes**:
   - Allows users to view products from all users.

## Features

- **User Authentication**: JWT-based authentication for secure route access.
- **CRUD Operations**: Allows managing products via Create, Read, Update, and Delete actions.
- **SQLite3 Database**: Stores all user and product data persistently.

## Installation

To set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Krukalex/shop-REST-API
   ```

2. **Install dependencies**:

   ```bash
   cd your-project-name
    npm install
   ```

3. **Start Application**:

   ```bash
   npm start
   ```
