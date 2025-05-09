import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit, Calendar, ChevronRight, Clock, Sparkles } from 'lucide-react';
import mealService from '../../services/mealService';

const MealPlanner = () => {
  const navigate = useNavigate();
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMealPlans();
  }, []);

  const fetchMealPlans = async () => {
    try {
      setLoading(true);
      const data = await mealService.getAllMeals();
      setMealPlans(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching meal plans:', error);
      setError('Failed to load meal plans. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this meal plan?')) {
      try {
        await mealService.deleteMeal(id);
        setMealPlans(mealPlans.filter(plan => plan.id !== id));
      } catch (error) {
        console.error('Error deleting meal plan:', error);
        setError('Failed to delete meal plan. Please try again later.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-6xl mx-auto">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 flex items-center">
              <Sparkles className="mr-2" size={24} />
              Meal Plans
            </h1>
            <p className="text-indigo-600/70">Manage and organize your weekly meal plans</p>
          </div>
          <button
            onClick={() => navigate('/addmeal')}
            className="group relative px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg flex items-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
            <Plus className="mr-2" size={20} />
            Create New Plan
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mealPlans.length === 0 ? (
            <div className="col-span-full">
              <div className="text-center py-16 px-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-indigo-100">
                <div className="relative inline-block">
                  <Calendar className="mx-auto h-12 w-12 text-indigo-400 mb-4" />
                  <div className="absolute -top-2 -right-2 animate-pulse">
                    <Sparkles className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-indigo-900 mb-2">No meal plans yet</h3>
                <p className="text-indigo-600/70 mb-6">Get started by creating your first meal plan</p>
                <button
                  onClick={() => navigate('/addmeal')}
                  className="group relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  <Plus className="mr-2" size={16} />
                  Create Plan
                </button>
              </div>
            </div>
          ) : (
            mealPlans.map((plan) => (
              <div
                key={plan.id}
                className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-indigo-100"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-indigo-900 mb-2">
                        {plan.title}
                      </h2>
                      <p className="text-indigo-600/70 text-sm line-clamp-2">
                        {plan.description}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDelete(plan.id)}
                        className="p-2 text-indigo-400 hover:text-red-500 transition-colors duration-200"
                        title="Delete plan"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        onClick={() => navigate(`/edit-meal/${plan.id}`)}
                        className="p-2 text-indigo-400 hover:text-purple-500 transition-colors duration-200"
                        title="Edit plan"
                      >
                        <Edit size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-indigo-600/70">
                      <Calendar className="mr-2" size={16} />
                      <span>
                        {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-indigo-600/70">
                      <Clock className="mr-2" size={16} />
                      <span>{plan.meals ? Object.keys(plan.meals).length : 0} meals planned</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/edit-meal/${plan.id}`)}
                    className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-indigo-200 rounded-lg text-sm font-medium text-indigo-700 hover:bg-indigo-50 transition-colors duration-200 group-hover:border-indigo-300"
                  >
                    View Details
                    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;