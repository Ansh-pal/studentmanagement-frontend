# 🔧 Exact Code Changes - Production Fix

## Problem
Your deployed Angular app on Netlify was calling:
```
http://localhost:8080/api/students ❌
```

## Solution
Configure environment variables and update service to use them.

---

## ✅ Files Changed

### 1. `src/environments/environment.ts` (PRODUCTION)

**BEFORE:**
```typescript
export const environment = {
    url: process.env['NG_APP_BASE_URL']
};
```

**AFTER:**
```typescript
// Production environment configuration
export const environment = {
  production: true,
  apiUrl: 'https://studentrecc-hfekdjescncbeec.centralindia-01.azurewebsites.net/api/students'
};
```

---

### 2. `src/environments/environment.development.ts` (DEVELOPMENT)

**BEFORE:**
```typescript
export const environment = {
    url: process.env['NG_APP_BASE_URL']
};
```

**AFTER:**
```typescript
// Development environment configuration
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/students'
};
```

---

### 3. `src/app/services/student.service.ts`

**BEFORE:**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/api/students'; // ❌ HARDCODED

  constructor(private http: HttpClient) { }
  // ... rest of code
}
```

**AFTER:**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Student } from '../models/student.model';
import { environment } from '../../environments/environment'; // ✅ ADDED

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = environment.apiUrl; // ✅ USES ENVIRONMENT

  constructor(private http: HttpClient) { }
  // ... rest of code
}
```

**Key Changes:**
1. ✅ Added import: `import { environment } from '../../environments/environment';`
2. ✅ Changed: `private apiUrl = environment.apiUrl;`

---

### 4. `netlify.toml` (NEW FILE - Created at root)

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build]
  command = "ng build --configuration production"
  publish = "dist/studentmanagement-frontend/browser"
```

**Purpose:** 
- Handles Angular routing on Netlify (prevents 404 on page refresh)
- Configures build command and output directory

---

### 5. `public/_redirects` (NEW FILE)

```
/*    /index.html   200
```

**Purpose:** Alternative way to handle Angular routing on Netlify

---

## 🎯 How It Works

### Development (`ng serve`)
```
Angular loads: environment.development.ts
API URL used: http://localhost:8080/api/students
```

### Production (`ng build --configuration production`)
```
Angular loads: environment.ts
API URL used: https://studentrecc-hfekdjescncbeec.centralindia-01.azurewebsites.net/api/students
```

---

## 📦 Deploy Commands

```bash
# 1. Build for production
ng build --configuration production

# 2. Commit changes
git add .
git commit -m "fix: configure Azure backend for production"
git push origin main

# 3. Netlify will auto-deploy, or drag-drop:
#    dist/studentmanagement-frontend/browser
```

---

## ✅ Verification

After deployment, open DevTools Network tab:

**Before:**
```
Request URL: http://localhost:8080/api/students
Status: (failed) net::ERR_CONNECTION_REFUSED
```

**After:**
```
Request URL: https://studentrecc-hfekdjescncbeec.centralindia-01.azurewebsites.net/api/students
Status: 200 OK
```

---

## 🛡️ Azure CORS Configuration Required

Your Azure backend must allow Netlify domain:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                    "http://localhost:4200",
                    "https://your-app-name.netlify.app"  // Add your Netlify URL
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
```

Don't forget to redeploy Azure backend after CORS changes!

---

## 📊 Summary

| What | Before | After |
|------|--------|-------|
| **API URL Source** | Hardcoded | Environment variable |
| **Development** | localhost | localhost ✅ |
| **Production** | localhost ❌ | Azure ✅ |
| **Configuration** | Single URL | Environment-based |
| **Maintainability** | Poor | Good |

---

## 🎉 Result

Your Angular app now:
✅ Uses localhost during development
✅ Uses Azure backend in production
✅ No more hardcoded URLs
✅ Production-ready configuration
✅ Easy to maintain and update

---

## 📝 If You Need to Change Backend URL Later

Just update `src/environments/environment.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-new-backend-url.com/api/students'
};
```

Then rebuild and redeploy!
