import React, { useState } from 'react';
import { Plus, X, Calendar, ChevronLeft, ChevronRight, Search, ArrowRight, Coffee, UtensilsCrossed, Utensils } from 'lucide-react';

const MealPlanner = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState('monday');
  const [selectedMealType, setSelectedMealType] = useState(null);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  
  // Mock recipes data
  const recipes = [
    {
      id: 1,
      title: 'Avocado Toast with Eggs',
      image: '/api/placeholder/200/200',
      category: 'Breakfast',
      prepTime: 10,
      cookTime: 5,
      description: 'A nutritious breakfast with mashed avocado and perfectly poached eggs on toast.'
    },
    {
      id: 2,
      title: 'Greek Yogurt Parfait',
      image: '/api/placeholder/200/200',
      category: 'Breakfast',
      prepTime: 5,
      cookTime: 0,
      description: 'Layers of Greek yogurt, fresh berries, and honey granola.'
    },
    {
      id: 3,
      title: 'Chicken Caesar Salad',
      image: '/api/placeholder/200/200',
      category: 'Lunch',
      prepTime: 15,
      cookTime: 10,
      description: 'Classic Caesar salad with grilled chicken, romaine lettuce, and homemade dressing.'
    },
    {
      id: 4,
      title: 'Mediterranean Quinoa Bowl',
      image: '/api/placeholder/200/200',
      category: 'Lunch',
      prepTime: 10,
      cookTime: 20,
      description: 'Protein-packed quinoa with chickpeas, cucumber, tomatoes, and feta cheese.'
    },
    {
      id: 5,
      title: 'Grilled Salmon with Asparagus',
      image: '/api/placeholder/200/200',
      category: 'Dinner',
      prepTime: 10,
      cookTime: 20,
      description: 'Omega-rich salmon fillet with roasted asparagus and lemon butter sauce.'
    },
    {
      id: 6,
      title: 'Vegetable Stir Fry',
      image: '/api/placeholder/200/200',
      category: 'Dinner',
      prepTime: 15,
      cookTime: 10,
      description: 'Colorful mix of stir-fried vegetables with tofu in a savory sauce.'
    }
  ];

  // Mock meal plan data
  const [mealPlan, setMealPlan] = useState({
    monday: {
      breakfast: null,
      lunch: null,
      dinner: null
    },
    tuesday: {
      breakfast: null,
      lunch: null,
      dinner: null
    },
    wednesday: {
      breakfast: null,
      lunch: null,
      dinner: null
    },
    thursday: {
      breakfast: null,
      lunch: null,
      dinner: null
    },
    friday: {
      breakfast: null,
      lunch: null,
      dinner: null
    },
    saturday: {
      breakfast: null,
      lunch: null,
      dinner: null
    },
    sunday: {
      breakfast: null,
      lunch: null,
      dinner: null
    }
  });
  
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const mealTypes = [
    { id: 'breakfast', name: 'Breakfast', icon: <Coffee size={18} /> },
    { id: 'lunch', name: 'Lunch', icon: <UtensilsCrossed size={18} /> },
    { id: 'dinner', name: 'Dinner', icon: <Utensils size={18} /> },
  ];
  
  // Format week range for display (e.g., "May 6 - May 12")
  const formatWeekRange = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    
    const startMonth = startOfWeek.toLocaleString('default', { month: 'short' });
    const endMonth = endOfWeek.toLocaleString('default', { month: 'short' });
    
    return `${startMonth} ${startOfWeek.getDate()} - ${endMonth} ${endOfWeek.getDate()}`;
  };
  
  // Get date number for each day of the week
  const getDayDate = (dayIndex) => {
    const date = new Date(currentDate);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1) + dayIndex;
    date.setDate(diff);
    return date.getDate();
  };
  
  // Navigation functions for week selection
  const prevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };
  
  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };
  
  // Recipe modal functions
  const openRecipeModal = (day, mealType) => {
    setSelectedDay(day);
    setSelectedMealType(mealType);
    setIsRecipeModalOpen(true);
  };
  
  const assignRecipe = (recipe) => {
    setMealPlan({
      ...mealPlan,
      [selectedDay]: {
        ...mealPlan[selectedDay],
        [selectedMealType]: recipe
      }
    });
    setIsRecipeModalOpen(false);
  };
  
  const removeRecipe = (day, mealType) => {
    setMealPlan({
      ...mealPlan,
      [day]: {
        ...mealPlan[day],
        [mealType]: null
      }
    });
  };
  
  // Custom drag and drop handlers
  const handleDragStart = (day, mealType, recipe) => {
    setIsDragging(true);
    setDraggedItem({ day, mealType, recipe });
  };
  
  const handleDragOver = (e, day, mealType) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-primary-50', 'dark:bg-primary-900/20');
  };
  
  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('bg-primary-50', 'dark:bg-primary-900/20');
  };
  
  const handleDrop = (e, day, mealType) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-primary-50', 'dark:bg-primary-900/20');
    
    if (!draggedItem) return;
    
    const { day: sourceDay, mealType: sourceMealType, recipe } = draggedItem;
    
    // Don't do anything if dropped on the same cell
    if (sourceDay === day && sourceMealType === mealType) return;
    
    // Update meal plan
    setMealPlan({
      ...mealPlan,
      [sourceDay]: {
        ...mealPlan[sourceDay],
        [sourceMealType]: null
      },
      [day]: {
        ...mealPlan[day],
        [mealType]: recipe
      }
    });
    
    setIsDragging(false);
    setDraggedItem(null);
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedItem(null);
  };
  
  // Filter recipes based on search term
  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Modal component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium">{title}</h3>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    );
  };

  // Card component
  const Card = ({ children, className, hoverable }) => {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${hoverable ? 'hover:shadow-md transition-shadow' : ''} ${className || ''}`}>
        {children}
      </div>
    );
  };

  // Button component
  const Button = ({ children, onClick, variant = "primary", size = "md", icon, iconPosition = "left", className }) => {
    const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-colors";
    
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2",
      lg: "px-5 py-2.5 text-lg"
    };
    
    const variantClasses = {
      primary: "bg-primary-500 hover:bg-primary-600 text-white",
      outline: "border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
      text: "text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20"
    };
    
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className || ''}`}
      >
        {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
      </button>
    );
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Meal Planner</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Plan your meals for the week with our drag-and-drop meal planner
          </p>
        </div>
        
        {/* Weekly navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={prevWeek} 
            variant="outline" 
            icon={<ChevronLeft size={18} />}
          >
            Previous Week
          </Button>
          
          <div className="flex items-center text-lg font-medium">
            <Calendar size={20} className="mr-2 text-primary-500" />
            {formatWeekRange()}
          </div>
          
          <Button 
            onClick={nextWeek} 
            variant="outline" 
            icon={<ChevronRight size={18} />}
            iconPosition="right"
          >
            Next Week
          </Button>
        </div>
        
        {/* Meal Planner Grid */}
        <div className="grid grid-cols-8 gap-3 mb-10">
          {/* First column - Meal types */}
          <div className="col-span-1">
            <div className="h-14"></div> {/* Empty space for alignment */}
            
            {mealTypes.map((mealType) => (
              <div 
                key={mealType.id} 
                className="h-36 flex items-center justify-center"
              >
                <div className="flex flex-col items-center">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-2">
                    {mealType.icon}
                  </div>
                  <span className="text-sm font-medium">{mealType.name}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Day columns */}
          {days.map((day, index) => (
            <div key={day} className="col-span-1">
              <div className="h-14 flex flex-col items-center justify-center rounded-t-lg bg-primary-500 text-white">
                <span className="font-medium capitalize">{day.slice(0, 3)}</span>
                <span className="text-xs font-medium">{getDayDate(index)}</span>
              </div>
              
              {mealTypes.map((mealType) => (
                <div
                  key={`${day}-${mealType.id}`}
                  onDragOver={(e) => handleDragOver(e, day, mealType.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, day, mealType.id)}
                  className="h-36 p-2 border border-gray-200 dark:border-gray-800"
                >
                  {mealPlan[day][mealType.id] ? (
                    <div
                      draggable
                      onDragStart={() => handleDragStart(day, mealType.id, mealPlan[day][mealType.id])}
                      onDragEnd={handleDragEnd}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <Card className="h-32 p-2 relative group">
                        <img 
                          src={mealPlan[day][mealType.id].image} 
                          alt={mealPlan[day][mealType.id].title}
                          className="w-full h-16 object-cover rounded-md mb-1"
                        />
                        <h4 className="text-xs font-medium line-clamp-2">
                          {mealPlan[day][mealType.id].title}
                        </h4>
                        <button
                          onClick={() => removeRecipe(day, mealType.id)}
                          className="absolute top-1 right-1 p-1 bg-white dark:bg-gray-800 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 dark:text-gray-400 hover:text-red-500"
                        >
                          <X size={12} />
                        </button>
                      </Card>
                    </div>
                  ) : (
                    <button
                      onClick={() => openRecipeModal(day, mealType.id)}
                      className="h-32 w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary-400 dark:hover:border-primary-600 transition-colors"
                    >
                      <Plus size={20} className="text-gray-400 dark:text-gray-600 mb-1" />
                      <span className="text-xs text-gray-500 dark:text-gray-500">Add {mealType.name}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        
        {/* Tips Section */}
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-medium mb-4">Meal Planning Tips</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <ArrowRight size={16} className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
              <span>Plan meals that share ingredients to reduce waste and save money.</span>
            </li>
            <li className="flex items-start">
              <ArrowRight size={16} className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
              <span>Consider your schedule when planning. Save complex recipes for days when you have more time.</span>
            </li>
            <li className="flex items-start">
              <ArrowRight size={16} className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
              <span>Batch cook on weekends and plan for leftovers to save time during busy weekdays.</span>
            </li>
            <li className="flex items-start">
              <ArrowRight size={16} className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
              <span>Aim for a balance of proteins, carbs, and vegetables across your meals.</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Recipe Selection Modal */}
      <Modal
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
        title={`Select Recipe for ${selectedMealType && selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1)}`}
      >
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div className="h-96 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4 pr-2">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div 
                key={recipe.id}
                onClick={() => assignRecipe(recipe)}
                className="cursor-pointer"
              >
                <Card hoverable className="p-3">
                  <div className="flex space-x-3">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-grow">
                      <h4 className="font-medium line-clamp-1">{recipe.title}</h4>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        {recipe.prepTime + recipe.cookTime} min • {recipe.category}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                        {recipe.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-8">
              <p className="text-gray-600 dark:text-gray-400 mb-2">No recipes found matching your search.</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MealPlanner;