import React from 'react';
import RecipeForm from './ResipeForm';
import RecipeCard from './ResipeCard';
import Navbar from '../../components/Navbar';

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
    <div>
      <Navbar />
      <RecipeForm />
      <div className="flex flex-col items-center">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default HomeFeed;