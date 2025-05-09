import React from 'react';
import RecipeForm from './ResipeForm';
import RecipeCard from './ResipeCard';
import Navbar from '../../components/Navbar';
import LeftSideBar from '../../components/LeftSideBar';
import RightSideBar from '../../components/RightSideBar'

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
      likes: 189
    },
    {
      id: '2',
      title: 'Classic Margherita Pizza',
      description: 'A traditional Italian pizza with fresh mozzarella, tomatoes, and basil on a thin, crispy crust.',
      author: 'Jamie Oliver',
      date: 'Mar 9, 2024',
      readTime: '45 min',
      tags: ['italian', 'dinner', 'medium'],
      likes: 217
    }
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100'>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <LeftSideBar />
          <div className="flex-1">
            <RecipeForm />
            <div className="mt-8 space-y-6">
              {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
          <RightSideBar />
        </div>
      </div>
    </div>
  );
}

export default HomeFeed;