import React, { useState } from 'react';
import { Calendar, Plus, X, Check, Utensils, ArrowLeft, Clock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import mealService from '../../services/mealService';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Transform the form data to match the backend DTO structure
        const mealData = {
          title: formData.title,
          description: `${formData.dietType} diet plan with ${formData.calories} calories daily`,
          startDate: formData.startDate.toISOString().split('T')[0],
          endDate: formData.endDate.toISOString().split('T')[0],
          meals: formData.meals
        };

        await mealService.createMeal(mealData);
        navigate('/meal-planner');
      } catch (error) {
        console.error('Error creating meal plan:', error);
        // You might want to show an error message to the user here
      }
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-amber-100">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/meal-planner')}
                className="p-2 text-amber-500 hover:text-amber-600 transition-colors duration-200"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-amber-800 flex items-center">
                  <Utensils className="mr-2 text-amber-600" size={24} />
                  Create New Meal Plan
                </h1>
                <p className="text-sm text-amber-600/70 mt-1">
                  Plan your meals for the upcoming week
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-amber-700">
                  Plan Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Healthy 7-Day Meal Plan"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.title 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-amber-200 focus:ring-amber-500 focus:border-amber-500'
                  } bg-white text-amber-900 placeholder-amber-300`}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-amber-700">
                  Diet Type *
                </label>
                <select
                  value={formData.dietType}
                  onChange={(e) => setFormData({...formData, dietType: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.dietType 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-amber-200 focus:ring-amber-500 focus:border-amber-500'
                  } bg-white text-amber-900`}
                >
                  <option value="">Select diet type</option>
                  {dietTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.dietType && (
                  <p className="text-sm text-red-500">{errors.dietType}</p>
                )}
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-amber-700">
                  Select Week *
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="date"
                    value={formData.startDate.toISOString().split('T')[0]}
                    min={today.toISOString().split('T')[0]}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.startDate 
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                        : 'border-amber-200 focus:ring-amber-500 focus:border-amber-500'
                    } bg-white text-amber-900`}
                  />
                  <div className="flex items-center text-sm text-amber-600/70">
                    <Calendar className="mr-2" size={16} />
                    <span>
                      {formData.startDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} - 
                      {formData.endDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
                {errors.startDate && (
                  <p className="text-sm text-red-500">{errors.startDate}</p>
                )}
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-amber-700">
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
                    className="w-full accent-indigo-500"
                  />
                  <span className="text-indigo-700 min-w-[80px] text-right font-medium">
                    {formData.calories} kcal
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-indigo-900 flex items-center">
                <Clock className="mr-2" size={20} />
                Daily Meals
              </h2>
              
              {generateDateRange().map((date, index) => (
                <div 
                  key={date.toISOString()} 
                  className="bg-indigo-50/50 rounded-lg p-6 space-y-4 border border-indigo-100"
                >
                  <h3 className="text-lg font-medium text-indigo-900">
                    {date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Breakfast', 'Lunch', 'Dinner'].map(mealType => (
                      <div key={mealType} className="space-y-2">
                        <label className="block text-sm font-medium text-indigo-700">
                          {mealType}
                        </label>
                        <input
                          type="text"
                          value={formData.meals[`${date.toISOString().split('T')[0]}-${mealType}`] || ''}
                          onChange={(e) => handleMealChange(date, mealType, e.target.value)}
                          placeholder={`Enter ${mealType.toLowerCase()} recipe`}
                          className="w-full px-4 py-2 rounded-lg border border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-indigo-900 placeholder-indigo-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-indigo-100">
              <button
                type="button"
                onClick={() => navigate('/meal-planner')}
                className="px-6 py-2 border border-indigo-200 rounded-lg text-indigo-700 hover:bg-indigo-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="mt-8 w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Create Meal Plan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMeal;