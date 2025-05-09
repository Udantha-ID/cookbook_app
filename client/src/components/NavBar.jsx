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
  const [scrolled, setScrolled] = useState(false);

  // Add scroll event listener
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-amber-50/90 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <svg className="h-8 w-8 text-amber-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5V7M15 11V13M15 17V19M5 5C5 6.10457 5.89543 7 7 7H17C18.1046 7 19 6.10457 19 5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M5 19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17H7C5.89543 17 5 17.8954 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M5 12C5 13.1046 5.89543 14 7 14H17C18.1046 14 19 13.1046 19 12C19 10.8954 18.1046 10 17 10H7C5.89543 10 5 10.8954 5 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">CookBook</span>
            </Link>
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex md:space-x-8 md:items-center">
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