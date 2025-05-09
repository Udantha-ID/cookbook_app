import React from 'react';
import CookingNews from '../pages/ResipeManagement/CookingNews';

export default function RightSideBar() {
  return (
    <div className="w-80 p-4 fixed right-0 top-0 h-full bg-gray-50 border-l border-gray-200 overflow-y-auto">
      <div className="pt-16 space-y-6"> {/* Adjusted padding instead of py-20 */}
        
        {/* Cooking News Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <CookingNews />
        </div>
        
        {/* Quick Links Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Links</h3>
          <div className="space-y-3">
            <a href="#" className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors">
              <span className="mr-2">🍳</span>
              <span>Popular Recipes</span>
            </a>
            <a href="#" className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors">
              <span className="mr-2">🥦</span>
              <span>Seasonal Ingredients</span>
            </a>
            <a href="#" className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors">
              <span className="mr-2">👨‍🍳</span>
              <span>Cooking Tips</span>
            </a>
          </div>
        </div>

        {/* Additional Section Example */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h3>
          <p className="text-xs text-gray-500 italic">No recent activity</p>
        </div>

      </div>
    </div>
  );
}