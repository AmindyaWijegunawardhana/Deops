# Test the Backend Server

## Quick Test in Browser Console

Open your browser at **http://localhost:5173**, then press **F12** to open DevTools and paste this in the Console tab:

```javascript
// Test 1: Health Check
console.log('Testing health endpoint...');
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(data => console.log('✅ Health check:', data))
  .catch(e => console.error('❌ Health check failed:', e));

// Test 2: Signup
console.log('\nTesting signup...');
fetch('http://localhost:5000/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    confirmPassword: 'password123'
  })
})
  .then(r => r.json())
  .then(data => console.log('✅ Signup response:', data))
  .catch(e => console.error('❌ Signup failed:', e));
```

---

## Or Use the Form

1. Go to **http://localhost:5173**
2. Click "Create an account"
3. Fill in:
   - **Name:** Test User
   - **Email:** test@example.com
   - **Password:** password123
   - **Confirm:** password123
4. Click "Sign up"

It should work now!

---

## Server Status

The backend server is running on:
- 🚀 **URL:** http://localhost:5000
- 📍 **Health:** http://localhost:5000/api/health
- 🔐 **Signup:** http://localhost:5000/api/auth/signup
- 🔑 **Login:** http://localhost:5000/api/auth/login

All communication between your React frontend (port 5173) and backend (port 5000) should now work!
