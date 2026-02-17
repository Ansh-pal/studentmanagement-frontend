# API Integration Guide

This guide helps you integrate the Angular frontend with your backend API.

---

## 🔗 Required API Endpoints

Your backend MUST provide these RESTful endpoints:

### 1. Get All Students
```
Method: GET
URL: /api/students
Response: Array of Student objects
Status: 200 OK
```

**Example Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "rollNo": "2024001",
    "course": "Computer Science",
    "marks": 85
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "rollNo": "2024002",
    "course": "Mathematics",
    "marks": 92
  }
]
```

### 2. Get Student by ID
```
Method: GET
URL: /api/students/{id}
Response: Single Student object
Status: 200 OK
```

**Example Request:**
```
GET /api/students/1
```

**Example Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "rollNo": "2024001",
  "course": "Computer Science",
  "marks": 85
}
```

### 3. Create Student
```
Method: POST
URL: /api/students
Content-Type: application/json
Request Body: Student object (without id)
Response: Created Student object (with id)
Status: 201 Created
```

**Example Request:**
```json
POST /api/students
Content-Type: application/json

{
  "name": "Alice Johnson",
  "rollNo": "2024003",
  "course": "Physics",
  "marks": 88
}
```

**Example Response:**
```json
{
  "id": 3,
  "name": "Alice Johnson",
  "rollNo": "2024003",
  "course": "Physics",
  "marks": 88
}
```

### 4. Update Student
```
Method: PUT
URL: /api/students/{id}
Content-Type: application/json
Request Body: Student object
Response: Updated Student object
Status: 200 OK
```

**Example Request:**
```json
PUT /api/students/3
Content-Type: application/json

{
  "id": 3,
  "name": "Alice Johnson",
  "rollNo": "2024003",
  "course": "Physics",
  "marks": 95
}
```

**Example Response:**
```json
{
  "id": 3,
  "name": "Alice Johnson",
  "rollNo": "2024003",
  "course": "Physics",
  "marks": 95
}
```

### 5. Delete Student
```
Method: DELETE
URL: /api/students/{id}
Response: No content or success message
Status: 200 OK or 204 No Content
```

**Example Request:**
```
DELETE /api/students/3
```

---

## 🛡️ CORS Configuration

Your backend MUST enable CORS for `http://localhost:4200` (Angular dev server).

### Spring Boot Example

#### Option 1: Controller-Level CORS
```java
@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {
    // Your endpoints
}
```

#### Option 2: Global CORS Configuration
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### Node.js/Express Example
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Your routes
app.get('/api/students', (req, res) => { /* ... */ });
app.post('/api/students', (req, res) => { /* ... */ });
// etc.
```

### ASP.NET Core Example
```csharp
// In Program.cs or Startup.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200")
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

// In middleware pipeline
app.UseCors("AngularApp");
```

---

## 📝 Data Model Specification

### Student Object Structure

```typescript
{
  id?: number;         // Optional for POST, Required for GET/PUT/DELETE
  name: string;        // Required, non-empty
  rollNo: string;      // Required, non-empty, should be unique
  course: string;      // Optional
  marks: number;       // Optional, typically 0-100
}
```

### Field Validation (Backend Recommendations)

- **id**: Auto-generated, primary key
- **name**: 
  - Required
  - Max length: 100 characters
  - Non-empty after trim
- **rollNo**: 
  - Required
  - Unique constraint
  - Max length: 50 characters
  - Pattern: alphanumeric
- **course**: 
  - Optional
  - Max length: 100 characters
- **marks**: 
  - Optional
  - Type: number/integer
  - Range: 0-100
  - Default: 0

---

## 🔧 Changing the API URL

If your API runs on a different host/port, update the URL in:

**File:** `src/app/services/student.service.ts`

```typescript
export class StudentService {
  // Change this line:
  private apiUrl = 'http://localhost:8080/api/students';
  
  // Examples:
  // private apiUrl = 'http://localhost:3000/api/students';
  // private apiUrl = 'https://api.example.com/students';
  // private apiUrl = 'http://192.168.1.100:8080/api/students';
  
  constructor(private http: HttpClient) { }
  // ...
}
```

---

## 🧪 Testing Your API

### Using curl

**Get All Students:**
```bash
curl http://localhost:8080/api/students
```

**Get One Student:**
```bash
curl http://localhost:8080/api/students/1
```

**Create Student:**
```bash
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Student",
    "rollNo": "TEST001",
    "course": "Testing",
    "marks": 100
  }'
