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

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and main nav */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                CookBook
              </span>
            </Link>
            
            <div className="hidden sm:ml-8 sm:flex sm:space-x-6">
              <NavLink to="/" icon={<HomeIcon className="h-5 w-5" />}>
                Home
              </NavLink>
              <NavLink to="/meal-planner" icon={<CalendarIcon className="h-5 w-5" />}>
                Meal Planner
              </NavLink>
              <NavLink to="/techniques" icon={<BookOpenIcon className="h-5 w-5" />}>
                Techniques
              </NavLink>
              <NavLink to="/community" icon={<UsersIcon className="h-5 w-5" />}>
                Community
              </NavLink>
            </div>
          </div>

          {/* Right side - Auth buttons */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <UserCircleIcon className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className="flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-sm transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-200"
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
              <MobileNavLink 
                to="/profile" 
                icon={<UserCircleIcon className="h-5 w-5" />}
              >
                Profile
              </MobileNavLink>
            ) : (
              <div className="mt-3 space-y-1">
                <MobileNavLink 
                  to="/login" 
                  icon={<ArrowRightOnRectangleIcon className="h-5 w-5" />}
                >
                  Login
                </MobileNavLink>
                <Link
                  to="/signup"
                  className="block w-full px-4 py-3 text-base font-medium text-center text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 mx-2 rounded-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Reusable NavLink component for desktop
const NavLink = ({ to, icon, children }) => (
  <Link
    to={to}
    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 rounded-md hover:bg-gray-50 transition-colors duration-200"
  >
    {icon}
    <span>{children}</span>
  </Link>
);

// Reusable MobileNavLink component
const MobileNavLink = ({ to, icon, children, active = false }) => (
  <Link
    to={to}
    className={`flex items-center px-4 py-3 text-base font-medium ${
      active 
        ? 'bg-indigo-50 text-indigo-700' 
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    <span className="mr-3">{icon}</span>
    {children}
  </Link>
);

export default Navbar;