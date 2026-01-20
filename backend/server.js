import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    memory: {
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + ' MB',
      heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
      heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
    }
  };
  res.status(200).json(healthcheck);
});

// Liveness probe (is the server running?)
app.get('/api/live', (req, res) => {
  res.status(200).json({ status: 'alive' });
});

// Readiness probe (is the server ready to accept requests?)
app.get('/api/ready', (req, res) => {
  res.status(200).json({ status: 'ready' });
});

// In-memory users storage
let users = [];
let userIdCounter = 1;

// Signup endpoint
app.post('/api/auth/signup', (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    
    console.log('📝 Signup request:', { name, email });
    
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }
    
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    const newUser = { id: userIdCounter++, name, email, password };
    users.push(newUser);
    
    res.status(201).json({
      message: 'Account created successfully',
      user: { id: newUser.id, name, email },
      token: 'test_token_' + newUser.id
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating account', error: error.message });
  }
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('🔑 Login request:', { email });
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    res.json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email },
      token: 'test_token_' + user.id
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 HAPPY TAILS SERVER');
  console.log('='.repeat(60));
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}/api`);
  console.log(`💚 Health: http://localhost:${PORT}/api/health`);
  console.log('='.repeat(60) + '\n');
});

server.on('error', (err) => {
  console.error('Server error:', err);
});
