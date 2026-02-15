import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import React from 'react'

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      await signup(name, email, password, confirmPassword);
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Error creating account. Please try again.');
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
              Create Account
            </h1>
            <p className="text-center text-pink-400 text-sm mb-6">Join Happy Tails! 🐾</p>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-1 focus:ring-pink-300 focus:border-pink-300"
                  placeholder="John Doe"
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-1 focus:ring-pink-300 focus:border-pink-300"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-1 focus:ring-pink-300 focus:border-pink-300"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-600 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-1 focus:ring-pink-300 focus:border-pink-300"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 rounded-md text-sm font-medium text-white bg-pink-500 hover:bg-pink-600"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          </div>
          
          <div className="bg-gradient-to-r from-pink-50 to-amber-50 px-6 py-4 border-t border-pink-100">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-pink-500 hover:text-pink-600 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
