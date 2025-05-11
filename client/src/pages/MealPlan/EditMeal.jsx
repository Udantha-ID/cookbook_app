import React, { useState, useEffect } from 'react';
import { Calendar, Plus, X, Check, Utensils, ArrowLeft, Clock, Sparkles, Trash2, Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import mealService from '../../services/mealService';

const EditMeal = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Function to get Monday of the week for a given date
  const getMonday = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const [formData, setFormData] = useState({
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    meals: {}
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchMealPlan();
  }, [id]);

  const fetchMealPlan = async () => {
    try {
      setLoading(true);
      const data = await mealService.getAllMeals();
      const mealPlan = data.find(meal => meal.id === parseInt(id));
      
      if (mealPlan) {
        setFormData({
          title: mealPlan.title,
          startDate: new Date(mealPlan.startDate),
          endDate: new Date(mealPlan.endDate),
          description: mealPlan.description,
          meals: mealPlan.meals || {}
        });
      } else {
        setError('Meal plan not found');
      }
    } catch (error) {
      console.error('Error fetching meal plan:', error);
      setError('Failed to load meal plan');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setIsSubmitting(true);
        await mealService.updateMeal(id, formData);
        navigate('/meal-planner');
      } catch (error) {
        console.error('Error updating meal plan:', error);
        setError('Failed to update meal plan');
      } finally {
        setIsSubmitting(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              <div className="absolute top-0 left-0 animate-ping rounded-full h-12 w-12 bg-indigo-200 opacity-75"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-6">
      <div className="max-w-5xl mx-auto">
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
                  Edit Meal Plan
                </h1>
                <p className="text-sm text-amber-600/70 mt-1">
                  {formData.title || "Loading..."}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/meal-planner')}
                className="group relative px-4 py-2 bg-red-100 text-red-600 rounded-lg flex items-center hover:bg-red-200 transition-colors duration-200"
              >
                <Trash2 className="mr-2" size={18} />
                Delete Plan
              </button>
              <button
                onClick={handleSubmit}
                className="group relative px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg flex items-center shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Save className="mr-2" size={18} />
                Save Changes
              </button>
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
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter meal plan description"
                  className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-amber-500 focus:border-amber-500 bg-white text-amber-900 placeholder-amber-300"
                />
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
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-amber-800 flex items-center">
                <Clock className="mr-2 text-amber-600" size={20} />
                Daily Meals
              </h2>
              
              {generateDateRange().map((date, index) => (
                <div 
                  key={date.toISOString()} 
                  className="bg-amber-50/50 rounded-lg p-6 space-y-4 border border-amber-100"
                >
                  <h3 className="text-lg font-medium text-amber-800">
                    {date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Breakfast', 'Lunch', 'Dinner'].map(mealType => (
                      <div key={mealType} className="space-y-2">
                        <label className="block text-sm font-medium text-amber-700">
                          {mealType}
                        </label>
                        <input
                          type="text"
                          value={formData.meals[`${date.toISOString().split('T')[0]}-${mealType}`] || ''}
                          onChange={(e) => handleMealChange(date, mealType, e.target.value)}
                          placeholder={`Enter ${mealType.toLowerCase()} recipe`}
                          className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-amber-500 focus:border-amber-500 bg-white text-amber-900 placeholder-amber-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-amber-100">
              <button
                type="button"
                onClick={() => navigate('/meal-planner')}
                className="px-6 py-2 border border-amber-200 rounded-lg text-amber-700 hover:bg-amber-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg flex items-center shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Check className="mr-2" size={18} />
                    Update Meal Plan
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMeal; 