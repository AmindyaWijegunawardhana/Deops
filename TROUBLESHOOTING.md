# Failed to Fetch Error - Troubleshooting Guide

## The Problem
When you try to sign up, you see: **"Failed to fetch"**

This means your React app can't connect to the backend server.

## Solution Checklist

### Step 1: Check if the Server is Running

The backend server needs to be running on `http://localhost:5000`

**Check if the server is already running:**
- Open your browser and go to: `http://localhost:5000/api/health`
- If you see JSON response → Server is running ✓
- If you see "Can't reach this page" → Server is NOT running ✗

### Step 2: Start the Backend Server (If Not Running)

1. **Open a NEW PowerShell/Terminal window** (keep the current one with React running)

2. **Navigate to the server directory:**
   ```powershell
   cd c:\Users\NC MOBILE\CascadeProjects\windsurf-project-2\server
   ```

3. **Install dependencies (first time only):**
   ```powershell
   npm install
   ```

4. **Run the server:**
   ```powershell
   npm run dev
   ```

   You should see:
   ```
   ✓ Server is running on http://localhost:5000
   ✓ CORS enabled for http://localhost:5173
   ✓ API base URL: http://localhost:5000/api
   ```

### Step 3: Verify MySQL is Running

The server needs MySQL to be running to accept signups.

**Check if MySQL is running:**
1. Open Services (press `Win + R`, type `services.msc`)
2. Look for "MySQL80" or "MySQL" in the list
3. If it says "Running" → MySQL is running ✓
4. If it says "Stopped" → Click it and press the green Play button

**Alternative - Start MySQL from Command Line:**
```powershell
# For MySQL 8.0
net start MySQL80

# If that doesn't work, find your MySQL service name:
Get-Service | findstr -i mysql
```

### Step 4: Verify Database Exists

Run this in PowerShell to check if the database exists:

```powershell
cd c:\Users\NC MOBILE\CascadeProjects\windsurf-project-2\server
node check.js
```

This will show you:
- ✓ If .env file is configured
- ✓ If MySQL is reachable
- ✓ If the `happy_tails` database exists
- ✓ What tables are in the database

**If database doesn't exist, create it:**
```powershell
mysql -u root -p < database\schema.sql
```
(Enter your MySQL password when prompted)

### Step 5: Check .env Configuration

Make sure `server\.env` has your correct MySQL password:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_actual_mysql_password  ← Change this!
DB_NAME=happy_tails
SERVER_PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

### Step 6: Test the API Directly

Once the server is running, test the signup endpoint:

**Using PowerShell:**
```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "password123"
    confirmPassword = "password123"
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "http://localhost:5000/api/auth/signup" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

**Expected response:**
```json
{
  "message": "Account created successfully",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**If you get an error:** The error message will tell you what's wrong.

## Common Issues & Solutions

### ❌ "Error: connect ECONNREFUSED"
**Problem:** MySQL is not running
**Solution:** 
- Start MySQL service: `net start MySQL80`
- Or open Services and find MySQL and click the Play button

### ❌ "Error: Access denied for user 'root'@'localhost'"
**Problem:** Wrong MySQL password in .env
**Solution:**
1. Check what password you set for MySQL during installation
2. Update `DB_PASSWORD` in `server\.env`
3. Restart the server: `npm run dev`

### ❌ "Error: Unknown database 'happy_tails'"
**Problem:** Database schema hasn't been created
**Solution:**
```powershell
cd c:\Users\NC MOBILE\CascadeProjects\windsurf-project-2\server
mysql -u root -p < database\schema.sql
```

### ❌ "EADDRINUSE: address already in use :::5000"
**Problem:** Port 5000 is already in use
**Solution:**
1. Kill the process using port 5000:
   ```powershell
   Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
   ```
2. Or change `SERVER_PORT` in `server\.env` to a different port (e.g., 5001)

### ❌ "Failed to fetch" in browser
**Problem:** Frontend can't reach backend
**Solution:**
1. Verify server is running on http://localhost:5000/api/health
2. Check that frontend .env has: `VITE_API_URL=http://localhost:5000/api`
3. Make sure both are running on the same machine
4. Check Windows Firewall isn't blocking port 5000

## Quick Start Process

Once everything is set up, here's the daily startup process:

**Terminal 1 - Start MySQL:**
```powershell
net start MySQL80
```

**Terminal 2 - Start Backend Server:**
```powershell
cd c:\Users\NC MOBILE\CascadeProjects\windsurf-project-2\server
npm run dev
```

**Terminal 3 - Start Frontend:**
```powershell
cd c:\Users\NC MOBILE\CascadeProjects\windsurf-project-2
npm run dev
```

Then open: `http://localhost:5173`

## Still Not Working?

Check the server console for error messages. Common things to look for:

```
✗ Database connection failed → MySQL not running or wrong credentials
✗ CORS error in browser console → Server not running
✗ 404 Not Found → Wrong API URL or endpoint
✗ 500 Internal Server Error → Check server console for details
```

If you see specific errors, they will guide you to the solution!
