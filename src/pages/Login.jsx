import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';

// Simple cat face illustration component with pastel colors
const CatFace = () => (
  <div className="w-16 h-16 mx-auto mb-3 relative">
    {/* Face */}
    <div className="w-full h-full rounded-full bg-pink-100 border-2 border-pink-200 relative overflow-hidden">
      {/* Ears */}
      <div className="absolute -top-1 -left-1 w-5 h-5 bg-pink-200 border-2 border-pink-300 rounded-tl-full transform -rotate-12"></div>
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-200 border-2 border-pink-300 rounded-tr-full transform rotate-12"></div>
      
      {/* Eyes */}
      <div className="absolute top-5 left-3 w-3 h-3 bg-pink-300 rounded-full flex items-center justify-center">
        <div className="w-1 h-1 bg-pink-800 rounded-full"></div>
      </div>
      <div className="absolute top-5 right-3 w-3 h-3 bg-pink-300 rounded-full flex items-center justify-center">
        <div className="w-1 h-1 bg-pink-800 rounded-full"></div>
      </div>
      
      {/* Nose and mouth */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="w-2 h-1.5 bg-pink-300 rounded-b-full"></div>
        <div className="w-0.5 h-0.5 bg-pink-600 rounded-full mt-0.5"></div>
      </div>
      
      {/* Whiskers */}
      <div className="absolute top-8 left-1 w-1 h-0.5 bg-pink-300 transform rotate-12"></div>
      <div className="absolute top-8.5 left-1 w-1 h-0.5 bg-pink-300"></div>
      <div className="absolute top-9 left-1 w-1 h-0.5 bg-pink-300 transform -rotate-12"></div>
      
      <div className="absolute top-8 right-1 w-1 h-0.5 bg-pink-300 transform -rotate-12"></div>
      <div className="absolute top-8.5 right-1 w-1 h-0.5 bg-pink-300"></div>
      <div className="absolute top-9 right-1 w-1 h-0.5 bg-pink-300 transform rotate-12"></div>
    </div>
  </div>
);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call the login API
      await login(email, password);
      // Redirect to home page after successful login
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back!"
      linkText="Create an account"
      linkTo="/signup"
    >
      <div className="text-center">
        <CatFace />
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 mt-2">
        <div className="space-y-1">
          <label htmlFor="email" className="block text-xs font-medium text-gray-600">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="h-4 w-4 text-pink-400" />
            </div>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-sm block w-full pl-9 pr-3 py-1.5 border border-pink-200 rounded-lg focus:ring-1 focus:ring-pink-300 focus:border-pink-300 text-gray-700 placeholder-gray-400"
              placeholder="you@example.com"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-xs font-medium text-gray-600">
              Password
            </label>
            <Link to="/forgot-password" className="text-xs text-pink-500 hover:text-pink-400">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-4 w-4 text-pink-400" />
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-sm block w-full pl-9 pr-3 py-1.5 border border-pink-200 rounded-lg focus:ring-1 focus:ring-pink-300 focus:border-pink-300 text-gray-700 placeholder-gray-400"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="pt-1">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
