# API Templates

## Authentication

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

## Authentication

1. Get all credentials of a user
   - Request
     ```bash
        curl --request GET \
            --url http://localhost:4200/credential \
            --header 'Authorization: Bearer eyJhbG...'
     ```
   - Response
     ```
     [
         {
             "_id": "637c3c078c0e51a4ec64fd42",
             "domainAlias": "Google",
             "domain": "https://google.com.pe",
             "user": "carlos@example.com",
             "password": "pass",
             "lastUpdate": "2022-11-22T03:03:35.467Z",
             "__v": 0
         }
     ]
     ```
2. Create a new credential
   - Request
     ```bash
        curl --request POST \
        --url http://localhost:4200/credential \
        --header 'Authorization: Bearer eyJhbGci...' \
        --header 'Content-Type: application/json' \
        --data '{
            "domain":"https://google.com.pe",
            "domainAlias": "Google",
            "user": "carlos@example.com",
            "password": "pass"
        }'
     ```
   - Response
     ```
        {
            "domainAlias": "Google",
            "domain": "https://google.com.pe",
            "user": "carlos@example.com",
            "password": "pass",
            "lastUpdate": "2022-11-22T03:03:35.467Z",
            "_id": "637c3c078c0e51a4ec64fd42",
            "__v": 0
        }
     ```
3. Get a new credential by id
   - Request
     ```bash
        curl --request GET \
        --url http://localhost:4200/credential/637c3c078c0e51a4ec64fd42 \
        --header 'Authorization: Bearer eyJhbGc...'
     ```
   - Response
     ```
     {
        "_id": "637c3c078c0e51a4ec64fd42",
        "domainAlias": "Google",
        "domain": "https://google.com.pe",
        "user": "carlos@example.com",
        "password": "pass",
        "lastUpdate": "2022-11-22T03:03:35.467Z",
        "__v": 0
     }
     ```
4. Update a credential by id
   - Request
     ```bash
        curl --request GET \
        --url http://localhost:4200/credential/637c3c078c0e51a4ec64fd42 \
        --header 'Authorization: Bearer eyJhbGc...'
     ```
   - Response: Return body before change
     ```
     {
        "_id": "637c3c078c0e51a4ec64fd42",
        "domainAlias": "Google",
        "domain": "https://google.com.pe",
        "user": "carlos@example.com",
        "password": "pass",
        "lastUpdate": "2022-11-22T03:03:35.467Z",
        "__v": 0
     }
     ```
5. Delete a credential by id
   - Request
     ```bash
        curl --request DELETE \
        --url http://localhost:4200/credential/637c3c078c0e51a4ec64fd42 \
        --header 'Authorization: Bearer eyJhbGc...'
     ```
   - Response: Return body before change
     ```
     {
        "_id": "637c3c078c0e51a4ec64fd42",
        "domainAlias": "Google Drive",
        "domain": "https://google.com.pe",
        "user": "carlos@example.com",
        "password": "password",
        "lastUpdate": "2022-11-22T03:14:56.942Z",
        "__v": 0
     }
     ```
