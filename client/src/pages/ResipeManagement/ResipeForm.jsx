import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeForm = ({ onRecipeCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: [''],
    steps: [''],
    category: '',
    rating: 0,
    imageFiles: []
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
    const files = Array.from(e.target.files);
    
    // Check if files are images
    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      setError('Please upload only image files');
      return;
    }

    // Create preview URLs for the images
    const newImageFiles = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setRecipe(prev => ({
      ...prev,
      imageFiles: [...prev.imageFiles, ...newImageFiles]
    }));
  };

  // Remove image
  const removeImage = (index) => {
    setRecipe(prev => {
      const newImageFiles = [...prev.imageFiles];
      // Revoke the preview URL to avoid memory leaks
      URL.revokeObjectURL(newImageFiles[index].preview);
      newImageFiles.splice(index, 1);
      return {
        ...prev,
        imageFiles: newImageFiles
      };
    });
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
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create FormData object
      const formData = new FormData();
      
      // Add recipe data
      formData.append('title', recipe.title.trim());
      formData.append('description', recipe.description.trim());
      formData.append('category', recipe.category || '');
      formData.append('rating', recipe.rating || 0);

      // Add ingredients and steps as JSON strings
      const filteredIngredients = recipe.ingredients
        .filter(ing => ing.trim() !== '')
        .map(ing => ing.trim());
      formData.append('ingredients', JSON.stringify(filteredIngredients));

      const filteredSteps = recipe.steps
        .filter(step => step.trim() !== '')
        .map(step => step.trim());
      formData.append('steps', JSON.stringify(filteredSteps));

      // Add image files
      recipe.imageFiles.forEach((imageFile, index) => {
        formData.append('images', imageFile.file);
      });

      console.log('Sending recipe data with images...'); // Debug log

      // Send data to backend
      const response = await axios.post('http://localhost:8095/api/v1/recipe/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.data) {
        console.log('Recipe created successfully:', response.data);
        alert('Recipe saved successfully!');
        closeModal();
        if (onRecipeCreated) {
          onRecipeCreated(); // Notify parent component
        }
      }
    } catch (error) {
      console.error('Error submitting recipe:', error);
      if (error.code === 'ERR_NETWORK') {
        setError('Unable to connect to the server. Please check if the server is running at http://localhost:8095');
      } else if (error.response) {
        const errorMessage = error.response.data || 'Server error occurred';
        setError(typeof errorMessage === 'string' ? errorMessage : 'Failed to save recipe. Please try again.');
        console.error('Server error details:', error.response.data);
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
      imageFiles: []
    });
  };

  // Mock user avatar - use a placeholder instead of external URL
  const userAvatar = "/api/placeholder/40/40";

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      recipe.imageFiles.forEach(imageFile => {
        URL.revokeObjectURL(imageFile.preview);
      });
    };
  }, [recipe.imageFiles]);

  // Update the image preview section in the render
  const renderImagePreview = () => (
    <div className="grid grid-cols-2 gap-4 p-4">
      {recipe.imageFiles.map((imageFile, index) => (
        <div key={index} className="relative group">
          <img 
            src={imageFile.preview} 
            alt={`Preview ${index + 1}`} 
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={() => removeImage(index)}
            className="absolute top-2 right-2 bg-white/90 text-gray-700 rounded-full p-1.5 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );

  // Update the media upload section in the render
  const renderMediaUpload = () => (
    <div className="border-2 border-dashed border-gray-200 rounded-xl overflow-hidden hover:border-blue-400 transition-colors">
      {recipe.imageFiles.length > 0 ? (
        renderImagePreview()
      ) : (
        <label className="flex flex-col items-center justify-center p-8 cursor-pointer">
          <div className="p-4 rounded-full bg-blue-50 text-blue-500 mb-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">Add Photos</p>
          <p className="text-sm text-gray-400 mt-1">Drag and drop or click to browse</p>
          <input
            type="file"
            className="sr-only"
            accept="image/*"
            multiple
            onChange={handleMediaUpload}
          />
        </label>
      )}
    </div>
  );

  return (
  <div className="w-full max-w-2xl mx-auto my-6">
    {/* Recipe Share Card */}
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3 mb-4">
        <img 
          src={userAvatar} 
          alt="User" 
          className="w-11 h-11 rounded-full border-2 border-white shadow-sm"
        />
        <button 
          onClick={openModal}
          className="flex-grow bg-gray-50 hover:bg-gray-100 text-gray-600 text-left p-3 rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300"
        >
          <span className="text-gray-500">What's cooking today? Share your recipe...</span>
        </button>
      </div>
      
      <div className="flex justify-between pt-3 border-t border-gray-100">
        <button 
          onClick={openModal}
          className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 px-4 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <div className="p-1.5 rounded-full bg-blue-100 text-blue-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-sm font-medium">Media</span>
        </button>
        
        <button 
          onClick={openModal}
          className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 px-4 py-1.5 rounded-lg hover:bg-purple-50 transition-colors"
        >
          <div className="p-1.5 rounded-full bg-purple-100 text-purple-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="text-sm font-medium">Tag Friends</span>
        </button>
        
        <button 
          onClick={openModal}
          className="flex items-center space-x-2 text-gray-500 hover:text-amber-600 px-4 py-1.5 rounded-lg hover:bg-amber-50 transition-colors"
        >
          <div className="p-1.5 rounded-full bg-amber-100 text-amber-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <span className="text-sm font-medium">Rating</span>
        </button>
      </div>
    </div>

    {/* Modal */}
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm" 
          onClick={closeModal}
        ></div>
        
        {/* Modal Content */}
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 transform transition-all duration-300 scale-95 hover:scale-100">
          {/* Modal Header */}
          <div className="p-5 border-b border-gray-100 sticky top-0 bg-white z-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Create Recipe</h2>
              <p className="text-sm text-gray-500">Share your culinary creation with the community</p>
            </div>
            <button 
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Form Content */}
          <div className="p-5 space-y-6">
            {/* User info */}
            <div className="flex items-center space-x-4">
              <img src={userAvatar} alt="User" className="w-12 h-12 rounded-full border-2 border-white shadow" />
              <div>
                <p className="font-medium text-gray-800">Jane Doe</p>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Public</option>
                  <option>Friends</option>
                  <option>Only me</option>
                </select>
              </div>
            </div>

            {/* Title */}
            <div className="border-b border-gray-100 pb-2">
              <input
                type="text"
                name="title"
                value={recipe.title}
                onChange={handleChange}
                placeholder="Give your recipe a name..."
                className="w-full text-2xl font-bold border-none focus:ring-0 p-0 placeholder-gray-300"
              />
            </div>

            {/* Description */}
            <div className="border-b border-gray-100 pb-4">
              <textarea
                name="description"
                value={recipe.description}
                onChange={handleChange}
                placeholder="Describe your recipe (what makes it special?)"
                rows={2}
                className="w-full border-none focus:ring-0 p-0 placeholder-gray-300 resize-none text-gray-600"
              />
            </div>

            {/* Media Upload */}
            {renderMediaUpload()}

            {/* Ingredients */}
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2">1</span>
                Ingredients
              </h3>
              <div className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-5 h-5 rounded-full border border-gray-300 mr-3 flex-shrink-0"></span>
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => handleIngredientChange(index, e.target.value)}
                      className="flex-grow bg-transparent border-b border-gray-200 focus:border-blue-500 focus:ring-0 py-1 placeholder-gray-400"
                      placeholder={`Ingredient ${index + 1}`}
                    />
                    {recipe.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="ml-3 text-gray-400 hover:text-red-500 p-1 transition-colors"
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
                  className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Ingredient
                </button>
              </div>
            </div>

            {/* Steps */}
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2">2</span>
                Instructions
              </h3>
              <div className="space-y-4">
                {recipe.steps.map((step, index) => (
                  <div key={index} className="flex">
                    <span className="font-bold text-gray-500 mr-3 mt-1">{index + 1}.</span>
                    <div className="flex-grow">
                      <textarea
                        value={step}
                        onChange={(e) => handleStepChange(index, e.target.value)}
                        rows={3}
                        className="w-full bg-white border border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 placeholder-gray-400"
                        placeholder={`Describe step ${index + 1}`}
                      />
                      {recipe.steps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeStep(index)}
                          className="mt-1 text-sm text-red-500 hover:text-red-700 flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove Step
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addStep}
                  className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Step
                </button>
              </div>
            </div>

            {/* Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2">3</span>
                  Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      name="category"
                      value={recipe.category}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRecipe(prev => ({ ...prev, rating: star }))}
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${recipe.rating >= star ? 'bg-amber-100 text-amber-500' : 'bg-gray-100 text-gray-400'}`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2">4</span>
                  Additional Info
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Minutes"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                    <select className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0 text-red-500">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                  <button
                    className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg p-1.5 hover:bg-red-100"
                    onClick={() => setError(null)}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="sticky bottom-0 bg-white pt-4 pb-2 border-t border-gray-100">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publishing Recipe...
                  </span>
                ) : 'Publish Recipe'}
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