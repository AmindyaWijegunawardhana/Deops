# Quick Start Guide

## The "Failed to Fetch" Error - Quick Fix

The issue is that your **backend server isn't running**.

### 🚀 Start Backend Server (New Terminal)

```powershell
cd c:\Users\NC MOBILE\CascadeProjects\windsurf-project-2\server
npm install
npm run dev
```

You should see:
```
✓ Server is running on http://localhost:5000
```

### ✓ Verify It's Working

Open your browser and visit: `http://localhost:5000/api/health`

You should see:
```json
{
  "message": "Server is running",
  "database": "Connected"
}
```

### 🔄 Now Try Signing Up

1. Go back to your React app at `http://localhost:5173`
2. Try signing up again
3. It should work now!

---

## Full Startup (First Time)

### 1️⃣ Start MySQL
```powershell
net start MySQL80
```

### 2️⃣ Create Database (First Time Only)
```powershell
cd c:\Users\NC MOBILE\CascadeProjects\windsurf-project-2\server
mysql -u root -p < database\schema.sql
```
(Enter your MySQL password when prompted)

### 3️⃣ Install & Start Backend Server
```powershell
cd server
npm install
npm run dev
```

### 4️⃣ Start Frontend (in another terminal)
```powershell
cd c:\Users\NC MOBILE\CascadeProjects\windsurf-project-2
npm run dev
```

### 5️⃣ Open Browser
Go to: `http://localhost:5173`

---

## Troubleshooting Commands

```powershell
# Test if MySQL is running
ping localhost:3306

# Check MySQL service status
Get-Service MySQL80

# Start MySQL
net start MySQL80

# Check what's listening on port 5000
netstat -ano | findstr :5000

# Verify database schema
mysql -u root -p -e "USE happy_tails; SHOW TABLES;"

# Run auto-check
cd server
npm run check
```

---

## Files You Created/Modified

- `server/` - New backend directory
- `server/server.js` - Express server
- `server/routes/auth.js` - Login/Signup endpoints
- `server/config/database.js` - MySQL connection
- `server/database/schema.sql` - Database tables
- `server/.env` - Database credentials
- `src/contexts/AuthContext.jsx` - Updated for API calls
- `src/pages/Signup.jsx` - Uses real API
- `src/pages/Login.jsx` - Uses real API

---

## Default Credentials (Update These!)

**MySQL:**
- Host: localhost
- Port: 3306
- User: root
- Password: password (change to your actual password)
- Database: happy_tails

**Server:**
- URL: http://localhost:5000
- Health: http://localhost:5000/api/health

---

**Need help?** Check `TROUBLESHOOTING.md` for detailed solutions.
