import React, { useState } from 'react';
import { Calendar, Plus, X, Check, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddMeal = () => {
  const navigate = useNavigate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Function to get Monday of the week for a given date
  const getMonday = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(date.setDate(diff));
  };

  // Default dates (current week)
  const defaultStartDate = getMonday(new Date());
  const defaultEndDate = new Date(defaultStartDate);
  defaultEndDate.setDate(defaultStartDate.getDate() + 6);

  const [formData, setFormData] = useState({
    title: '',
    startDate: defaultStartDate,
    endDate: defaultEndDate,
    dietType: '',
    meals: {},
    calories: 2000
  });

  const [errors, setErrors] = useState({});
  const dietTypes = ['Vegan', 'Vegetarian', 'Keto', 'Paleo', 'Gluten-Free', 'Mediterranean', 'Low-Carb'];

  const handleDateChange = (date) => {
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    
    // Always set to Monday of the selected week
    const monday = getMonday(new Date(selectedDate));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    
    setFormData(prev => ({
      ...prev,
      startDate: monday,
      endDate: sunday
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Plan title is required';
    if (formData.startDate < today) newErrors.startDate = 'Cannot select past weeks';
    if (!formData.dietType) newErrors.dietType = 'Diet type is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
      navigate('/meal-planner');
    }
  };

  const generateDateRange = () => {
    const dates = [];
    const currentDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };

  const handleMealChange = (date, mealType, value) => {
    setFormData(prev => ({
      ...prev,
      meals: {
        ...prev.meals,
        [`${date.toISOString().split('T')[0]}-${mealType}`]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            <Utensils className="inline mr-2" size={20} />
            Create New Meal Plan
          </h1>
          <button 
            onClick={() => navigate('/meal-planner')}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Plan Title */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Plan Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g., Healthy 7-Day Meal Plan"
                className={`w-full px-4 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            {/* Diet Type */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Diet Type *
              </label>
              <select
                value={formData.dietType}
                onChange={(e) => setFormData({...formData, dietType: e.target.value})}
                className={`w-full px-4 py-2 border rounded-md ${errors.dietType ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              >
                <option value="">Select diet type</option>
                {dietTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.dietType && <p className="text-red-500 text-xs mt-1">{errors.dietType}</p>}
            </div>

            {/* Week Selection */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Select Week *
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="date"
                  value={formData.startDate.toISOString().split('T')[0]}
                  min={today.toISOString().split('T')[0]}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md ${errors.startDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                />
                <span className="text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  {formData.startDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} - 
                  {formData.endDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
              </div>
              {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
            </div>

            {/* Calories */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Daily Calories Target
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1200"
                  max="3000"
                  step="100"
                  value={formData.calories}
                  onChange={(e) => setFormData({...formData, calories: parseInt(e.target.value)})}
                  className="w-full"
                />
                <span className="text-gray-700 dark:text-gray-300 min-w-[80px] text-right">
                  {formData.calories} kcal
                </span>
              </div>
            </div>
          </div>

          {/* Meal Planning Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Daily Meals</h2>
            
            {generateDateRange().map((date, index) => (
              <div key={date.toISOString()} className="mb-6 border-b pb-6 border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">
                  {date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Breakfast', 'Lunch', 'Dinner'].map(mealType => (
                    <div key={mealType} className="mb-4">
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        {mealType}
                      </label>
                      <input
                        type="text"
                        value={formData.meals[`${date.toISOString().split('T')[0]}-${mealType}`] || ''}
                        onChange={(e) => handleMealChange(date, mealType, e.target.value)}
                        placeholder={`Enter ${mealType.toLowerCase()} recipe`}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/meal-planner')}
              className="mr-4 px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md flex items-center"
            >
              <Check className="mr-2" size={18} />
              Create Meal Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMeal;