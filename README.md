# Student Management System - Angular Frontend

A complete Angular frontend application for managing student records with full CRUD (Create, Read, Update, Delete) operations.

## Features

- View all students in a responsive table
- Add new students with form validation
- Edit existing student records
- Delete students with confirmation
- Clean and responsive UI
- Error handling and user feedback
- Angular 21 with standalone components
- TypeScript, HTML, and CSS
- Template-driven forms with ngModel
- HttpClient for API communication
- Angular Router for navigation

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/              # Navigation bar component
│   │   ├── student-list/        # Display all students
│   │   ├── student-form/        # Add new student
│   │   └── student-edit/        # Edit existing student
│   ├── models/
│   │   └── student.model.ts     # Student interface/model
│   ├── services/
│   │   └── student.service.ts   # API service for CRUD operations
│   ├── app.ts                   # Root component
│   ├── app.config.ts            # Application configuration
│   └── app.routes.ts            # Route configuration
└── styles.css                   # Global styles
```

## Student Model

```typescript
interface Student {
  id?: number;
  name: string;        // Required
  rollNo: string;      // Required
  course: string;
  marks: number;
}
```

## Routes

| Route        | Component          | Description           |
|--------------|--------------------|-----------------------|
| /            | StudentListComponent| View all students    |
| /add         | StudentFormComponent| Add new student      |
| /edit/:id    | StudentEditComponent| Edit student by ID   |

## Prerequisites

- Node.js (v18 or higher)
- npm (v10 or higher)
- Angular CLI (v21)

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure API URL in src/app/services/student.service.ts:
   ```typescript
   private apiUrl = 'http://localhost:8080/api/students';
   ```

## Running the Application

Start the development server:
```bash
npm start
```

Open your browser: http://localhost:4200

## Building for Production

```bash
npm run build
```

## API Endpoints

| Method | Endpoint                    | Description           |
|--------|-----------------------------|-----------------------|
| GET    | /api/students              | Get all students      |
| GET    | /api/students/:id          | Get student by ID     |
| POST   | /api/students              | Create new student    |
| PUT    | /api/students/:id          | Update student        |
| DELETE | /api/students/:id          | Delete student        |

## CORS Configuration

Ensure your backend API has CORS enabled for http://localhost:4200

## Form Validation

- Name: Required field
- Roll Number: Required field
- Course: Optional field
- Marks: Optional, accepts numbers 0-100

## Features in Detail

### Student List Page (/)
- Displays all students in a table
- Edit and Delete buttons for each student
- Add New Student button
- Loading and error states

### Add Student Page (/add)
- Form with validation
- Success/error messages
- Auto-redirect after submission
- Cancel and Reset buttons

### Edit Student Page (/edit/:id)
- Pre-populated form
- Update existing record
- Cancel button
- Success/error messages

### Navigation
- Sticky navbar
- Active route highlighting
- Responsive design

## Technologies Used

- Angular 21
- TypeScript 5.9
- RxJS 7.8
- Angular Router
- HttpClient
- FormsModule
- CSS3

## Note

Make sure your backend REST API is running before starting this application.
