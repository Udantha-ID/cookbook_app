import { useState } from 'react';
import { ArrowLeft, Clock, Star, MessageSquare, Users, Heart, Bookmark, Share2, Printer } from 'lucide-react';

export default function RecipeDetail() {
  const [activeTab, setActiveTab] = useState('ingredients');
  
  // Sample recipe data
  const recipe = {
    title: 'Classic Margherita Pizza',
    time: '45 min',
    rating: 4.7,
    reviews: 2,
    servings: 4,
    cuisine: 'Italian',
    difficulty: 'Medium',
    description: 'A traditional Italian pizza with fresh mozzarella, tomatoes, and basil on a thin, crispy crust.',
    author: 'Jamie Oliver',
    date: 'March 9, 2025',
    ingredients: [
      '500g pizza dough',
      '200g fresh mozzarella cheese, torn into pieces',
      '2 large tomatoes, sliced',
      '1/4 cup fresh basil leaves',
      '2 tablespoons olive oil',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Preheat your oven to 475°F (245°C) with a pizza stone inside if you have one.',
      'Roll out the pizza dough on a floured surface until thin, about 12 inches in diameter.',
      'Brush the dough with olive oil and sprinkle with a pinch of salt.',
      'Arrange tomato slices evenly over the dough.',
      'Distribute mozzarella pieces over the tomatoes.',
      'Bake for 10-12 minutes until the crust is golden and the cheese is bubbly.',
      'Remove from oven and immediately top with fresh basil leaves.',
      'Let cool slightly before slicing and serving.'
    ],
    reviewList: [
      {
        user: 'Sarah',
        date: 'April 12, 2025',
        rating: 5,
        comment: 'Perfect recipe! The crust came out so crispy and the flavors were amazing.'
      },
      {
        user: 'Michael',
        date: 'March 27, 2025',
        rating: 4.5,
        comment: 'Delicious and simple. I added some garlic which gave it an extra flavor kick.'
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header with back button */}
      <div className="py-4">
        <button className="flex items-center text-gray-600 font-medium">
          <ArrowLeft className="mr-2" size={20} />
          Back to Recipes
        </button>
      </div>

      {/* Recipe Title */}
      <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>

      {/* Meta information */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center">
          <Clock size={18} className="mr-1 text-gray-500" />
          <span>{recipe.time}</span>
        </div>
        <div className="flex items-center">
          <Star size={18} className="mr-1 text-yellow-500 fill-yellow-500" />
          <span>{recipe.rating}</span>
        </div>
        <div className="flex items-center">
          <MessageSquare size={18} className="mr-1 text-gray-500" />
          <span>{recipe.reviews} reviews</span>
        </div>
        <div className="flex items-center">
          <Users size={18} className="mr-1 text-gray-500" />
          <span>Serves {recipe.servings}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-6">
        <span className="bg-amber-100 px-4 py-1 rounded-full text-amber-800">{recipe.cuisine}</span>
        <span className="bg-amber-100 px-4 py-1 rounded-full text-amber-800">{recipe.difficulty}</span>
      </div>

      {/* Recipe Image - using placeholder */}
      <div className="w-full h-80 bg-gray-200 rounded-lg mb-6 relative overflow-hidden">
        <img src="/api/placeholder/800/400" alt="Margherita Pizza" className="w-full h-full object-cover" />
        
        {/* Action buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button className="p-2 bg-white rounded-full shadow">
            <Heart size={20} />
          </button>
          <button className="p-2 bg-white rounded-full shadow">
            <Bookmark size={20} />
          </button>
          <button className="p-2 bg-white rounded-full shadow">
            <Share2 size={20} />
          </button>
          <button className="p-2 bg-white rounded-full shadow">
            <Printer size={20} />
          </button>
        </div>
      </div>

      {/* Author information */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gray-300 mr-3 overflow-hidden">
            <img src="/api/placeholder/48/48" alt="Author" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-medium">{recipe.author}</div>
            <div className="text-gray-500 text-sm">{recipe.date}</div>
          </div>
        </div>
        <div>
          <button className="px-4 py-2 border border-gray-300 rounded mr-2 hover:bg-gray-50">
            Edit
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
            Delete
          </button>
        </div>
      </div>

      {/* Recipe description */}
      <p className="text-gray-700 mb-6">{recipe.description}</p>

      {/* Tab navigation */}
      <div className="border-b mb-6">
        <div className="flex">
          <button 
            className={`px-6 py-3 font-medium ${activeTab === 'ingredients' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('ingredients')}
          >
            Ingredients
          </button>
          <button 
            className={`px-6 py-3 font-medium ${activeTab === 'instructions' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('instructions')}
          >
            Instructions
          </button>
          <button 
            className={`px-6 py-3 font-medium ${activeTab === 'reviews' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({recipe.reviews})
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="mb-12">
        {activeTab === 'ingredients' && (
          <ul className="space-y-4">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                  {index + 1}
                </div>
                <span className="pt-1">{ingredient}</span>
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'instructions' && (
          <ol className="space-y-6">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex">
                <div className="mr-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                <div className="pt-1">{instruction}</div>
              </li>
            ))}
          </ol>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {recipe.reviewList.map((review, index) => (
              <div key={index} className="border-b pb-6 last:border-0">
                <div className="flex justify-between mb-2">
                  <div className="font-medium">{review.user}</div>
                  <div className="text-gray-500 text-sm">{review.date}</div>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < Math.floor(review.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{review.rating}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Write a Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}