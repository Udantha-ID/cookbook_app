import React from 'react';
import Navbar from '../../components/Navbar';

export default function Profile() {
  const user = {
    name: 'Jane Doe',
    avatar: '/api/placeholder/120/120',
    bio: 'Passionate home cook sharing delicious recipes!',
    recipesPosted: 12,
    followers: 245,
    following: 180,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <img
            src={user.avatar}
            alt="User avatar"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-600 mb-4">{user.bio}</p>
          <div className="flex justify-center space-x-8 text-gray-500">
            <span>{user.recipesPosted} Recipes</span>
            <span>{user.followers} Followers</span>
            <span>{user.following} Following</span>
          </div>
        </div>
      </div>
    </div>
  );
}