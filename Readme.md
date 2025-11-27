# 🚀 TaskFlow

**TaskFlow** is a scalable full-stack task management application featuring secure authentication, a responsive dashboard, and robust CRUD capabilities. It is built using the **PERN stack** (PostgreSQL, Express, React, Node.js) and is designed with scalability in mind.

![Tech Stack](https://img.shields.io/badge/Stack-PERN-blue)
![Frontend](https://img.shields.io/badge/Frontend-React_19_+_Vite-61DAFB)
![Backend](https://img.shields.io/badge/Backend-Node.js_+_Express-339933)
![Database](https://img.shields.io/badge/Database-PostgreSQL-336791)

---

## ✨ Features

### 🔐 Authentication & Security

- **Secure Signup/Login:** Uses `bcrypt` for password hashing.
- **JWT Authentication:** Stateless auth using Access Tokens (short-lived) and Refresh Tokens (stored in HTTP-Only cookies).
- **Protected Routes:** Middleware to restrict dashboard access to authenticated users.

### 📊 Dashboard & Tasks

- **CRUD Operations:** Create, Read, Update, and Delete tasks securely.
- **Task Management:** Set priorities (Low/Mid/High), due dates, and statuses.
- **Search & Filter:** Server-side filtering by date range and search by title/description.
- **Pagination:** Optimized server-side pagination for handling large datasets.

### 🎨 UI/UX

- **Responsive Design:** Built with **TailwindCSS** for mobile and desktop compatibility.
- **Instant Feedback:** Toast notifications for success and error states.
- **Profile Management:** Update user details (Name).
- **Dashboard Features:**
  - Display user profile (fetched from backend)
  - CRUD operations on the sample entity
  - Search and filter UI
  - Logout flow

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite), TailwindCSS, Axios, React Router DOM, React Toastify.
- **Backend:** Node.js, Express.js, Cookie-Parser.
- **Database:** PostgreSQL (`pg` library).
- **Dev Tools:** Vite-Express (simultaneous frontend/backend serving), Nodemon.

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone <paste-the-github-repo-link>
cd TaskFlow
```

### 2. Install Dependencies

```bash
npm install
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup (PostgreSQL)

Ensure you have PostgreSQL installed. Create a database named `taskflow` (or any name you prefer) and run the following SQL commands to create the required tables:

```sql
-- Create Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Tasks Table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority_id INTEGER NOT NULL CHECK (priority_id IN (1, 2, 3)), -- 1: Low, 2: Mid, 3: High
    status_id INTEGER DEFAULT 1, -- 1: Pending, 3: Completed
    due_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add the following credentials:

```env
# Database Configuration
DB_USER=your_postgres_user
DB_HOST=localhost
DB_NAME=taskflow
DB_PASSWORD=your_postgres_password
DB_PORT=5432

# JWT Secrets (Use strong random strings)
JWT_SECRET=your_super_secret_access_key
REFRESH_TOKEN_SECRET=your_super_secret_refresh_key
```

### 5. Run the Application

Start the development server (runs both Client and Server via `vite-express`):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

---

## 📡 API Endpoints

| Method    | Endpoint                    | Description                     | Auth Required |
| :-------- | :-------------------------- | :------------------------------ | :------------ |
| **Auth**  |                             |                                 |               |
| `POST`    | `/api/auth/register`        | Register a new user             | ❌            |
| `POST`    | `/api/auth/login`           | Login and receive tokens        | ❌            |
| `POST`    | `/api/auth/refresh-token`   | Refresh access token            | ❌            |
| `POST`    | `/api/auth/logout`          | Logout user                     | ❌            |
| `POST`    | `/api/auth/update-profile`  | Update name/email               | ✅            |
| **Tasks** |                             |                                 |               |
| `POST`    | `/api/task/create-task`     | Create a new task               | ✅            |
| `GET`     | `/api/task/tasks`           | Fetch tasks (pagination/search) | ✅            |
| `POST`    | `/api/task/update-task/:id` | Update task details             | ✅            |
| `POST`    | `/api/task/delete-task/:id` | Delete a task                   | ✅            |

---

## 📂 Project Structure

```text
TaskFlow/
├── src/
│   ├── client/           # React Frontend Application
│   │   ├── components/   # Shared UI components
│   │   ├── pages/        # Views (Auth, Dashboard, Profile)
│   │   ├── services/     # API Service calls
│   │   └── hook/         # Auth Context
│   ├── server/           # Express Backend Application
│   │   ├── config/       # Database connection
│   │   ├── controllers/  # Request logic
│   │   ├── middleware/   # Auth verification
│   │   └── routes/       # API Definitions
├── SCALING.md            # Production architecture guide
└── package.json          # Dependencies and scripts
```

---

**Author:** [Your Name]

### Security & Scalability

- Password hashing (bcrypt or similar)
- JWT authentication middleware
- Error handling & validation
- Code structured for easy scaling

## Deliverables

- Frontend (React/Next.js) + Basic Backend (Node.js/Python) hosted in a GitHub repo
- Functional authentication (register/login/logout with JWT)
- Dashboard with CRUD-enabled entity
- Postman collection or API docs: [Link to Postman Collection/API Docs]
- Note on how you would scale the frontend-backend integration for production: [Link to Scaling Notes]
