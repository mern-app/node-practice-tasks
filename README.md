# Node.js Practice Tasks

A collection of three Node.js practice tasks covering file system operations, Express APIs, request handling, JSON files, and basic system information.

## Project Structure

```text
node-practice-tasks/
├── task-1-folder-report/  # Lists files, extensions, and sizes
├── task-2-contact-api/   # Contact form API (in-memory data)
└── task-3-courses-api/  # Courses API (JSON file)
```

## Task 1 — Folder Report

A Node.js script reads the contents of `test-folder` and prints each file's name, extension, and size in KB.

### Run

```bash
cd task-1-folder-report
node report.js
```

No API routes are used in this task.

## Task 2 — Contact Form API

**Base URL:** `http://localhost:3000`

Start the server:

```bash
cd task-2-contact-api
npm install
node app.js
```

Messages are stored in an in-memory array. They are lost when the server restarts.

### Routes

#### 1. Submit a contact message

- **Method:** `POST`
- **Route:** `/api/contact`
- **Parameters:** None (no route parameters or query parameters)
- **Content-Type:** `application/json`

Request body:

```json
{
  "name": "Rahul",
  "email": "rahul@example.com",
  "message": "Hello"
}
```

Example request URL: `POST http://localhost:3000/api/contact`

Successful response (**201 Created**):

```json
{
  "success": true,
  "message": "Thanks Rahul!"
}
```

If a required field is missing, the intended response is **400 Bad Request**:

```json
{
  "success": false,
  "message": "All fields are required"
}
```

> **Implementation note:** The current code sends the 400 response but does not return afterward. It continues to save the message and attempts to send a second response. Add `return` after the 400 response to stop execution.

The implementation trims whitespace and converts the email to lowercase before saving it.

#### 2. Get all contact messages

- **Method:** `GET`
- **Route:** `/api/contact`
- **Parameters:** None

Example request URL: `GET http://localhost:3000/api/contact`

Example response (**200 OK**):

```json
[
  {
    "id": 1,
    "name": "Rahul",
    "email": "rahul@example.com",
    "message": "Hello"
  }
]
```

Returns an empty array (`[]`) if no messages have been submitted since the server started.

## Task 3 — Kodyfier Courses API

**Base URL:** `http://localhost:3000`

Start the server:

```bash
cd task-3-courses-api
npm install
node app.js
```

Courses are read from `data/courses.json`.

### Routes

#### 1. Get all courses

- **Method:** `GET`
- **Route:** `/api/courses`
- **Route parameters:** None
- **Query parameters:** Optional `category`

Example — all courses:

```http
GET http://localhost:3000/api/courses
```

Example response (**200 OK**):

```json
[
  { "id": 1, "title": "React Mastery", "category": "frontend", "price": 4999 },
  { "id": 2, "title": "Node.js & Express", "category": "backend", "price": 5999 },
  { "id": 3, "title": "MySQL with Drizzle", "category": "database", "price": 3999 },
  { "id": 4, "title": "Next.js Pro", "category": "frontend", "price": 6999 }
]
```

Example — filter by category using a query parameter:

```http
GET http://localhost:3000/api/courses?category=frontend
```

Example response (**200 OK**):

```json
[
  { "id": 1, "title": "React Mastery", "category": "frontend", "price": 4999 },
  { "id": 4, "title": "Next.js Pro", "category": "frontend", "price": 6999 }
]
```

Available categories in the provided data: `frontend`, `backend`, `database`.

#### 2. Get a course by ID

- **Method:** `GET`
- **Route:** `/api/courses/:id`
- **Route parameter:** `id` — course ID (converted to a number)
- **Query parameters:** None

Example request:

```http
GET http://localhost:3000/api/courses/2
```

Example response (**200 OK**):

```json
{
  "id": 2,
  "title": "Node.js & Express",
  "category": "backend",
  "price": 5999
}
```

If the ID does not match a course, the API returns **404 Not Found**:

```json
{
  "error": "Course not found"
}
```

Example: `GET http://localhost:3000/api/courses/99`

#### 3. Get server health/system information

- **Method:** `GET`
- **Route:** `/api/health`
- **Parameters:** None

Example request:

```http
GET http://localhost:3000/api/health
```

Example response (**200 OK**; values vary by machine and at runtime):

```json
{
  "platform": "win32",
  "cpuCores": 8,
  "freeMemory": 1234567890
}
```

- `platform`: operating system platform reported by Node.js
- `cpuCores`: number of logical CPU cores
- `freeMemory`: free system memory in bytes

## Route Quick Reference

| Task | Method | URL | Parameters |
|---|---|---|---|
| Contact | `POST` | `/api/contact` | JSON body: `name`, `email`, `message` |
| Contact | `GET` | `/api/contact` | None |
| Courses | `GET` | `/api/courses` | Optional query: `category` |
| Courses | `GET` | `/api/courses/:id` | Route param: `id` |
| Courses | `GET` | `/api/health` | None |

## Testing

You can test the API endpoints using a browser (for GET requests), Postman, or Thunder Client in VS Code. For the contact POST endpoint, send a JSON body and set the `Content-Type` header to `application/json`.
