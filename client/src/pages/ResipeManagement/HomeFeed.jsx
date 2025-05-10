import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeForm from './ResipeForm';
import RecipeCard from './ResipeCard';
import Navbar from '../../components/Navbar';
import LeftSideBar from '../../components/LeftSideBar';
import RightSideBar from '../../components/RightSideBar';

function HomeFeed() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recipes from backend
  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:8095/api/v1/recipe/get-all');
      setRecipes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Failed to load recipes. Please try again later.');
      setLoading(false);
    }
  };

  // Fetch recipes when component mounts
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Handle recipe creation success
  const handleRecipeCreated = () => {
    fetchRecipes(); // Refresh the recipe list
  };

  // Handle recipe deletion
  const handleRecipeDeleted = (recipeId) => {
    setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId));
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100'>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <LeftSideBar />
          <div className="flex-1">
            <RecipeForm onRecipeCreated={handleRecipeCreated} />
            
            {/* Loading State */}
            {loading && (
              <div className="mt-8 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && recipes.length === 0 && (
              <div className="mt-8 text-center p-8 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Recipes Yet</h3>
                <p className="text-gray-500">Be the first to share your recipe!</p>
              </div>
            )}

            {/* Recipe List */}
            {!loading && !error && recipes.length > 0 && (
              <div className="mt-8 space-y-6">
                {recipes.map(recipe => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={{
                      ...recipe,
                      author: 'Anonymous', // You can add author field to your backend
                      date: new Date().toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      }),
                      readTime: `${recipe.steps.length * 2} min`, // Calculate read time based on steps
                      tags: [recipe.category.toLowerCase()],
                      likes: 0 // You can add likes functionality later
                    }}
                    onDelete={handleRecipeDeleted}
                  />
                ))}
              </div>
            )}
          </div>
          <RightSideBar />
        </div>
      </div>
    </div>
  );
}

export default HomeFeed;