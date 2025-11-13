import { Link } from 'react-router-dom';
import PetBackground from './PetBackground';

// Pet paw print SVG component with pastel colors
const PawPrint = ({ className = '', size = 60, opacity = 0.15 }) => (
  <svg 
    className={`absolute ${className}`} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity }}
  >
    <path d="M12 6C10.3431 6 9 4.65685 9 3C9 1.34315 10.3431 0 12 0C13.6569 0 15 1.34315 15 3C15 4.65685 13.6569 6 12 6Z" fill="#F8BBD0"/>
    <path d="M6 10C4.34315 10 3 8.65685 3 7C3 5.34315 4.34315 4 6 4C7.65685 4 9 5.34315 9 7C9 8.65685 7.65685 10 6 10Z" fill="#FFE0B2"/>
    <path d="M18 10C16.3431 10 15 8.65685 15 7C15 5.34315 16.3431 4 18 4C19.6569 4 21 5.34315 21 7C21 8.65685 19.6569 10 18 10Z" fill="#FFCCBC"/>
    <path d="M7.5 14C5.84315 14 4.5 12.6569 4.5 11C4.5 9.34315 5.84315 8 7.5 8C9.15685 8 10.5 9.34315 10.5 11C10.5 12.6569 9.15685 14 7.5 14Z" fill="#C8E6C9"/>
    <path d="M16.5 14C14.8431 14 13.5 12.6569 13.5 11C13.5 9.34315 14.8431 8 16.5 8C18.1569 8 19.5 9.34315 19.5 11C19.5 12.6569 18.1569 14 16.5 14Z" fill="#B3E5FC"/>
    <path d="M12 24C10.9391 24 9.92172 23.5786 9.17157 22.8284C8.42143 22.0783 8 21.0609 8 20C8 18.9391 8.42143 17.9217 9.17157 17.1716C9.92172 16.4214 10.9391 16 12 16C13.0609 16 14.0783 16.4214 14.8284 17.1716C15.5786 17.9217 16 18.9391 16 20C16 21.0609 15.5786 22.0783 14.8284 22.8284C14.0783 23.5786 13.0609 24 12 24Z" fill="#E1BEE7"/>
  </svg>
);

// Background pattern component
const PetPatternBackground = () => (
  <div className="absolute inset-0 overflow-hidden -z-10">
    <PetBackground />
    
    {/* Decorative paw prints */}
    <PawPrint className="top-1/4 left-[15%]" size={80} opacity={0.15} />
    <PawPrint className="top-1/3 right-[15%] transform rotate-45" size={100} opacity={0.12} />
    <PawPrint className="bottom-1/4 left-[20%] transform -rotate-12" size={70} opacity={0.18} />
    <PawPrint className="bottom-1/3 right-[20%] transform rotate-12" size={90} opacity={0.15} />
    <PawPrint className="top-1/5 right-1/4" size={60} opacity={0.12} />
    <PawPrint className="top-3/4 left-1/3 transform -rotate-6" size={80} opacity={0.15} />
  </div>
);

export default function AuthLayout({ children, title, linkText, linkTo }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Pet pattern background */}
      <PetPatternBackground />
      
      <div className="w-full max-w-sm relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-pink-100/50">
          <div className="px-8 py-10">
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-400 to-amber-400 bg-clip-text text-transparent mb-2">
              {title}
            </h1>
            <p className="text-center text-pink-400 text-sm mb-6">Welcome to Happy Tails! 🐾</p>
            {children}
          </div>
          
          <div className="bg-gradient-to-r from-pink-50 to-amber-50 px-6 py-4 border-t border-pink-100/50">
            <p className="text-center text-sm text-gray-600">
              {linkText}{' '}
              <Link 
                to={linkTo} 
                className="font-medium bg-gradient-to-r from-pink-400 to-amber-400 bg-clip-text text-transparent hover:from-pink-500 hover:to-amber-500 transition-colors"
              >
                {linkTo === '/login' ? 'Sign in' : 'Sign up'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
