import React from 'react';
import RecipeForm from './ResipeForm';
import RecipeCard from './ResipeCard';
import Navbar from '../../components/Navbar';
import CookingNews from './CookingNews';
import UserProfileCard from './UserProfileCard';

function HomeFeed() {
  // Sample recipe data
  const recipes = [
    {
      id: '1',
      title: 'Chocolate Chip Cookies',
      description: 'Soft and chewy cookies with melty chocolate chips. Perfect for any occasion!',
      author: 'Mike Johnson',
      date: 'Mar 14, 2024',
      readTime: '30 min',
      tags: ['dessert', 'baking', 'easy'],
      likes: 189,
      image: '/food-1.jpg'
    },
    {
      id: '2',
      title: 'Classic Margherita Pizza',
      description: 'A traditional Italian pizza with fresh mozzarella, tomatoes, and basil on a thin, crispy crust.',
      author: 'Jamie Oliver',
      date: 'Mar 9, 2024',
      readTime: '45 min',
      tags: ['italian', 'dinner', 'medium'],
      likes: 217,
      image: '/food-2.jpg'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Navbar />
      
      {/* Main content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Card */}
        <UserProfileCard />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Recipe Form */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <RecipeForm />
            </div>

            {/* Recipes Feed */}
            <div className="space-y-6">
              {recipes.map((recipe) => (
                <div key={recipe.id} className="transition-transform duration-300 hover:-translate-y-1">
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar column */}
          <div className="lg:col-span-4">
            {/* Cooking News */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <CookingNews />
            </div>

            {/* Popular Tags */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-amber-800 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['dessert', 'vegetarian', 'quick', 'dinner', 'breakfast', 'vegan', 'baking', 'healthy'].map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Get Weekly Recipes</h3>
              <p className="mb-4 text-amber-100">Subscribe to our newsletter for fresh recipe ideas</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg focus:outline-none text-gray-800"
                />
                <button className="bg-amber-800 hover:bg-amber-900 px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeFeed;