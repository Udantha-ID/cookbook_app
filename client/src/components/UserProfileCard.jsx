import React from 'react';
import { User, Settings, LogOut, ChefHat } from 'lucide-react';

const UserProfileCard = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200 p-6 mb-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center shadow-inner">
            <User size={32} className="text-amber-600" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center border-2 border-white">
            <ChefHat size={12} className="text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-amber-900">John Doe</h3>
          <p className="text-sm text-amber-600">Cooking Enthusiast</p>
          <div className="mt-1 flex items-center space-x-2">
            <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
              Pro Chef
            </span>
            <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
              5 Years
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center space-x-3 px-4 py-2.5 text-sm font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl transition-all border border-amber-200/50 hover:border-amber-300">
          <Settings size={18} />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center justify-center space-x-3 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all border border-red-200/50 hover:border-red-300">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard; 