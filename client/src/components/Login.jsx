import { useState } from 'react';
import { ChefHat, Mail, Lock, User, Utensils, ArrowRight, Coffee } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const toggleView = () => {
    setIsLogin(!isLogin);
  };
  
  const handleSubmit = () => {
    // This would handle login/signup logic in a real application
    console.log(isLogin ? 'Logging in' : 'Signing up', { email, password, name });
  };
  
  return (
    <div className="min-h-screen w-full bg-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side - Image & Branding */}
        <div className="lg:w-1/2 bg-emerald-800 text-white p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10">
              <Coffee size={80} />
            </div>
            <div className="absolute bottom-40 right-10">
              <Utensils size={60} />
            </div>
            <div className="absolute top-40 right-20">
              <ChefHat size={70} />
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-8">
              <ChefHat size={32} className="mr-3" />
              <h1 className="text-3xl font-bold">Culinary Connect</h1>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              {isLogin ? "Welcome Back Chef!" : "Join Our Community"}
            </h2>
            <p className="text-lg opacity-90 mb-10">
              {isLogin 
                ? "Sign in to access your saved recipes, meal plans, and connect with fellow food enthusiasts."
                : "Create an account to save recipes, build meal plans, and join a community of passionate home chefs."}
            </p>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center">
                <Utensils size={20} />
              </div>
              <div>
                <h3 className="font-semibold">100,000+ Recipes</h3>
                <p className="text-sm opacity-80">Explore dishes from around the world</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Vibrant Community</h3>
                <p className="text-sm opacity-80">Connect with fellow cooking enthusiasts</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Form */}
        <div className="lg:w-1/2 p-8 lg:p-12">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? "Sign In" : "Create Account"}
            </h2>
            <p className="text-gray-600">
              {isLogin 
                ? "Enter your credentials to access your account" 
                : "Fill in your details to join our culinary community"}
            </p>
          </div>
          
          <div className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    id="name" 
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition"
                    placeholder="John Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input 
                  type="email" 
                  id="email" 
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input 
                  type="password" 
                  id="password" 
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    id="remember-me" 
                    type="checkbox" 
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-emerald-700 hover:text-emerald-600">
                    Forgot password?
                  </a>
                </div>
              </div>
            )}
            
            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300"
            >
              <span className="mr-2">{isLogin ? "Sign In" : "Create Account"}</span>
              <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={toggleView} 
                className="font-medium text-emerald-700 hover:text-emerald-600"
              >
                {isLogin ? "Sign up now" : "Sign in"}
              </button>
            </p>
          </div>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 flex items-center justify-center text-gray-700"
              >
                <svg className="h-5 w-5 mr-2" fill="#4285F4" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                </svg>
                Google
              </button>

              <button
                className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 flex items-center justify-center text-gray-700"
              >
                <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}