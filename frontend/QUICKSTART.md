# Quick Start Guide

## Prerequisites
- Node.js installed
- Backend running on http://localhost:8080

## Setup & Run

```bash
cd frontend
npm install
npm start
```

The application will open at `http://localhost:4200`

## First Time Usage

1. Click "Register here" to create an account
2. Enter username (min 3 chars) and password (min 6 chars)
3. After registration, you'll be logged in automatically
4. Start creating tasks!

## Features

- **Login/Register**: JWT-based authentication
- **Task List**: View all tasks with status filtering
- **Create Task**: Click "Add New Task" button
- **Edit Task**: Click "Edit" on any task
- **View Details**: Click "View" on any task
- **Delete Task**: Click "Delete" (with confirmation)
- **Filter**: Use dropdown to filter by status (All, To Do, In Progress, Done)

## Tech Stack

- Angular 21
- Reactive Forms
- Standalone Components
- HTTP Client with Interceptors
- Route Guards
- Simple CSS (no external UI libraries)
