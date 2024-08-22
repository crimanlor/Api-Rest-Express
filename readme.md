# Api Rest Express

This project is a simple Express application that allows you to manage user data by adding and retrieving users stored in a text file without interface.

## Requirements

### Initial Setup

- Initialize the Node.js project and install dependencies (`express`, `fs`).
- Configure the server with Express.

### Core Features

- **POST `/users`:** Add users by providing their name and surnames in JSON format. Validate inputs and store them in a text file.
- **GET `/users`:** Retrieve users from the file, with optional filters for name and surnames. Return all users if no filters are provided.

### Error Handling

- Implement clear error messages for input validation and file handling issues.

### Performance Optimization

- Consider using file handling techniques like streams for better performance with large data files.

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/crimanlor/Api-Rest-Express.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd your-repo
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the server:**

   ```bash
   npm start
   ```

## Usage

1. Open your browser and go to `http://localhost:3000`.
2. Use a tool like Postman or ThunderClient to make requests to the POST and GET endpoints.
3. Add new users using the POST `/users` endpoint and view all stored users using the GET `/users` endpoint.

## Dependencies

- `express`: To create the server and handle routes.
- `morgan`: To log requests.
- `fs`: To handle file operations (reading and writing user data).
- `path`: To handle the absolute and relative routes.

## Example Usage of the Endpoints

You can use the following code snippets in Postman or another HTTP client:

### POST `/users`

Add a new user:

```json
POST /users
Content-Type: application/json

{
  "name": "Lorena",
  "surnames": "Criado Gonzalez"
}
```

### GET `/users`

Get all users:

```json
GET /users
```

Get user filtered by name:

```json
GET /users?name=Lorena
```

Get user filtered by surnames:

```json
GET /users?surnames=Criado
```

Get users filtered by both name and surnames

```json
GET /users?name=Lorena&surnames=Criado
```
