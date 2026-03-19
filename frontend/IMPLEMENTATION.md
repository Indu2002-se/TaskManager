# Task Manager Frontend Implementation

## Features Implemented

### Authentication
- **Register Page**: Reactive form with validation (username 3-50 chars, password 6-50 chars)
- **Login Page**: Reactive form with username and password validation
- **JWT Token Management**: Stored in localStorage, automatically attached to API requests via HTTP interceptor
- **Auth Guard**: Protects task routes from unauthorized access

### Task Management
- **Task List Page**: 
  - Displays all tasks in a table format
  - Filter by status (All, TO_DO, IN_PROGRESS, DONE)
  - Actions: View, Edit, Delete
  - Shows username and logout button

- **Task Form Page** (Add/Edit):
  - Reactive Forms with validation
  - Title: Required, max 255 characters
  - Description: Optional, max 1000 characters
  - Status: Required (TO_DO, IN_PROGRESS, DONE)
  - Same component handles both create and edit modes

- **Task Details Page**:
  - Shows complete task information
  - Actions: Edit, Delete, Back to List
  - Formatted date display

## Angular Concepts Used

1. **Reactive Forms**: All forms use FormBuilder with validators
2. **Angular Routing**: Complete routing setup with guards
3. **Services**: 
   - AuthService: Handles authentication
   - TaskService: Handles CRUD operations
4. **HTTP Interceptor**: Automatically adds JWT token to requests
5. **Route Guards**: Protects authenticated routes
6. **Standalone Components**: All components are standalone
7. **Component Communication**: Uses services for state management
8. **Error Handling**: Displays error messages for failed operations

## Project Structure

```
src/app/
├── components/
│   ├── login/
│   ├── register/
│   ├── task-list/
│   ├── task-form/
│   └── task-details/
├── services/
│   ├── auth.service.ts
│   └── task.service.ts
├── guards/
│   └── auth.guard.ts
├── interceptors/
│   └── auth.interceptor.ts
└── models/
    ├── auth.model.ts
    └── task.model.ts
```

## API Endpoints

- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/tasks` - Get all tasks
- GET `/api/tasks/:id` - Get task by ID
- POST `/api/tasks` - Create new task
- PUT `/api/tasks/:id` - Update task
- DELETE `/api/tasks/:id` - Delete task

## Running the Application

1. Start the backend server (Spring Boot on port 8080)
2. Install dependencies: `npm install`
3. Start the frontend: `npm start`
4. Navigate to `http://localhost:4200`

## Default Flow

1. User lands on login page
2. Can register a new account or login
3. After authentication, redirected to task list
4. Can create, view, edit, and delete tasks
5. Can filter tasks by status
6. Logout returns to login page
