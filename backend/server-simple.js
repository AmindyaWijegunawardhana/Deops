import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://13.53.137.119:5173', 'http://13.53.137.119:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());

// Simple in-memory user storage for testing
let users = [];
let userIdCounter = 1;

// Auth routes without database dependency
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create user (in real app, hash password)
    const user = {
      id: userIdCounter++,
      name,
      email,
      password, // In production, this should be hashed!
    };
    users.push(user);

    // Generate simple JWT-like token
    const token = Buffer.from(JSON.stringify({ id: user.id, email, name })).toString('base64');

    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: user.id,
        name,
        email,
      },
      token,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      message: 'Error creating account', 
      error: error.message 
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Find user
    const user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate simple JWT-like token
    const token = Buffer.from(JSON.stringify({ id: user.id, email, name: user.name })).toString('base64');

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is running (in-memory mode - no database)',
    timestamp: new Date().toISOString(),
    users: users.length
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 HAPPY TAILS SERVER');
  console.log('='.repeat(60));
  console.log(`✓ Server is running on http://13.53.137.119:${PORT}`);
  console.log(`✓ CORS enabled for http://13.53.137.119:5173`);
  console.log(`✓ API base URL: http://13.53.137.119:${PORT}/api`);
  console.log(`✓ Health check: http://13.53.137.119:${PORT}/api/health`);
  console.log('\n📝 MODE: In-memory storage (no database)');
  console.log('   Data will be lost when server restarts');
  console.log('   To use MySQL, update .env and restart\n');
  console.log('='.repeat(60) + '\n');
});