```

**Update Student:**
```bash
curl -X PUT http://localhost:8080/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "name": "Updated Name",
    "rollNo": "TEST001",
    "course": "Testing",
    "marks": 95
  }'
```

**Delete Student:**
```bash
curl -X DELETE http://localhost:8080/api/students/1
```

### Using Postman

1. Import the following endpoints as a collection
2. Set base URL: `http://localhost:8080`
3. Test each endpoint before running Angular app

---

## ❗ Common API Integration Issues

### 1. CORS Error
**Symptom:** Browser console shows CORS policy error

**Solution:**
- Enable CORS on backend for `http://localhost:4200`
- Allow methods: GET, POST, PUT, DELETE
- Allow headers: Content-Type, Authorization

### 2. 404 Not Found
**Symptom:** API endpoints return 404

**Solution:**
- Verify backend is running
- Check API URL in `student.service.ts`
- Verify endpoint paths match exactly (case-sensitive)

### 3. 500 Internal Server Error
**Symptom:** Server returns 500 error

**Solution:**
- Check backend logs
- Verify database connection
- Check for null/missing fields
- Verify data types match

### 4. Network Error
**Symptom:** "Failed to fetch" or "Network error"

**Solution:**
- Verify backend server is running
- Check firewall settings
- Verify port number is correct
- Try accessing API directly in browser

### 5. Response Format Mismatch
**Symptom:** Data not displaying correctly

**Solution:**
- Verify API returns JSON format
- Check property names match exactly (case-sensitive)
- Verify response structure matches Student model

---

## 📊 Response Status Codes

Your API should return appropriate HTTP status codes:

| Status | Meaning | When to Use |
|--------|---------|-------------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST (student created) |
| 204 | No Content | Successful DELETE (alternative to 200) |
| 400 | Bad Request | Invalid input data |
| 404 | Not Found | Student ID doesn't exist |
| 500 | Internal Server Error | Server-side error |

---

## 🔍 Debugging Tips

### 1. Enable Browser DevTools
- Open DevTools (F12)
- Go to Network tab
- Filter by "XHR" or "Fetch"
- Test your operations
- Check request/response details

### 2. Check Angular Console
```bash
# The Angular app will log errors to console
# Look for messages like:
# "Error loading students: ..."
# "Error adding student: ..."
```

### 3. Backend Logging
Add logging to your backend endpoints:
```java
@GetMapping
public List<Student> getAllStudents() {
    System.out.println("GET /api/students called");
    // your code
}
```

---

## ✅ Integration Checklist

Before connecting Angular to your API:

- [ ] Backend server is running
- [ ] API endpoints are accessible (test with curl/Postman)
- [ ] CORS is enabled for `http://localhost:4200`
- [ ] Content-Type header is set to `application/json`
- [ ] Response format matches Student model
- [ ] All CRUD operations work independently
- [ ] Error responses include meaningful messages
- [ ] Database is connected and accessible

---

## 🚀 Quick Test Workflow

1. **Start Backend:** Ensure API is running
2. **Test API:** Use curl or Postman to verify endpoints
3. **Update URL:** Change URL in `student.service.ts` if needed
4. **Start Angular:** Run `npm start`
5. **Open Browser:** Navigate to `http://localhost:4200`
6. **Test Operations:**
   - View list (should see data from GET /api/students)
   - Add student (POST /api/students)
   - Edit student (GET /api/students/{id} then PUT)
   - Delete student (DELETE /api/students/{id})

---

## 📦 Sample Backend Response Examples

### Success Responses

**GET All (Empty):**
```json
[]
```

**GET All (With Data):**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "rollNo": "2024001",
    "course": "Computer Science",
    "marks": 85
  }
]
```

**POST Success:**
```json
{
  "id": 2,
  "name": "Jane Smith",
  "rollNo": "2024002",
  "course": "Mathematics",
  "marks": 92
}
```

### Error Responses

**404 Not Found:**
```json
{
  "error": "Student not found",
  "message": "Student with id 999 does not exist",
  "status": 404
}
```

**400 Bad Request:**
```json
{
  "error": "Validation failed",
  "message": "Name is required",
  "status": 400
}
```

---

## 🎯 Production Deployment Notes

When deploying to production:

1. **Update API URL** to production server
2. **Update CORS** to allow production origin
3. **Use HTTPS** for secure communication
4. **Add authentication** if required
5. **Configure environment files** properly

---

**Need Help?** Check the main README.md for more information or the QUICK_START.md for basic setup.
