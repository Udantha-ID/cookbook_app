import React from 'react';
import { Home, BookOpen, ChefHat, Heart, Bookmark, Clock, Search } from 'lucide-react';
import UserProfileCard from './UserProfileCard';

export default function LeftSideBar() {
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: BookOpen, label: 'Recipes', path: '/recipes' },
    { icon: ChefHat, label: 'Techniques', path: '/techniques' },
    { icon: Heart, label: 'Favorites', path: '/favorites' },
    { icon: Bookmark, label: 'Saved', path: '/saved' },
    { icon: Clock, label: 'Recent', path: '/recent' },
  ];

  return (
    <div className="w-80 fixed left-0 top-0 h-full bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="h-full flex flex-col">
        {/* Search Bar */}
        <div className="p-4 pt-20">
          <div className="relative">
            <input
              type="text"
              placeholder="Search recipes..."
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500" size={20} />
          </div>
        </div>

        {/* User Profile */}
        <div className="px-4">
          <UserProfileCard />
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-amber-900 mb-4 flex items-center">
              <span className="w-1 h-6 bg-amber-400 rounded-full mr-2"></span>
              Navigation
            </h2>
            <nav className="space-y-1">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.path}
                  className="flex items-center space-x-3 px-4 py-3 text-amber-700 hover:bg-amber-50 rounded-xl transition-all group"
                >
                  <item.icon size={20} className="text-amber-500 group-hover:text-amber-600 transition-colors" />
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Categories */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200 p-6">
            <h2 className="text-lg font-semibold text-amber-900 mb-4 flex items-center">
              <span className="w-1 h-6 bg-amber-400 rounded-full mr-2"></span>
              Categories
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {['Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Snacks', 'Drinks'].map((category, index) => (
                <button
                  key={index}
                  className="px-4 py-2.5 text-sm font-medium text-amber-700 bg-amber-50/50 hover:bg-amber-50 rounded-xl transition-all border border-amber-200/50 hover:border-amber-300"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}