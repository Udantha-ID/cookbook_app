import React from 'react';
import CookingNews from '../pages/ResipeManagement/CookingNews';
import { TrendingUp, Flame, BarChart2, Calendar, AlertCircle, Coffee, Clock } from 'lucide-react';

export default function RightSideBar() {
  // Trending tags
  const trendingTags = [
    { name: 'summer', count: 156 },
    { name: 'quick', count: 89 },
    { name: 'vegetarian', count: 64 },
    { name: 'dessert', count: 47 },
    { name: 'pasta', count: 32 }
  ];

  // Popular recipes
  const popularRecipes = [
    { 
      title: 'Honey Glazed Salmon',
      likes: 423,
      time: '30 min',
      difficulty: 'Medium'
    },
    { 
      title: 'Chocolate Lava Cake',
      likes: 398,
      time: '45 min',
      difficulty: 'Hard'
    },
    { 
      title: 'Avocado Toast',
      likes: 352,
      time: '10 min',
      difficulty: 'Easy'
    }
  ];

  return (
    <div className="w-80 p-4 fixed right-0 top-0 h-full bg-gradient-to-b from-amber-50/80 to-orange-50/80 border-l border-amber-100 overflow-y-auto">
      <div className="pt-16 pb-4 space-y-6">
        
        {/* Cooking News Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-amber-100">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-3">
            <div className="flex items-center">
              <AlertCircle size={20} className="text-white mr-2" />
              <h3 className="text-md font-semibold text-white">Cooking News</h3>
            </div>
          </div>
          <div className="p-4">
            <CookingNews />
          </div>
        </div>
        
        {/* Trending Tags */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-amber-100">
          <div className="flex items-center mb-4">
            <TrendingUp size={18} className="text-amber-600 mr-2" />
            <h3 className="text-md font-semibold text-amber-900">Trending Tags</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag, index) => (
              <a 
                key={index}
                href="#" 
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-full text-sm transition-colors flex items-center"
              >
                #{tag.name}
                <span className="ml-1.5 bg-white text-amber-500 text-xs px-1.5 py-0.5 rounded-full">
                  {tag.count}
                </span>
              </a>
            ))}
          </div>
        </div>
        
        {/* Popular Recipes */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-amber-100">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-3">
            <div className="flex items-center">
              <Flame size={18} className="text-white mr-2" />
              <h3 className="text-md font-semibold text-white">Popular Now</h3>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {popularRecipes.map((recipe, index) => (
              <a key={index} href="#" className="block">
                <div className="flex items-center p-3 rounded-lg hover:bg-amber-50 transition-colors border border-amber-100">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center text-amber-700 mr-3">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{recipe.title}</h4>
                    <div className="flex items-center mt-1">
                      <span className="flex items-center text-xs text-amber-600">
                        <Flame size={12} className="mr-1" />
                        {recipe.likes}
                      </span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="flex items-center text-xs text-gray-500">
                        <Clock size={12} className="mr-1" />
                        {recipe.time}
                      </span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        recipe.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {recipe.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
            <a
              href="#"
              className="text-center block w-full py-2 mt-2 border border-amber-200 rounded-lg text-amber-700 hover:bg-amber-50 transition-colors text-sm font-medium"
            >
              View All Popular Recipes
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-amber-100">
          <div className="flex items-center mb-3">
            <Calendar size={18} className="text-amber-600 mr-2" />
            <h3 className="text-md font-semibold text-amber-900">Seasonal Cooking</h3>
          </div>
          <div className="space-y-2.5">
            <a href="#" className="flex items-center px-3 py-2 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors group">
              <span className="mr-2.5 text-xl group-hover:scale-110 transition-transform">🍎</span>
              <span className="text-sm text-amber-900 font-medium">Fall Favorites</span>
            </a>
            <a href="#" className="flex items-center px-3 py-2 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors group">
              <span className="mr-2.5 text-xl group-hover:scale-110 transition-transform">🎃</span>
              <span className="text-sm text-amber-900 font-medium">Halloween Treats</span>
            </a>
            <a href="#" className="flex items-center px-3 py-2 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors group">
              <span className="mr-2.5 text-xl group-hover:scale-110 transition-transform">🥧</span>
              <span className="text-sm text-amber-900 font-medium">Thanksgiving Ideas</span>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-amber-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <BarChart2 size={18} className="text-amber-600 mr-2" />
              <h3 className="text-md font-semibold text-amber-900">Your Stats</h3>
            </div>
            <span className="text-xs text-amber-500 font-medium">This Month</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
              <div className="text-2xl font-bold text-amber-700 mb-1">12</div>
              <div className="text-xs text-gray-500">Recipes Saved</div>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
              <div className="text-2xl font-bold text-amber-700 mb-1">3</div>
              <div className="text-xs text-gray-500">Recipes Created</div>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
              <div className="text-2xl font-bold text-amber-700 mb-1">48</div>
              <div className="text-xs text-gray-500">Likes Given</div>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
              <div className="text-2xl font-bold text-amber-700 mb-1">820</div>
              <div className="text-xs text-gray-500">Minutes Cooked</div>
            </div>
          </div>
          <a
            href="#"
            className="text-xs text-center block w-full py-1.5 text-amber-600 hover:text-amber-800 transition-colors"
          >
            View Detailed Analytics →
          </a>
        </div>

      </div>
    </div>
  );
}