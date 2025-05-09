import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Icons with modern styling
  const HomeIcon = () => (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );

  const CalendarIcon = () => (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );

  const BookOpenIcon = () => (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  );

  const UsersIcon = () => (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );

  const UserCircleIcon = () => (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const ArrowRightOnRectangleIcon = () => (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
      <polyline points="10 17 15 12 10 7"></polyline>
      <line x1="15" y1="12" x2="3" y2="12"></line>
    </svg>
  );

  const MenuIcon = () => (
    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );

  const CloseIcon = () => (
    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-white/60 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <svg className="h-8 w-8 text-indigo-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5V7M15 11V13M15 17V19M5 5C5 6.10457 5.89543 7 7 7H17C18.1046 7 19 6.10457 19 5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M5 19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17H7C5.89543 17 5 17.8954 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M5 12C5 13.1046 5.89543 14 7 14H17C18.1046 14 19 13.1046 19 12C19 10.8954 18.1046 10 17 10H7C5.89543 10 5 10.8954 5 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">CookBook</span>
            </Link>
          </div>
          
       
          <div className="hidden md:flex md:space-x-8 md:items-center">
            <Link 
              to="/" 
              className="relative group px-3 py-2 text-sm font-medium"
            >
              <span className="flex items-center text-gray-900">
                <HomeIcon />
                <span className="ml-1.5">Home</span>
              </span>
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform ease-out duration-300"></span>
            </Link>
            
            <Link 
              to="/meal-planner" 
              className="relative group px-3 py-2 text-sm font-medium"
            >
              <span className="flex items-center text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                <CalendarIcon />
                <span className="ml-1.5">Meal Planner</span>
              </span>
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform ease-out duration-300"></span>
            </Link>
            
            <Link 
              to="/techniques" 
              className="relative group px-3 py-2 text-sm font-medium"
            >
              <span className="flex items-center text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                <BookOpenIcon />
                <span className="ml-1.5">Techniques</span>
              </span>
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform ease-out duration-300"></span>
            </Link>
            
            <Link 
              to="/community" 
              className="relative group px-3 py-2 text-sm font-medium"
            >
              <span className="flex items-center text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                <UsersIcon />
                <span className="ml-1.5">Community</span>
              </span>
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform ease-out duration-300"></span>
            </Link>
          </div>

          {/* Right side - Auth buttons */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <UserCircleIcon />
                <span className="ml-1.5">Profile</span>
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600/30 bg-white/80 rounded-full hover:bg-indigo-50 transition-colors duration-300"
                >
                  <ArrowRightOnRectangleIcon />
                  <span className="ml-1.5">Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <span>Sign Up</span>
                  <svg className="ml-1.5 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg rounded-b-2xl overflow-hidden transition-all duration-300" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="flex items-center pl-3 pr-4 py-3 text-base font-medium text-indigo-600 rounded-lg bg-indigo-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <HomeIcon />
              <span className="ml-3">Home</span>
            </Link>
            <Link
              to="/meal-planner"
              className="flex items-center pl-3 pr-4 py-3 text-base font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <CalendarIcon />
              <span className="ml-3">Meal Planner</span>
            </Link>
            <Link
              to="/techniques"
              className="flex items-center pl-3 pr-4 py-3 text-base font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BookOpenIcon />
              <span className="ml-3">Techniques</span>
            </Link>
            <Link
              to="/community"
              className="flex items-center pl-3 pr-4 py-3 text-base font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <UsersIcon />
              <span className="ml-3">Community</span>
            </Link>
          </div>
          <div className="p-4 border-t border-gray-200 space-y-3">
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <UserCircleIcon />
                <span className="ml-2">Profile</span>
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-indigo-600 border border-indigo-600/30 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ArrowRightOnRectangleIcon />
                  <span className="ml-2">Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Sign Up</span>
                  <svg className="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;