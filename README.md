# Role-Based Financial Management Backend System
This is a backend system built using Node.js, Express, and MongoDB that manages financial records with role-based access control (RBAC).

It allows users to create, view, update, and delete financial transactions such as income and expenses. The system supports different user roles like Viewer, Analyst, and Admin, each with specific permissions.

It also provides dashboard APIs for analytics such as total income, expenses, net balance, and category-wise summaries.

## Features

###  User & Role Management
- User registration and login
- Role assignment (Viewer, Analyst, Admin)
- Active/inactive user status

###  Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Protected routes using middleware

###  Financial Records Management
- Create financial records (income/expense)
- Read, update, delete records
- Filter by date, category, type

###  Dashboard Analytics
- Total income and expenses
- Net balance calculation
- Category-wise breakdown
- Recent transactions
- Monthly/weekly trends

###  Validation & Error Handling
- Input validation
- Proper error responses
- HTTP status codes

## Tech Stack

- Node.js
- Express.js
- MongoDB / Mongoose
- JWT Authentication
- bcryptjs

## Project Structure

zorvyn_assignment
│── controllers/
│── models/
│── routes/
│── middleware/
│── validators/
│── config/
│── app.js
│── server.js

## Installation

### 1. Clone the repository
git clone https://github.com/Narasimha-143/Finance_Dashboard_System_Backend.git

### 2. Install dependencies
npm install

## Environment Variables

Create a .env file and add:

PORT=5000
MONGO_URI=mongodb://localhost:27017/mydb
JWT_SECRET=mysecretkey     

## Run the Project

npm run dev

## API Endpoints

### Auth Routes
POST /api/auth/register
POST /api/auth/login

### Financial Records
GET    /api/records
POST   /api/records
PUT    /api/records/:id
DELETE /api/records/:id

### Dashboard
GET /api/dashboard/summary

## Roles

### Viewer
- Can only view data

### Analyst
- Can view records and analytics

### Admin
- Full access (CRUD + user management)

## Key Concepts

- Role-Based Access Control (RBAC)
- REST API design
- Authentication & Authorization
- Middleware architecture
- Data aggregation for dashboards

## Author

Golla Narasimha Rao 
GitHub: https://github.com/Narasimha-143
