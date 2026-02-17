# Quick Start Guide - Student Management System

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Backend API URL
Open `src/app/services/student.service.ts` and update line 11:
```typescript
private apiUrl = 'http://localhost:8080/api/students'; // Change to your backend URL
```

### Step 3: Start the Application
```bash
npm start
```

Open browser at: **http://localhost:4200**

---

## 📋 Features Available

✅ **View Students** - Navigate to `/` (home page)
✅ **Add Student** - Click "Add New Student" or navigate to `/add`
✅ **Edit Student** - Click "Edit" button on any student
✅ **Delete Student** - Click "Delete" button on any student

---

## 🎯 What's Included

### Components Created:
- ✅ `navbar` - Navigation bar with links
- ✅ `student-list` - Display all students in a table
- ✅ `student-form` - Add new student with validation
- ✅ `student-edit` - Edit existing student

### Services:
- ✅ `StudentService` - HTTP service with CRUD operations

### Models:
- ✅ `Student` - TypeScript interface

### Routing:
- ✅ `/` → Student List
- ✅ `/add` → Add Student Form
- ✅ `/edit/:id` → Edit Student Form

---

## 🔧 Requirements

Your backend API must support these endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get one student |
| POST | `/api/students` | Create student |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |

---

## ⚙️ CORS Setup (Backend)

Make sure your backend allows requests from `http://localhost:4200`

**For Spring Boot:**
```java
@CrossOrigin(origins = "http://localhost:4200")
```

---

## 🧪 Test Flow

1. **Start backend API** (e.g., on port 8080)
2. **Start Angular app** - `npm start`
3. **Open** http://localhost:4200
4. **Test:**
   - View empty/populated list
   - Add a new student
   - Edit the student
   - Delete the student

---

## 📦 Project Structure

```
src/app/
├── components/
│   ├── navbar/           ← Navigation component
│   ├── student-list/     ← List all students
│   ├── student-form/     ← Add student
│   └── student-edit/     ← Edit student
├── models/
│   └── student.model.ts  ← Student interface
├── services/
│   └── student.service.ts ← API service
├── app.routes.ts         ← Route configuration
├── app.config.ts         ← App configuration (HttpClient)
└── app.ts                ← Root component
```

---

## 🐛 Common Issues

### Port Already in Use
```bash
ng serve --port 4300
```

### CORS Error
Enable CORS on your backend server

### API Not Found
Check the API URL in `student.service.ts`

---

## 📝 Student Data Format

```json
{
  "id": 1,
  "name": "John Doe",
  "rollNo": "2024001",
  "course": "Computer Science",
  "marks": 85
}
```

---

## ✨ Technologies

- Angular 21 (Standalone Components)
- TypeScript 5.9
- Template-driven Forms (ngModel)
- HttpClient
- Angular Router
- RxJS

---

## 📖 Full Documentation

See `README.md` for complete documentation.

---

**That's it! You're ready to go! 🎉**
