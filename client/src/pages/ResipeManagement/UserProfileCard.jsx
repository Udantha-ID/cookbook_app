import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Settings, Lock, LogOut } from 'lucide-react';

export default function UserProfileCard() {
  const navigate = useNavigate();

  // Sample user data
  const user = {
    name: 'Jamie Oliver',
    username: '@jamieoliver',
    bio: 'Professional chef and food enthusiast. Sharing my passion for cooking!',
    stats: {
      recipes: 1243,
      followers: 365,
      following: 1
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 w-full max-w-xs border border-gray-100">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
        <p className="text-gray-500 text-sm">{user.username}</p>
      </div>
      
      {/* Bio */}
      <p className="text-gray-700 mb-6 text-sm">{user.bio}</p>
      
      <div className="border-t border-b border-gray-100 py-3 mb-6">
        {/* Stats */}
        <div className="flex justify-between text-center">
          <div>
            <p className="font-semibold text-gray-900">{user.stats.recipes}</p>
            <p className="text-xs text-gray-500">Recipes</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user.stats.followers}</p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user.stats.following}</p>
            <p className="text-xs text-gray-500">Following</p>
          </div>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="space-y-3">
        <button className="flex items-center w-full text-left text-sm p-2 hover:bg-gray-50 rounded">
          <Edit size={16} className="mr-2 text-gray-500" />
          Edit Profile
        </button>
        <button className="flex items-center w-full text-left text-sm p-2 hover:bg-gray-50 rounded">
          <Settings size={16} className="mr-2 text-gray-500" />
          Account Settings
        </button>
        <button className="flex items-center w-full text-left text-sm p-2 hover:bg-gray-50 rounded">
          <Lock size={16} className="mr-2 text-gray-500" />
          Privacy
        </button>
        <button className="flex items-center w-full text-left text-sm p-2 text-red-500 hover:bg-gray-50 rounded">
          <LogOut size={16} className="mr-2" />
          Log Out
        </button>
      </div>
    </div>
  );
}