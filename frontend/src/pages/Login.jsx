import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const auth = useAuth(); // Access the context

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Validation
    if (!email || !password) {
      return setError('Please fill in all fields');
    }

    // 2. Clear previous errors and start loading
    setError('');
    setIsLoading(true);
    
    try {
      // 3. Ensure login exists on the context before calling
      if (!auth || !auth.login) {
        throw new Error("Auth context is not properly configured.");
      }

      await auth.login(email, password);
      
      // 4. Redirect on success
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      // Handle Firebase-style or Custom API error messages
      setError(err.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-50 via-amber-50 to-green-50">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100">
          <div className="px-8 py-10">
            <h1 className="text-3xl font-bold text-center text-pink-500 mb-2">
              Welcome Back!
            </h1>
            <p className="text-center text-pink-400 text-sm mb-6">Welcome to Happy Tails! 🐾</p>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-4 text-sm">
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none transition-all"
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-xs font-medium text-gray-600 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none transition-all"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-md text-sm font-medium text-white transition-colors 
                  ${isLoading ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-600'}`}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 border-t border-pink-100">
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-pink-500 hover:text-pink-600 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}