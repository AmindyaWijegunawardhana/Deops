import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Simple test routes
app.get('/', (req, res) => {
  res.json({ message: 'Server is working!' });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  console.log('Signup received:', { name, email });
  
  res.status(201).json({
    message: 'Account created successfully',
    user: { id: 1, name, email },
    token: 'test_token_12345'
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login received:', { email });
  
  res.json({
    message: 'Login successful',
    user: { id: 1, name: 'Test User', email },
    token: 'test_token_12345'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('\n✅ Server is listening on 0.0.0.0:' + PORT);
  console.log('📍 Test: http://localhost:' + PORT + '/api/health\n');
});
