# Shop API Documentation

This API provides endpoints for managing a user's shopping cart, orders, and products. It includes functionality for viewing products, adding/removing items from the cart, creating orders, and fetching cart and order details.

## Routes

### 1. Get All Products

**GET** `/`

Fetches the list of all products in the shop.

#### Response

- **Success (200)**: Returns an array of products.

  - **Response Body**:
    ```json
    [
      {
        "id": "product-id",
        "name": "Product Name",
        "price": 20,
        "description": "Product description"
      }
    ]
    ```

- **Error (401)**: Unauthorized access (requires authentication).
  - **Response Body**:
    ```json
    {
      "message": "Authentication required"
    }
    ```

#### Example Request

```bash
GET /
Authorization: Bearer <your-jwt-token>
```

---

### 2. Get Single Product

**GET** `/products/:prodId`

Fetches details of a specific product using its `prodId`.

#### Request Parameters

- **prodId**: The unique ID of the product.

#### Validation Rules

- **prodId**: Must not be empty.

#### Response

- **Success (200)**: Returns the product details.

  - **Response Body**:
    ```json
    {
      "id": "product-id",
      "name": "Product Name",
      "price": 20,
      "description": "Product description"
    }
    ```

- **Error (400)**: Invalid product ID or missing product.
  - **Response Body**:
    ```json
    {
      "errors": [{ "msg": "Product ID is required", "param": "prodId" }]
    }
    ```

#### Example Request

```bash
GET /products/1
Authorization: Bearer <your-jwt-token>
```

---

### 3. Get Cart

**GET** `/get-cart`

Fetches the current shopping cart for the authenticated user.

#### Response

- **Success (200)**: Returns the cart details.

  - **Response Body**:
    ```json
    {
      "cart": [
        {
          "prodId": "product-id",
          "quantity": 2
        }
      ]
    }
    ```

- **Error (401)**: Unauthorized access (requires authentication).
  - **Response Body**:
    ```json
    {
      "message": "Authentication required"
    }
    ```

#### Example Request

```bash
GET /get-cart
Authorization: Bearer <your-jwt-token>
```

---

### 4. Get Orders

**GET** `/get-orders`

Fetches a list of all orders placed by the authenticated user.

#### Response

- **Success (200)**: Returns the list of orders.

  - **Response Body**:
    ```json
    [
      {
        "orderId": "order-id",
        "products": [
          {
            "prodId": "product-id",
            "quantity": 1
          }
        ]
      }
    ]
    ```

- **Error (401)**: Unauthorized access (requires authentication).
  - **Response Body**:
    ```json
    {
      "message": "Authentication required"
    }
    ```

#### Example Request

```bash
GET /get-orders
Authorization: Bearer <your-jwt-token>
```

---

### 5. Add to Cart

**POST** `/add-to-cart`

Adds a product to the user's cart.

#### Request Body

```json
{
  "prodId": "string", // Product ID (required)
  "quantity": "number" // Quantity to add (required)
}
```

#### Validation Rules

- **prodId**: Must not be empty.
- **quantity**: Must be a number (required).

#### Response

- **Success (200)**: Product added to the cart.

  - **Response Body**:
    ```json
    {
      "message": "Product added to cart"
    }
    ```

- **Error (400)**: Invalid data (e.g., missing product ID or invalid quantity).
  - **Response Body**:
    ```json
    {
      "errors": [{ "msg": "Product ID is required", "param": "prodId" }]
    }
    ```

#### Example Request

```bash
POST /add-to-cart
Content-Type: application/json
Authorization: Bearer <your-jwt-token>

{
  "prodId": "1",
  "quantity": 2
}
```

---

### 6. Create Order

**POST** `/create-order`

Creates an order from the products in the user's cart.

#### Response

- **Success (200)**: Order created successfully.

  - **Response Body**:
    ```json
    {
      "message": "Order created successfully"
    }
    ```

- **Error (400)**: Failed to create order (e.g., empty cart).
  - **Response Body**:
    ```json
    {
      "message": "Cart is empty"
    }
    ```

#### Example Request

```bash
POST /create-order
Authorization: Bearer <your-jwt-token>
```

---

### 7. Remove from Cart

**DELETE** `/remove-from-cart`

Removes a product from the user's cart.

#### Request Body

```json
{
  "prodId": "string", // Product ID (required)
  "quantity": "number" // Quantity to remove (required)
}
```

#### Validation Rules

- **prodId**: Must not be empty.
- **quantity**: Must be a number (required).

#### Response

- **Success (200)**: Product removed from cart.

  - **Response Body**:
    ```json
    {
      "message": "Product removed from cart"
    }
    ```

- **Error (400)**: Invalid data (e.g., missing product ID or invalid quantity).
  - **Response Body**:
    ```json
    {
      "errors": [{ "msg": "Product ID is required", "param": "prodId" }]
    }
    ```

#### Example Request

```bash
DELETE /remove-from-cart
Content-Type: application/json
Authorization: Bearer <your-jwt-token>

{
  "prodId": "1",
  "quantity": 1
}
```

---

## Error Handling

The API returns detailed error messages whenever validation or other issues occur. Errors are returned in the following format:

```json
{
  "errors": [
    {
      "msg": "error message",
      "param": "parameter that caused the error"
    }
  ]
}
```

---
