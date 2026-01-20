import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// In-memory user storage for testing (would be database in production)
let users = [];
let userIdCounter = 1;

// Helper function to get safe error message
const getSafeError = (error) => {
  if (error.code === 'ER_DUP_ENTRY') {
    return 'Email already registered';
  }
  if (error.message.includes('connect')) {
    return 'Database connection failed. Is MySQL running?';
  }
  return error.message || 'An error occurred';
};

// Register endpoint
router.post('/signup', async (req, res) => {
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
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const newUser = {
      id: userIdCounter++,
      name,
      email,
      password: hashedPassword,
      created_at: new Date().toISOString()
    };
    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, email, name },
      process.env.JWT_SECRET || 'your_jwt_secret_key_here',
      { expiresIn: '7d' }
    );

    console.log(`✓ User created: ${email}`);

    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        name,
        email,
      },
      token,
    });
  } catch (error) {
    console.error('❌ Signup error:', error.message);
    res.status(500).json({ 
      message: 'Error creating account', 
      error: getSafeError(error)
    });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Find user
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET || 'your_jwt_secret_key_here',
      { expiresIn: '7d' }
    );

    console.log(`✓ User logged in: ${email}`);

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
    console.error('❌ Login error:', error.message);
    res.status(500).json({ 
      message: 'Error logging in', 
      error: getSafeError(error)
    });
  }
});

export default router;
