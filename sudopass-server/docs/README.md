# API Templates

**Check if a user exists**

- Request [GET]:
  ```
  http://localhost:4200/auth/user-exist/<email>
  ```
- Response:
  - User exist
    ```json
    {
      "email": "user@example.com"
    }
    ```
  - User not exist or mispelling
    ```json
    {
      "msg": "User misspelling or not exist"
    }
    ```

**Register a new user**

- Request [POST]:

  ```bash
  http://localhost:4200/auth/signup
  ```

  - Body
    ```json
    {
      "alias": "juan",
      "email": "user@example.com",
      "password": "pass"
    }
    ```

- Response:
  - Success
    ```json
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE2NjkwODEyMzcsImV4cCI6MTY2OTA4NDgzN30.-ky3r9_jLrXUIbG3GsiioVtuZRiYEDonzNFJaSG9WUU"
    }
    ```
  - Error: User already exists
    ```json
    {
      "statusCode": 400,
      "message": "User already exists",
      "error": "Bad Request"
    }
    ```

**Login a user**

- Request [POST]:

  ```bash
  http://localhost:4200/auth/login
  ```

  - Body
    ```json
    {
      "email": "john",
      "password": "changeme"
    }
    ```

- Response:
  - Success
    ```json
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE2NjkwODEyMzcsImV4cCI6MTY2OTA4NDgzN30.-ky3r9_jLrXUIbG3GsiioVtuZRiYEDonzNFJaSG9WUU"
    }
    ```
  - Error:
    ```json
    {
      "statusCode": 401,
      "message": "Invalid credentials",
      "error": "Unauthorized"
    }
    ```
