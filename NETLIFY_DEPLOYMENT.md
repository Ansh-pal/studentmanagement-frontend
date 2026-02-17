# 🚀 Production Deployment Guide - Netlify

## ✅ Changes Made

### 1. Environment Configuration

**File: `src/environments/environment.development.ts`**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/students'
};
```

**File: `src/environments/environment.ts` (PRODUCTION)**
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://studentrecc-hfekdjescncbeecg.centralindia-01.azurewebsites.net/api/students'
};
```

### 2. Service Updated

**File: `src/app/services/student.service.ts`**
- ✅ Removed hardcoded `http://localhost:8080`
- ✅ Now imports and uses `environment.apiUrl`
- ✅ Automatically uses correct URL based on build configuration

---

## 🔧 How It Works

- **Development (`ng serve`)**: Uses `environment.development.ts` → `http://localhost:8080`
- **Production (`ng build`)**: Uses `environment.ts` → Azure backend URL

---

## 📦 Rebuild and Redeploy Steps

### Step 1: Clean Previous Build
```bash
rm -r -fo dist
```
Or on Windows:
```cmd
rmdir /s /q dist
```

### Step 2: Build for Production
```bash
ng build --configuration production
```

This will:
- ✅ Use `environment.ts` (production config)
- ✅ Connect to Azure backend
- ✅ Optimize and minify code
- ✅ Create production-ready build in `dist/` folder

### Step 3: Test Production Build Locally (Optional)
```bash
npx http-server dist/studentmanagement-frontend/browser -p 8080
```

Open http://localhost:8080 and verify it connects to Azure backend.

### Step 4: Deploy to Netlify

#### Option A: Drag and Drop (Quickest)
1. Open https://app.netlify.com
2. Go to your site
3. Drag the `dist/studentmanagement-frontend/browser` folder to Netlify
4. Wait for deployment

#### Option B: Git Push (Recommended)
```bash
git add .
git commit -m "fix: use Azure backend in production"
git push origin main
```

Netlify will auto-deploy if connected to your Git repo.

#### Option C: Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist/studentmanagement-frontend/browser
```

---

## 🔍 Verify Deployment

1. Open your Netlify site URL
2. Open Browser DevTools (F12)
3. Go to Network tab
4. Test the app (view students, add student, etc.)
5. Verify requests go to:
   ```
   https://studentrecc-hfekdjescncbeecg.centralindia-01.azurewebsites.net/api/students
   ```

---

## ⚙️ Configure Netlify Build Settings (If Using Git)

In Netlify Dashboard → Site Settings → Build & Deploy:

**Build Command:**
```bash
ng build --configuration production
```

**Publish Directory:**
```
dist/studentmanagement-frontend/browser
```

**Environment Variables:** (None needed - using environment.ts)

---

## 🛡️ IMPORTANT: Azure Backend CORS Configuration

Your Azure backend MUST allow requests from your Netlify domain!

### Update Azure CORS Settings

1. Go to Azure Portal
2. Navigate to your App Service
3. Go to **CORS** settings
4. Add your Netlify URL:
   ```
   https://your-app-name.netlify.app
   ```

### Or in Spring Boot Code:
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                    "http://localhost:4200",  // Development
                    "https://your-app-name.netlify.app"  // Production
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

**Then redeploy your Azure backend!**

---

## 🧪 Testing Checklist

After deployment, test:

- [ ] Open browser DevTools Network tab
- [ ] Verify API calls go to Azure (not localhost)
- [ ] Test viewing student list
- [ ] Test adding a new student
- [ ] Test editing a student
- [ ] Test deleting a student
- [ ] Check for CORS errors (should be none)
- [ ] Test on mobile device

---

## 🐛 Troubleshooting

### Issue: Still seeing localhost in Network tab
**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Verify you built with `--configuration production`

### Issue: CORS Error
**Solution:**
- Add Netlify URL to Azure CORS settings
- Redeploy Azure backend
- Clear cache and retry

### Issue: 404 on page refresh
**Solution:** Add `_redirects` file to Netlify:

Create `public/_redirects`:
```
/*    /index.html   200
```

Or create `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Issue: Build fails
**Solution:**
```bash
# Clean install
rm -r node_modules
rm package-lock.json
npm install
ng build --configuration production
```

---

## 📊 Command Summary

```bash
# Build for production
ng build --configuration production

# Test locally (optional)
npx http-server dist/studentmanagement-frontend/browser -p 8080

# Deploy via Git
git add .
git commit -m "fix: use Azure backend in production"
git push origin main

# Or deploy via Netlify CLI
netlify deploy --prod --dir=dist/studentmanagement-frontend/browser
```

---

## ✅ Expected Results

### Before Fix:
```
❌ http://localhost:8080/api/students
❌ ERR_CONNECTION_REFUSED
```

### After Fix:
```
✅ https://studentrecc-hfekdjescncbeecg.centralindia-01.azurewebsites.net/api/students
✅ 200 OK
```

---

## 🎯 Quick Deploy Now

Run these commands:

```bash
# 1. Build production
ng build --configuration production

# 2. Commit and push (if using Git)
git add .
git commit -m "fix: configure production environment for Azure backend"
git push origin main

# 3. Or drag-drop dist/studentmanagement-frontend/browser to Netlify
```

---

## 📝 What Changed Technically

| File | Change | Purpose |
|------|--------|---------|
| `environment.ts` | Set production API URL | Used by production builds |
| `environment.development.ts` | Set localhost API URL | Used by dev server |
| `student.service.ts` | Import & use `environment.apiUrl` | Dynamic URL based on environment |

---

**Your app is now production-ready! 🎉**

The production build will automatically use your Azure backend instead of localhost.
