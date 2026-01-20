import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running!' });
});

// Signup endpoint
app.post('/api/auth/signup', (req, res) => {
  console.log('Signup request received:', req.body);
  res.json({
    message: 'Account created successfully',
    user: { id: 1, name: req.body.name, email: req.body.email },
    token: 'test_token_12345'
  });
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  console.log('Login request received:', req.body);
  res.json({
    message: 'Login successful',
    user: { id: 1, name: 'Test', email: req.body.email },
    token: 'test_token_12345'
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📍 Try: http://localhost:${PORT}/api/health`);
});
