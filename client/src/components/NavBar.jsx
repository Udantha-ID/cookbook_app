import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  HomeIcon,
  CalendarIcon,
  BookOpenIcon,
  UsersIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and main nav */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                CookBook
              </span>
            </Link>
            
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <UnderlineLink to="/" icon={<HomeIcon className="h-5 w-5" />}>
                Home
              </UnderlineLink>
              <UnderlineLink to="/meal-planner" icon={<CalendarIcon className="h-5 w-5" />}>
                Meal Planner
              </UnderlineLink>
              <UnderlineLink to="/techniques" icon={<BookOpenIcon className="h-5 w-5" />}>
                Techniques
              </UnderlineLink>
              <UnderlineLink to="/community" icon={<UsersIcon className="h-5 w-5" />}>
                Community
              </UnderlineLink>
            </div>
          </div>

          {/* Right side - Auth buttons */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isLoggedIn ? (
              <button
                onClick={handleLoginToggle}
                className="p-2 rounded-full text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 group relative"
              >
                <UserCircleIcon className="h-5 w-5" />
                <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-amber-600 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></span>
              </button>
            ) : (
              <button
                onClick={handleLoginToggle}
                className="flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium text-amber-600 hover:bg-amber-50 transition-colors duration-200 relative group"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span>Login</span>
                <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-amber-600 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-amber-600 hover:bg-amber-50 focus:outline-none transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white/95 backdrop-blur-md" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <MobileNavLink 
              to="/" 
              icon={<HomeIcon className="h-5 w-5" />}
              active={true}
            >
              Home
            </MobileNavLink>
            <MobileNavLink 
              to="/meal-planner" 
              icon={<CalendarIcon className="h-5 w-5" />}
            >
              Meal Planner
            </MobileNavLink>
            <MobileNavLink 
              to="/techniques" 
              icon={<BookOpenIcon className="h-5 w-5" />}
            >
              Techniques
            </MobileNavLink>
            <MobileNavLink 
              to="/community" 
              icon={<UsersIcon className="h-5 w-5" />}
            >
              Community
            </MobileNavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isLoggedIn ? (
              <button
                onClick={handleLoginToggle}
                className="w-full flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-600"
              >
                <UserCircleIcon className="h-5 w-5 mr-3" />
                Profile
              </button>
            ) : (
              <button
                onClick={handleLoginToggle}
                className="w-full flex items-center px-4 py-3 text-base font-medium text-amber-600 hover:bg-amber-50"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};


const UnderlineLink = ({ to, icon, children }) => (
  <Link
    to={to}
    className="flex flex-col items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors duration-200 relative group"
  >
    <div className="flex items-center">
      {icon}
      <span className="ml-1.5">{children}</span>
    </div>
    <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-amber-600 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></span>
  </Link>
);

// Reusable MobileNavLink component
const MobileNavLink = ({ to, icon, children, active = false }) => (
  <Link
    to={to}
    className={`flex items-center px-4 py-3 text-base font-medium ${
      active 
        ? 'bg-amber-50 text-amber-600' 
        : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'
    }`}
  >
    <span className="mr-3">{icon}</span>
    {children}
  </Link>
);

export default Navbar;