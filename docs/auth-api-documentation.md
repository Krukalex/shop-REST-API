# Authentication API Documentation

This API provides endpoints for user authentication, including user registration (signup) and login functionality. Below are the available routes for authentication.

## Base URL

```
/auth
```

## Routes

### 1. User Signup

**POST** `/auth/signup`

This endpoint allows users to register by providing their name, email, and password.

#### Request Body

```json
{
  "name": "string", // Name of the user (required)
  "email": "string", // Valid email address (required)
  "password": "string" // Password between 4 and 20 characters (required)
}
```

#### Validation Rules

- **name**: A non-empty string (required).
- **email**: A valid email format.
- **password**: Must be between 4 and 20 characters long.

#### Response

- **Success (200)**: User is successfully created.

  - **Response Body**:
    ```json
    {
      "message": "User created successfully"
    }
    ```

- **Error (400)**: Invalid data (e.g., email format error, short password, missing fields).
  - **Response Body**:
    ```json
    {
      "errors": [{ "msg": "Email must be valid", "param": "email" }]
    }
    ```

#### Example Request

```bash
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

---

### 2. User Login

**POST** `/auth/login`

This endpoint allows users to authenticate by providing their email and password.

#### Request Body

```json
{
  "email": "string", // Email address (required)
  "password": "string" // Password (required)
}
```

#### Validation Rules

- **email**: A valid email format (required).
- **password**: A non-empty string (required).

#### Response

- **Success (200)**: Successful login.

  - **Response Body**:
    ```json
    {
      "message": "Login successful",
      "token": "jwt-token-here"
    }
    ```

- **Error (400)**: Invalid data or failed login.
  - **Response Body**:
    ```json
    {
      "errors": [{ "msg": "Email must be valid", "param": "email" }]
    }
    ```

#### Example Request

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

---

## Error Handling

The API will return a detailed error message whenever a validation or other failure occurs. Errors are returned in the following format:

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
