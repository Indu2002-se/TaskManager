# Task Manager Web Application

A full-stack task management application built with Angular (frontend) and Spring Boot (backend) with JWT authentication.

## 🚀 Features

- **User Authentication**: Register and login with JWT token-based authentication
- **Task Management**: Create, read, update, and delete tasks
- **Task Filtering**: Filter tasks by status (TO_DO, IN_PROGRESS, DONE)
- **Responsive UI**: Modern gradient-based design with smooth interactions
- **Secure API**: Protected endpoints with JWT authentication
- **Form Validation**: Client-side and server-side validation

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Java 21** or higher
- **Node.js 18+** and npm
- **MySQL 8.0+**
- **Maven 3.6+**
- **Angular CLI 21+**

## 🗄️ Database Setup

### 1. Install MySQL

Download and install MySQL from [https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/)

### 2. Create Database

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE taskdb;
```

### 3. Configure Database Connection

The application is configured to use the following database settings (located in `backend/taskmanager/src/main/resources/application.properties`):

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/taskdb?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=indu2002
```

**⚠️ Important**: Update the database password in `application.properties` to match your MySQL root password.

### 4. Database Tables

The application uses Spring JPA with `ddl-auto=update`, so tables will be created automatically on first run:

- `users` - Stores user credentials
- `tasks` - Stores task information

## 🔧 Backend Setup & Run

### 1. Navigate to Backend Directory

```bash
cd backend/taskmanager
```

### 2. Update Database Credentials

Edit `src/main/resources/application.properties` and update:

```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### 3. Build the Project

```bash
mvn clean install
```

### 4. Run the Backend

```bash
mvn spring-boot:run
```

The backend server will start on **http://localhost:8080**

### Backend API Endpoints

#### Authentication Endpoints (Public)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

#### Task Endpoints (Protected - Requires JWT Token)
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/{id}` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

## 🎨 Frontend Setup & Run

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Frontend

```bash
npm start
```

The frontend application will start on **http://localhost:4200**

### Frontend Structure

```
frontend/src/app/
├── components/
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── task-list/          # Task list with filtering
│   ├── task-form/          # Create/Edit task form
│   └── task-details/       # Task details view
├── services/
│   ├── auth.service.ts     # Authentication service
│   └── task.service.ts     # Task CRUD service
├── guards/
│   └── auth.guard.ts       # Route protection
├── interceptors/
│   └── auth.interceptor.ts # JWT token interceptor
└── models/
    ├── auth.model.ts       # Auth interfaces
    └── task.model.ts       # Task interfaces
```

## 🔐 JWT Authentication

### How It Works

1. User registers or logs in
2. Backend generates JWT token (valid for 24 hours)
3. Token is stored in browser's localStorage
4. HTTP interceptor automatically adds token to all API requests
5. Backend validates token for protected endpoints

### JWT Configuration

Located in `backend/taskmanager/src/main/resources/application.properties`:

```properties
jwt.expiration=86400000  # 24 hours in milliseconds
```

### Test Credentials

You can create a new account through the registration page, or use these test credentials if you've already created them:

**Example User:**
- Username: `testuser`
- Password: `password123`

## 🎯 Usage Guide

### 1. First Time Setup

1. Start MySQL database
2. Run backend server (it will create tables automatically)
3. Run frontend application
4. Navigate to http://localhost:4200

### 2. Register a New Account

1. Click "Register here" on the login page
2. Enter username (min 3 characters)
3. Enter password (min 6 characters)
4. Click "Register"

### 3. Login

1. Enter your username and password
2. Click "Login"
3. You'll be redirected to the task list

### 4. Manage Tasks

- **Create Task**: Click "Add New Task" button
- **View Task**: Click "View" on any task
- **Edit Task**: Click "Edit" on any task
- **Delete Task**: Click "Delete" (with confirmation)
- **Filter Tasks**: Use the status dropdown to filter

### 5. Logout

Click the "Logout" button in the header to end your session

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.5.5
- **Security**: Spring Security with JWT
- **Database**: MySQL 8.0
- **ORM**: Spring Data JPA / Hibernate
- **Build Tool**: Maven
- **Java Version**: 21

### Frontend
- **Framework**: Angular 21
- **Language**: TypeScript 5.9
- **Forms**: Reactive Forms
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router
- **Styling**: Custom CSS with gradients

## 📁 Project Structure

```
TaskManagerWeb/
├── backend/
│   └── taskmanager/
│       ├── src/main/java/com/example/taskmanager/
│       │   ├── config/          # Security & CORS config
│       │   ├── controller/      # REST controllers
│       │   ├── dto/             # Data transfer objects
│       │   ├── model/           # JPA entities
│       │   ├── repository/      # Data repositories
│       │   ├── security/        # JWT utilities
│       │   └── service/         # Business logic
│       └── pom.xml
├── frontend/
│   ├── src/app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── models/
│   └── package.json
└── README.md
```

## 🔍 API Request Examples

### Register User

```bash
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "username": "testUser",
  "password": "password123"
}
```

### Login

```bash
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "username": "testUser",
  "password": "password123"
}
```

### Create Task

```bash
POST http://localhost:8080/api/tasks
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task manager application",
  "status": "TO_DO"
}
```

## 🐛 Troubleshooting

### Backend Issues

**Problem**: `Access denied for user 'root'@'localhost'`
- **Solution**: Update MySQL password in `application.properties`

**Problem**: `Table 'taskdb.users' doesn't exist`
- **Solution**: Ensure `spring.jpa.hibernate.ddl-auto=update` is set in properties

**Problem**: Port 8080 already in use
- **Solution**: Stop other applications using port 8080 or change port in `application.properties`

### Frontend Issues

**Problem**: CORS error
- **Solution**: Ensure backend CORS configuration allows `http://localhost:4200`

**Problem**: `Cannot GET /tasks`
- **Solution**: Ensure backend is running on port 8080

**Problem**: Token expired
- **Solution**: Logout and login again to get a new token

## 📝 Environment Variables

### Backend (application.properties)

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/taskdb
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

# JWT
jwt.expiration=86400000

# Server
server.port=8080
```

### Frontend (environment.ts)

API URL is hardcoded in services. To change:
- Edit `frontend/src/app/services/auth.service.ts`
- Edit `frontend/src/app/services/task.service.ts`

## 🚦 Running Tests

### Backend Tests

```bash
cd backend/taskmanager
mvn test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 📦 Building for Production

### Backend

```bash
cd backend/taskmanager
mvn clean package
java -jar target/taskmanager-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
cd frontend
npm run build
# Output will be in dist/ folder
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is open source and available under the MIT License.



## 🙏 Acknowledgments

- Spring Boot Documentation
- Angular Documentation
- JWT.io for JWT resources
