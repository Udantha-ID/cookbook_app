import React from 'react';
import UserProfileCard from '../pages/ResipeManagement/UserProfileCard';
import { BookOpen, ChefHat, Heart, BookmarkCheck, Clock, Award } from 'lucide-react';

export default function LeftSideBar() {
  // Menu items
  const menuItems = [
    { 
      icon: <BookOpen size={18} />, 
      label: 'Recipe Feed',
      active: true
    },
    { 
      icon: <ChefHat size={18} />, 
      label: 'My Recipes'
    },
    { 
      icon: <Heart size={18} />, 
      label: 'Favorites'
    },
    { 
      icon: <BookmarkCheck size={18} />, 
      label: 'Saved'
    },
    { 
      icon: <Clock size={18} />, 
      label: 'Recently Viewed'
    }
  ];

  // Categories
  const categories = [
    { name: 'Breakfast', count: 24, color: 'from-amber-500 to-amber-600' },
    { name: 'Lunch', count: 18, color: 'from-orange-500 to-orange-600' },
    { name: 'Dinner', count: 32, color: 'from-red-500 to-red-600' },
    { name: 'Desserts', count: 45, color: 'from-pink-500 to-pink-600' },
    { name: 'Drinks', count: 12, color: 'from-purple-500 to-purple-600' }
  ];

  return (
    <div className="w-80 p-4 fixed left-0 top-0 h-full bg-gradient-to-b from-amber-50/80 to-orange-50/80 border-r border-amber-100 overflow-y-auto">
      <div className="pt-16 pb-4 space-y-6">
        {/* User Profile Card */}
        <UserProfileCard />
        
        {/* Main Navigation */}
        <div className="bg-white rounded-xl shadow-sm p-2 border border-amber-100">
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <a 
                key={index}
                href="#"
                className={`flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' 
                    : 'text-gray-700 hover:bg-amber-50'
                }`}
              >
                <span className={`mr-3 ${item.active ? 'text-white' : 'text-amber-500'}`}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
                {item.active && (
                  <span className="ml-auto bg-white/20 text-xs px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </a>
            ))}
          </nav>
        </div>
        
        {/* Categories */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-amber-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-semibold text-amber-900">Categories</h3>
            <a href="#" className="text-xs text-amber-600 hover:text-amber-800 font-medium">View All</a>
          </div>
          
          <div className="space-y-2">
            {categories.map((category, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center justify-between p-3 bg-white hover:bg-amber-50 rounded-lg border border-amber-100 transition-colors group"
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${category.color} mr-3 flex items-center justify-center text-white transition-transform group-hover:scale-110`}>
                    <span className="font-bold text-xs">{category.name.charAt(0)}</span>
                  </div>
                  <span className="font-medium text-gray-800">{category.name}</span>
                </div>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">{category.count}</span>
              </a>
            ))}
          </div>
        </div>
        
        {/* Top Chef */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-amber-100">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-3">
            <div className="flex items-center">
              <Award size={20} className="text-white mr-2" />
              <h3 className="text-md font-semibold text-white">Top Chef of the Month</h3>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-tr from-amber-400 to-orange-500 ring-2 ring-white shadow-md">
                <div className="flex items-center justify-center w-full h-full text-white font-bold text-lg">
                  M
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Maria Johnson</h4>
                <p className="text-sm text-amber-600">48 recipes • 412 likes</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="aspect-square rounded-md bg-amber-100 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-200 to-amber-300 text-amber-600">
                    <ChefHat size={14} />
                  </div>
                </div>
              ))}
            </div>
            <a
              href="#"
              className="text-xs text-center block w-full py-1.5 border border-amber-200 rounded-lg text-amber-700 hover:bg-amber-50 transition-colors"
            >
              View Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}