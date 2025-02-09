# **TypeScript REST API for Shop Application**

This application is a **TypeScript REST API** designed to service a **shop application**. It allows users to:

- **Sign up**
- **Login**
- **Create, view, update, and delete products**
- **Manage a shopping cart and place orders**

The application uses **JSON Web Tokens (JWT)** for authentication and **Express-Validator** for input validation, ensuring that routes are **secure and data is validated**. All data is stored in a **SQLite3** database.

---

## **Project Structure**

The project follows the **Model-View-Controller (MVC)** design pattern. It is divided into three main sections:

### **1. Auth Routes**

- Manage **user sign-up and login**.
- Secure routes with **JSON Web Tokens (JWT)**.
- Validate user input with **Express-Validator**.

### **2. Admin Routes**

- Allows users to **view their own products**.
- **Create new products**.
- **Update or delete** existing products.

### **3. Shop Routes**

- Allows users to **view all products** from all users.
- Users can **add/remove items from their cart**.
- Users can **place orders from their cart**.

---

## **Features**

✅ **User Authentication**: JWT-based authentication for secure route access.\
✅ **Input Validation**: Uses **Express-Validator** to validate user input.\
✅ **CRUD Operations**: Allows managing products via **Create, Read, Update, and Delete** actions.\
✅ **Shopping Cart System**: Users can **add, remove, and update items in their cart**.\
✅ **Order Management**: Users can **place orders** based on their cart contents.\
✅ **SQLite3 Database**: Stores all **user, product, cart, and order data** persistently.

---

## **Getting Started with the API**

To start using the API, the first step is to **sign up for an account**. You can do this by making a `POST` request to the `/auth/signup` route with the following details:

```json
{
  "name": "Your Name",
  "email": "your-email@example.com",
  "password": "your-secure-password"
}
```

After signing up, you must **log in** using the `/auth/login` route with the email and password you provided. This will return an authentication token, which will be required to access protected routes.

---

## **API Documentation**

All API routes are documented in the `/docs` folder of this project, and there is also an attached **Postman collection** provided. To explore the API using Postman:

1. Open **Postman**.
2. Click **Import** and select `docs/postman_collection.json`.
3. After logging in, **copy the token** from the login response.
4. Go to the **Authorization tab** in Postman and set the type to **Bearer Token**.
5. Paste the token into the Authorization header for **each authenticated request**.

⚠ **Note:** If the token is missing, requests to protected routes will return an **authentication error**.

---

## **Running with Docker** 🐳

This project can also be run using **Docker**.

### **1. Build the Docker Image**

```bash
docker build -t shop-rest-api .
```

### **2. Run the Container**

```bash
docker run -p 3000:3000 --name shop-api shop-rest-api
```

- The API will be available at [**http://localhost:3000**](http://localhost:3000).
- The database (`shop.db`) is mounted to persist data **outside the container**.

---

## **Installation (Local Setup)**

To set up the project locally:

### **1. Clone the repository**

```bash
git clone https://github.com/Krukalex/shop-REST-API
```

### **2. Install dependencies**

```bash
cd shop-REST-API
npm install
```

### **3. Start the Application**

```bash
npm start
```
