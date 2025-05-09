import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

export default function UserProfileCard() {
  const navigate = useNavigate();

  // Sample user data (replace with auth context or API call)
  const user = {
    name: 'Jane Doe',
    avatar: '/api/placeholder/80/80',
    recipesPosted: 12,
    followers: 245,
    following: 180,
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex items-center space-x-4 hover:shadow-xl transition-shadow">
      <img
        src={user.avatar}
        alt="User avatar"
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
        <div className="flex space-x-4 text-sm text-gray-500">
          <span>{user.recipesPosted} Recipes</span>
          <span>{user.followers} Followers</span>
          <span>{user.following} Following</span>
        </div>
      </div>
      <button
        onClick={() => navigate('/profile')}
        className="flex items-center space-x-1 text-blue-500 hover:text-blue-700 transition-colors"
      >
        <User size={18} />
        <span>View Profile</span>
      </button>
    </div>
  );
}