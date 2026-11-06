# Odin Book Store – Full Stack Authentication Project

A full-stack Book Store application built using React, Tailwind CSS, Node.js, Express.js and PostgreSQL.

##  Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- PostgreSQL
- pg (PostgreSQL client)
- bcryptjs (Password hashing)
- jsonwebtoken (JWT authentication)
- cookie-parser
- dotenv
- nodemon

---

# 1. Backend Setup

## Step 1: Initialize Node.js

```bash
npm init -y
```

This creates the `package.json` file.

## Step 2: Install Express

```bash
npm install express
```

Express is a Node.js framework used to create backend servers and APIs.

## Step 3: Install Backend Dependencies

```bash
npm install pg bcryptjs jsonwebtoken cookie-parser dotenv
```

| Package | Purpose |
|---|---|
| pg | Connect PostgreSQL database |
| bcryptjs | Hash and compare passwords |
| jsonwebtoken | Create and verify JWT tokens |
| cookie-parser | Read cookies from requests |
| dotenv | Read environment variables |

## Step 4: Install Nodemon

```bash
npm install nodemon -D
```

Nodemon automatically restarts the server when code changes during development.

Update `package.json`:

```json
{
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## Step 5: Create the Backend Server

Create `server.js`.

Basic Express server:

```js
import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server is running')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
```

Start the backend:

```bash
npm run dev
```

---

# 2. PostgreSQL Database Setup

Create a database named:

```sql
CREATE DATABASE prem_auth;
```

Connect to the database and create the users table:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Users Table Fields

- `id`: Unique user ID
- `name`: User name
- `email`: User email
- `password`: Hashed password
- `created_at`: Account creation date

---

# 3. Environment Variables

Create a `.env` file in the backend root folder.

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=prem_auth
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD

JWT_SECRET=YOUR_LONG_RANDOM_SECRET

CLIENT_URL=http://localhost:5173
```

**Important:** Never upload `.env` to GitHub. Do not share your actual database password or JWT secret.

---

# 4. Database Connection

Create a folder named `config`.

Inside it, create `db.js`.

```js
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

export default pool
```

This file creates a PostgreSQL connection pool that can be reused in backend routes.

---

# 5. Backend Folder Structure

```text
Backend/
│
├── config/
│   └── db.js
│
├── middleware/
│   └── auth.js
│
├── Routs/
│   └── auth.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

### Authentication Routes

Create `Routs/auth.js`.

This file handles:

- User registration
- User login
- Getting logged-in user details
- User logout
- Password verification
- JWT cookie creation

### Authentication Middleware

Create `middleware/auth.js`.

This middleware is responsible for:

- Reading the JWT token from cookies
- Verifying the token
- Identifying the logged-in user
- Protecting private API routes

---

# 6. Backend API Testing

Use Postman to test the backend APIs.

| Method | API Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get logged-in user |
| POST | `/api/auth/logout` | Logout user |

Example backend URL:

```text
http://localhost:5000
```

---

# 7. Frontend Setup

Create a React application using Vite.

From the project root:

```bash
npm create vite@latest Frontend -- --template react
```

Go inside the frontend folder:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

## Step 1: Install Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/vite
```

Configure the Tailwind Vite plugin in `vite.config.js`.

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ]
})
```

In `src/index.css`:

```css
@import "tailwindcss";
```

## Step 2: Install Axios and React Router

```bash
npm install axios react-router-dom
```

### Axios

Used to send HTTP requests from frontend to backend.

### React Router DOM

Used for navigation between pages without full page reloads.

## Step 3: Start Frontend

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# 8. Frontend Folder Structure

```text
Frontend/
│
├── public/
│
├── src/
│   ├── component/
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── vite.config.js
```

---

# 9. React App.jsx – Authentication Flow

In `App.jsx`, use:

- `BrowserRouter`
- `Routes`
- `Route`
- `useState`
- `useEffect`
- Axios

### useState

`useState` stores data in React and updates the UI when its state changes.

Example:

```jsx
const [user, setUser] = useState(null)
const [error, setError] = useState('')
const [loading, setLoading] = useState(true)
```

| Variable | Purpose |
|---|---|
| user | Stores logged-in user data |
| setUser | Updates user data |
| error | Stores error messages |
| setError | Updates error messages |
| loading | Tracks loading state |
| setLoading | Updates loading state |

### useEffect

`useEffect` runs code after the component renders.

Example: Check whether the user is already logged in.

```jsx
useEffect(() => {
    const fetchUser = async () => {
        try {
            const res = await axios.get(
                'http://localhost:5000/api/auth/me',
                { withCredentials: true }
            )

            setUser(res.data)
        } catch (error) {
            setUser(null)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    fetchUser()
}, [])
```

### Understanding the Code

- `useEffect`: Runs the authentication check after rendering.
- `fetchUser`: An asynchronous function that requests user details.
- `axios.get`: Sends a GET request to the backend.
- `withCredentials: true`: Allows cookies to be sent with the request.
- `setUser(res.data)`: Stores the logged-in user.
- `catch`: Handles errors.
- `finally`: Runs whether the request succeeds or fails.
- `setLoading(false)`: Stops the loading screen.
- `[]`: Runs the effect
