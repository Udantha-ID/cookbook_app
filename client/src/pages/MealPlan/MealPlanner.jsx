import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit, Calendar, ChevronRight, Clock, Sparkles } from 'lucide-react';
import mealService from '../../services/mealService';
import Navbar from '../../components/Navbar';
import LeftSideBar from '../../components/LeftSideBar';
import RightSideBar from '../../components/RightSideBar';

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

  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100'>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <LeftSideBar />
          <div className="flex-1">
            <div className="w-full max-w-2xl mx-auto my-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-amber-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-amber-800 flex items-center">
                      <Sparkles className="mr-2 text-amber-600" size={24} />
                      Meal Plans
                    </h1>
                    <p className="text-amber-600/70">Manage and organize your weekly meal plans</p>
                  </div>
                  <button
                    onClick={() => navigate('/addmeal')}
                    className="group relative px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg flex items-center shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    <Plus className="mr-2" size={20} />
                    Create New Plan
                  </button>
                </div>
                
                <div className="flex justify-between pt-3 border-t border-amber-100">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-amber-600 px-4 py-1.5 rounded-lg hover:bg-amber-50 transition-colors">
                    <div className="p-1.5 rounded-full bg-amber-100 text-amber-600">
                      <Calendar size={18} />
                    </div>
                    <span className="text-sm font-medium">Weekly</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-amber-600 px-4 py-1.5 rounded-lg hover:bg-amber-50 transition-colors">
                    <div className="p-1.5 rounded-full bg-amber-100 text-amber-600">
                      <Clock size={18} />
                    </div>
                    <span className="text-sm font-medium">Recent</span>
                  </button>
                </div>
              </div>
              
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
              {!loading && !error && mealPlans.length === 0 && (
                <div className="mt-8 text-center p-8 bg-white rounded-lg shadow-sm border border-amber-100">
                  <div className="relative inline-block">
                    <Calendar className="mx-auto h-12 w-12 text-amber-400 mb-4" />
                    <div className="absolute -top-2 -right-2 animate-pulse">
                      <Sparkles className="h-6 w-6 text-orange-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">No Meal Plans Yet</h3>
                  <p className="text-amber-600/70 mb-6">Get started by creating your first meal plan</p>
                  <button
                    onClick={() => navigate('/addmeal')}
                    className="group inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <Plus className="mr-2" size={16} />
                    Create Plan
                  </button>
                </div>
              )}

              {/* Meal Plans List */}
              {!loading && !error && mealPlans.length > 0 && (
                <div className="mt-8 space-y-6">
                  {mealPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-amber-100 overflow-hidden"
                    >
                      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-amber-100/50 via-amber-50 to-orange-50/50 border-b border-amber-100/40">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 overflow-hidden ring-2 ring-amber-100 shadow-lg flex items-center justify-center text-white">
                              <Calendar size={24} />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 text-lg">{plan.title}</h3>
                            <div className="flex items-center text-sm text-amber-700/80">
                              <Clock size={14} className="mr-1.5" />
                              <span>
                                {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDelete(plan.id)}
                            className="p-2 text-amber-400 hover:text-red-500 transition-colors duration-200"
                            title="Delete plan"
                          >
                            <Trash2 size={18} />
                          </button>
                          <button
                            onClick={() => navigate(`/edit-meal/${plan.id}`)}
                            className="p-2 text-amber-400 hover:text-amber-700 transition-colors duration-200"
                            title="Edit plan"
                          >
                            <Edit size={18} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {plan.description || "A weekly meal plan with delicious recipes."}
                        </p>
                        
                        <div className="flex items-center text-sm text-amber-600/70 mb-2">
                          <span className="font-medium">{plan.meals ? Object.keys(plan.meals).length : 0} meals planned</span>
                        </div>

                        <button
                          onClick={() => navigate(`/edit-meal/${plan.id}`)}
                          className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-amber-200 rounded-lg text-sm font-medium text-amber-700 hover:bg-amber-50 transition-colors duration-200"
                        >
                          View Details
                          <ChevronRight className="ml-2" size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;