import { Link, useLocation } from 'react-router-dom'
import React from 'react';

const Layout = ({ children }) => {
  const location = useLocation()
  
  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-container mx-auto px-container">
          <div className="flex justify-between items-center h-10">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-1.5">
              <span className="text-lg">🐾</span>
              <span className="text-base font-heading font-bold text-primary">Happy Tails</span>
            </Link>
            
            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              <Link 
                to="/" 
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive('/') 
                    ? 'bg-primary text-white' 
                    : 'text-text-secondary hover:bg-primary-50 hover:text-primary'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/care" 
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive('/care') 
                    ? 'bg-primary text-white' 
                    : 'text-text-secondary hover:bg-primary-50 hover:text-primary'
                }`}
              >
                Care
              </Link>
              <Link 
                to="/about" 
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive('/about') 
                    ? 'bg-primary text-white' 
                    : 'text-text-secondary hover:bg-primary-50 hover:text-primary'
                }`}
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-text-primary text-white mt-16">
        <div className="max-w-container mx-auto px-container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl">🐾</span>
                <span className="text-xl font-heading font-bold">Happy Tails</span>
              </div>
              <p className="text-neutral-400">
                Helping pets find their forever homes since 2024.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-heading font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/care" className="hover:text-white transition-colors">Pet Care</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-heading font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-neutral-400">
                <li>📧 info@happytails.com</li>
                <li>📞 (555) 123-4567</li>
                <li>📍 123 Pet Street, Animal City</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-neutral-400">
            <p>&copy; 2024 Happy Tails. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
