import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Star, MessageSquare, Users, Heart, Bookmark, Share2, Printer } from 'lucide-react';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ingredients');
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  // Sample recipe data
  const recipes = {
    '1': {
      id: '1',
      title: 'Chocolate Chip Cookies',
      time: '30 min',
      rating: 4.8,
      reviews: 3,
      servings: 12,
      cuisine: 'Dessert',
      difficulty: 'Easy',
      description: 'Soft and chewy cookies with melty chocolate chips. Perfect for any occasion!',
      author: 'Mike Johnson',
      authorAvatar: '/avatar1.jpg',
      date: 'March 14, 2025',
      ingredients: [
        '2 1/4 cups all-purpose flour',
        '1 tsp baking soda',
        '1 tsp salt',
        '1 cup unsalted butter, softened',
        '3/4 cup granulated sugar',
        '3/4 cup packed brown sugar',
        '2 large eggs',
        '2 tsp vanilla extract',
        '2 cups semi-sweet chocolate chips'
      ],
      instructions: [
        'Preheat oven to 375°F (190°C).',
        'In a small bowl, combine flour, baking soda, and salt.',
        'In a large bowl, cream together butter and sugars until light and fluffy.',
        'Beat in eggs one at a time, then stir in vanilla.',
        'Gradually blend in the dry ingredients.',
        'Stir in chocolate chips.',
        'Drop by rounded tablespoons onto ungreased baking sheets.',
        'Bake for 9 to 11 minutes until golden brown.',
        'Let stand on baking sheet for 2 minutes, then remove to cool on wire racks.'
      ],
      reviewList: [
        {
          user: 'Sarah',
          date: 'April 2, 2025',
          rating: 5,
          comment: 'These cookies came out perfectly! So delicious and chewy.'
        },
        {
          user: 'Michael',
          date: 'March 20, 2025',
          rating: 4.5,
          comment: 'Great recipe! I added some walnuts for extra crunch.'
        },
        {
          user: 'Jane Smith',
          date: 'March 15, 2025',
          rating: 5,
          comment: 'My family loved these! Will definitely make again.'
        }
      ]
    },
    '2': {
      id: '2',
      title: 'Classic Margherita Pizza',
      time: '45 min',
      rating: 4.7,
      reviews: 2,
      servings: 4,
      cuisine: 'Italian',
      difficulty: 'Medium',
      description: 'A traditional Italian pizza with fresh mozzarella, tomatoes, and basil on a thin, crispy crust.',
      author: 'Jamie Oliver',
      authorAvatar: '/avatar2.jpg',
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
    }
  };

  const recipe = recipes[id] || null;

  if (!recipe) {
    return (
      <div className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100">
        <div className="max-w-md p-8 bg-white rounded-2xl shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4 text-amber-800">Recipe not found</h1>
          <p className="mb-6 text-gray-600">The recipe you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full hover:shadow-lg transition-all"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      {/* Floating back button */}
      <button 
        className="fixed top-6 left-6 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={20} className="text-amber-600" />
        <span className="font-medium text-amber-800">Back</span>
      </button>

      {/* Recipe Header with Image */}
      <div className="relative h-96 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0"></div>
        <img 
          src={`/food-${id}.jpg`} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
        />
        
        {/* Floating action buttons */}
        <div className="absolute top-6  right-6 flex gap-3 z-10">
          <button 
            className={`p-3 rounded-full backdrop-blur-sm ${isLiked ? 'bg-rose-100 text-rose-500' : 'bg-white/90 text-gray-700'}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart size={20} className={isLiked ? 'fill-current' : ''} />
          </button>
          <button 
            className={`p-3 rounded-full backdrop-blur-sm ${isSaved ? 'bg-amber-100 text-amber-600' : 'bg-white/90 text-gray-700'}`}
            onClick={() => setIsSaved(!isSaved)}
          >
            <Bookmark size={20} className={isSaved ? 'fill-current' : ''} />
          </button>
          <button className="p-3 rounded-full backdrop-blur-sm bg-white/90 text-gray-700">
            <Share2 size={20} />
          </button>
        </div>
        
        {/* Recipe title and meta */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 bg-amber-100/90 text-amber-800 rounded-full text-sm font-medium backdrop-blur-sm">
                {recipe.cuisine}
              </span>
              <span className="px-3 py-1 bg-amber-100/90 text-amber-800 rounded-full text-sm font-medium backdrop-blur-sm">
                {recipe.difficulty}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">{recipe.title}</h1>
            <p className="text-white/90 mb-4">{recipe.description}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center">
                <Clock size={18} className="mr-2" />
                <span>{recipe.time}</span>
              </div>
              <div className="flex items-center">
                <Star size={18} className="mr-2 text-amber-300 fill-amber-300" />
                <span>{recipe.rating}</span>
              </div>
              <div className="flex items-center">
                <MessageSquare size={18} className="mr-2" />
                <span>{recipe.reviews} reviews</span>
              </div>
              <div className="flex items-center">
                <Users size={18} className="mr-2" />
                <span>Serves {recipe.servings}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-20 -mt-16 relative z-20">
        {/* Author card */}
        <div className="bg-white rounded-xl  shadow-lg p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-14 h-14 rounded-full border-2 border-amber-200 overflow-hidden mr-4">
              <img src={recipe.authorAvatar} alt={recipe.author} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-medium text-gray-800">By {recipe.author}</div>
              <div className="text-sm text-gray-500">{recipe.date}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-amber-200 rounded-lg text-amber-700 hover:bg-amber-50 transition-colors">
              Edit
            </button>
            <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
              Save
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="sticky top-0 bg-amber-50 rounded-t-xl overflow-hidden z-10 mb-8 shadow-sm">
          <div className="flex">
            <button 
              className={`flex-1 py-4 font-medium text-center transition-colors ${activeTab === 'ingredients' ? 'text-amber-700 bg-white shadow-md' : 'text-gray-600 hover:text-amber-600'}`}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </button>
            <button 
              className={`flex-1 py-4 font-medium text-center transition-colors ${activeTab === 'instructions' ? 'text-amber-700 bg-white shadow-md' : 'text-gray-600 hover:text-amber-600'}`}
              onClick={() => setActiveTab('instructions')}
            >
              Instructions
            </button>
            <button 
              className={`flex-1 py-4 font-medium text-center transition-colors ${activeTab === 'reviews' ? 'text-amber-700 bg-white shadow-md' : 'text-gray-600 hover:text-amber-600'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({recipe.reviews})
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
          {activeTab === 'ingredients' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">Ingredients</h2>
              <ul className="space-y-4">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mr-3 mt-1 flex-shrink-0 text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6 border-t border-amber-100">
                <h3 className="text-lg font-medium text-amber-800 mb-4">Nutrition Info</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-amber-50 p-3 rounded-lg text-center">
                    <div className="text-sm text-amber-600">Calories</div>
                    <div className="font-bold text-amber-800">320</div>
                    <div className="text-xs text-gray-500">per serving</div>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg text-center">
                    <div className="text-sm text-amber-600">Carbs</div>
                    <div className="font-bold text-amber-800">42g</div>
                    <div className="text-xs text-gray-500">per serving</div>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg text-center">
                    <div className="text-sm text-amber-600">Protein</div>
                    <div className="font-bold text-amber-800">4g</div>
                    <div className="text-xs text-gray-500">per serving</div>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg text-center">
                    <div className="text-sm text-amber-600">Fat</div>
                    <div className="font-bold text-amber-800">16g</div>
                    <div className="text-xs text-gray-500">per serving</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">Instructions</h2>
              <ol className="space-y-8">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <div className="mr-4">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="pt-1 text-gray-700">{instruction}</div>
                  </li>
                ))}
              </ol>
              
              <div className="mt-8 pt-6 border-t border-amber-100">
                <h3 className="text-lg font-medium text-amber-800 mb-4">Tips & Notes</h3>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-amber-800">• For extra chewy cookies, chill the dough for 30 minutes before baking</p>
                  <p className="text-amber-800 mt-2">• You can substitute chocolate chips with white chocolate or butterscotch chips</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-amber-800">Reviews</h2>
                <button className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full hover:shadow-md transition-all">
                  Write a Review
                </button>
              </div>
              
              <div className="space-y-6">
                {recipe.reviewList.map((review, index) => (
                  <div key={index} className="border-b border-amber-100 pb-6 last:border-0">
                    <div className="flex justify-between mb-3">
                      <div className="font-medium text-gray-800">{review.user}</div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < Math.floor(review.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"} 
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{review.rating.toFixed(1)}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Print button at bottom */}
        <div className="mt-8 flex justify-center">
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-amber-700 rounded-full shadow-md hover:shadow-lg transition-all">
            <Printer size={18} />
            <span>Print Recipe</span>
          </button>
        </div>
      </div>
    </div>
  );
}