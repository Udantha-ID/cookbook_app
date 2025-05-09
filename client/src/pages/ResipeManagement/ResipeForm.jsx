import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: [''],
    steps: [''],
    category: '',
    rating: 0,
    mediaUrl: null,
    mediaType: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({ ...prev, [name]: value }));
  };

  // Handle ingredient list changes
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe(prev => ({ ...prev, ingredients: newIngredients }));
  };

  // Handle step list changes
  const handleStepChange = (index, value) => {
    const newSteps = [...recipe.steps];
    newSteps[index] = value;
    setRecipe(prev => ({ ...prev, steps: newSteps }));
  };

  // Add new ingredient field
  const addIngredient = () => {
    setRecipe(prev => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
  };

  // Add new step field
  const addStep = () => {
    setRecipe(prev => ({ ...prev, steps: [...prev.steps, ''] }));
  };

  // Remove ingredient field
  const removeIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe(prev => ({ ...prev, ingredients: newIngredients }));
  };

  // Remove step field
  const removeStep = (index) => {
    const newSteps = recipe.steps.filter((_, i) => i !== index);
    setRecipe(prev => ({ ...prev, steps: newSteps }));
  };

  // Handle media upload
  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const mediaType = file.type.startsWith('image') ? 'image' : 'video';
      setRecipe(prev => ({
        ...prev,
        mediaUrl: event.target.result,
        mediaType
      }));
    };
    reader.readAsDataURL(file);
  };

  // Validate form before submission
  const validateForm = () => {
    if (!recipe.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!recipe.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (recipe.ingredients.length === 0 || recipe.ingredients.some(ing => !ing.trim())) {
      setError('At least one ingredient is required');
      return false;
    }
    if (recipe.steps.length === 0 || recipe.steps.some(step => !step.trim())) {
      setError('At least one step is required');
      return false;
    }
    if (!recipe.category) {
      setError('Category is required');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create recipe data object
      const recipeData = {
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        category: recipe.category,
        rating: recipe.rating,
        mediaUrl: recipe.mediaUrl
      };

      // Send data to backend
      const response = await axios.post('http://localhost:8095/api/v1/recipe/save', recipeData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data) {
        console.log('Recipe created successfully:', response.data);
        alert('Recipe saved successfully!');
        closeModal();
      }
    } catch (error) {
      console.error('Error submitting recipe:', error);
      if (error.code === 'ERR_NETWORK') {
        setError('Unable to connect to the server. Please check if the server is running.');
      } else if (error.response) {
        setError(error.response.data?.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        setError('No response from server. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Close modal and reset form
  const closeModal = () => {
    setIsOpen(false);
    setRecipe({
      title: '',
      description: '',
      ingredients: [''],
      steps: [''],
      category: '',
      rating: 0,
      mediaUrl: null,
      mediaType: null
    });
  };

  // Mock user avatar - use a placeholder instead of external URL
  const userAvatar = "/api/placeholder/40/40";

  return (
    <div className="w-full max-w-2xl mx-auto my-4 ">
      {/* Facebook-style post composer */}
      <div className="bg-blue-300 p-4 rounded-lg shadow border border-gray-200">
        <div className="flex items-center space-x-3 mb-3">
          <img src={userAvatar} alt="User" className="w-10 h-10 rounded-full" />
          <button 
            onClick={openModal}
            className="flex-grow bg-gray-100 hover:bg-gray-200 text-gray-500 text-left p-2 rounded-full transition-colors"
          >
            What's cooking? Share a recipe...
          </button>
        </div>
        <div className="flex justify-between pt-3 border-t border-gray-200">
          <button 
            onClick={openModal}
            className="flex items-center text-gray-500 hover:bg-gray-100 px-4 py-1 rounded-md"
          >
            <svg className="w-5 h-5 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Photo/Video
          </button>
          <button 
            onClick={openModal}
            className="flex items-center text-gray-500 hover:bg-gray-100 px-4 py-1 rounded-md"
          >
            <svg className="w-5 h-5 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Tag Friends
          </button>
          <button 
            onClick={openModal}
            className="flex items-center text-gray-500 hover:bg-gray-100 px-4 py-1 rounded-md"
          >
            <svg className="w-5 h-5 mr-1 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Rating
          </button>
        </div>
      </div>

     
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Semi-transparent overlay */}
          <div 
            className="absolute inset-0 bg-blend-color bg-opacity-20" 
            onClick={closeModal}
          ></div>
          
          {/* Modal Content */}
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10 flex items-center justify-between">
              <h2 className="text-xl font-bold">Create Recipe</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Form Content (now a div instead of form) */}
            <div className="p-4 space-y-4">
              {/* User info */}
              <div className="flex items-center space-x-3">
                <img src={userAvatar} alt="User" className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-medium">Jane Doe</p>
                  <div className="flex space-x-2">
                    <select className="text-sm border border-gray-200 rounded-md px-2 py-1 bg-gray-100">
                      <option>Public</option>
                      <option>Friends</option>
                      <option>Only me</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <input
                  type="text"
                  name="title"
                  value={recipe.title}
                  onChange={handleChange}
                  placeholder="Recipe title..."
                  className="w-full text-xl font-medium border-none focus:ring-0 p-0 placeholder-gray-400"
                />
              </div>

              {/* Description */}
              <div>
                <textarea
                  name="description"
                  value={recipe.description}
                  onChange={handleChange}
                  placeholder="Tell everyone about your recipe..."
                  rows={3}
                  className="w-full border-none focus:ring-0 p-0 placeholder-gray-400 resize-none"
                />
              </div>

              {/* Media Upload */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {recipe.mediaUrl ? (
                  <div className="relative">
                    {recipe.mediaType === 'image' ? (
                      <img 
                        src={recipe.mediaUrl} 
                        alt="Preview" 
                        className="w-full h-auto max-h-96 object-cover"
                      />
                    ) : (
                      <video 
                        src={recipe.mediaUrl} 
                        controls 
                        className="w-full h-auto max-h-96 object-cover"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setRecipe(prev => ({ ...prev, mediaUrl: null, mediaType: null }))}
                      className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-8 cursor-pointer">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-gray-500 mt-2">Add Photos/Videos</p>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*, video/*"
                      onChange={handleMediaUpload}
                    />
                  </label>
                )}
              </div>

              {/* Ingredients */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold mb-3">Ingredients</h3>
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <span className="mr-2">•</span>
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => handleIngredientChange(index, e.target.value)}
                      className="flex-grow border-b border-gray-200 focus:border-indigo-500 focus:ring-0 py-1"
                      placeholder={`Ingredient ${index + 1}`}
                    />
                    {recipe.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="ml-2 text-red-500 hover:text-red-700 p-1"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addIngredient}
                  className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Ingredient
                </button>
              </div>

              {/* Steps */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold mb-3">Steps</h3>
                {recipe.steps.map((step, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-start">
                      <span className="font-bold mr-2 mt-1">{index + 1}.</span>
                      <textarea
                        value={step}
                        onChange={(e) => handleStepChange(index, e.target.value)}
                        rows={2}
                        className="flex-grow border-b border-gray-200 focus:border-indigo-500 focus:ring-0 py-1 resize-none"
                        placeholder={`Step ${index + 1}`}
                      />
                      {recipe.steps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeStep(index)}
                          className="ml-2 text-red-500 hover:text-red-700 p-1"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addStep}
                  className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Step
                </button>
              </div>

              {/* Category and Rating */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={recipe.category}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md p-2"
                  >
                    <option value="">Select category</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Snack">Snack</option>
                    <option value="Drink">Drink</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                  <input
                    type="number"
                    name="rating"
                    min="0"
                    max="5"
                    step="0.5"
                    value={recipe.rating}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md p-2"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{error}</span>
                  <button
                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                    onClick={() => setError(null)}
                  >
                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                    </svg>
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Recipe'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeForm;