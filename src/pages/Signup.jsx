import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';

// Simple dog face illustration component with pastel colors
const DogFace = () => (
  <div className="w-16 h-16 mx-auto mb-3 relative">
    {/* Face */}
    <div className="w-full h-full rounded-full bg-pink-100 border-2 border-pink-200 relative overflow-hidden">
      {/* Ears */}
      <div className="absolute -top-2 -left-1 w-6 h-6 bg-pink-200 border-2 border-pink-300 rounded-full transform -rotate-12"></div>
      <div className="absolute -top-2 -right-1 w-6 h-6 bg-pink-200 border-2 border-pink-300 rounded-full transform rotate-12"></div>
      
      {/* Eyes */}
      <div className="absolute top-5 left-2 w-3 h-3 bg-pink-300 rounded-full flex items-center justify-center">
        <div className="w-1 h-1 bg-pink-800 rounded-full"></div>
      </div>
      <div className="absolute top-5 right-2 w-3 h-3 bg-pink-300 rounded-full flex items-center justify-center">
        <div className="w-1 h-1 bg-pink-800 rounded-full"></div>
      </div>
      
      {/* Nose */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-2 h-1.5 bg-pink-400 rounded-b-full"></div>
      
      {/* Mouth */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-8 h-3 border-b-2 border-pink-300 rounded-b-full"></div>
      
      {/* Tongue */}
      <div className="absolute top-11 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-pink-200 rounded-b-full"></div>
    </div>
  </div>
);

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }

    setIsLoading(true);
    
    try {
      // Call the signup API
      await signup(name, email, password, confirmPassword);
      // Redirect to home page after successful signup
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Error creating account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create Account"
      linkText="Already have an account? Sign in"
      linkTo="/login"
    >
      <div className="text-center">
        <DogFace />
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        
        <div className="space-y-1">
          <label htmlFor="name" className="block text-xs font-medium text-gray-600">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-4 w-4 text-pink-400" />
            </div>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-sm block w-full pl-9 pr-3 py-1.5 border border-pink-200 rounded-lg focus:ring-1 focus:ring-pink-300 focus:border-pink-300 text-gray-700 placeholder-gray-400"
              placeholder="John Doe"
              disabled={isLoading}
            />
          </div>
        </div>
        
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
          <label htmlFor="password" className="block text-xs font-medium text-gray-600">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-4 w-4 text-pink-400" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-sm block w-full pl-9 pr-9 py-1.5 border border-pink-200 rounded-lg focus:ring-1 focus:ring-pink-300 focus:border-pink-300 text-gray-700 placeholder-gray-400"
              placeholder="••••••••"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-pink-400 hover:text-pink-500"
              tabIndex="-1"
            >
              {showPassword ? (
                <FiEyeOff className="h-4 w-4" />
              ) : (
                <FiEye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        
        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-600">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-4 w-4 text-pink-400" />
            </div>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="text-sm block w-full pl-9 pr-9 py-1.5 border border-pink-200 rounded-lg focus:ring-1 focus:ring-pink-300 focus:border-pink-300 text-gray-700 placeholder-gray-400"
              placeholder="••••••••"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-pink-400 hover:text-pink-500"
              tabIndex="-1"
            >
              {showConfirmPassword ? (
                <FiEyeOff className="h-4 w-4" />
              ) : (
                <FiEye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        
        <div className="pt-1">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
