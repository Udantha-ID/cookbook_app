import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Heart, MessageSquare, Share2, Bookmark, Clock, User, Trash2, Edit } from 'lucide-react';
import axios from 'axios';

export default function RecipeCard({ recipe = {}, onDelete, onUpdate }) {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(recipe.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Default values for recipe
  const recipeData = {
    id: recipe.id || '1',
    title: recipe.title || 'Chocolate Chip Cookies',
    description: recipe.description || 'Soft and chewy cookies with melty chocolate chips. Perfect for any occasion!',
    author: recipe.author || 'Mike Johnson',
    date: recipe.date || 'Mar 14, 2024',
    readTime: recipe.readTime || '30 min',
    tags: recipe.tags || ['dessert', 'baking', 'easy'],
    imageUrls: recipe.imageUrls || [],
    ingredients: recipe.ingredients || [],
    steps: recipe.steps || [],
    category: recipe.category || '',
    rating: recipe.rating || 0,
    avatarComponent: recipe.avatarComponent
  };

  // Edit recipe state
  const [editRecipe, setEditRecipe] = useState({
    title: recipeData.title,
    description: recipeData.description,
    ingredients: recipeData.ingredients.length > 0 ? [...recipeData.ingredients] : [''],
    steps: recipeData.steps.length > 0 ? [...recipeData.steps] : [''],
    category: recipeData.category,
    rating: recipeData.rating,
    imageFiles: []
  });

  // Handle edit text input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRecipe(prev => ({ ...prev, [name]: value }));
  };

  // Handle ingredient list changes
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...editRecipe.ingredients];
    newIngredients[index] = value;
    setEditRecipe(prev => ({ ...prev, ingredients: newIngredients }));
  };

  // Handle step list changes
  const handleStepChange = (index, value) => {
    const newSteps = [...editRecipe.steps];
    newSteps[index] = value;
    setEditRecipe(prev => ({ ...prev, steps: newSteps }));
  };

  // Add new ingredient field
  const addIngredient = () => {
    setEditRecipe(prev => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
  };

  // Add new step field
  const addStep = () => {
    setEditRecipe(prev => ({ ...prev, steps: [...prev.steps, ''] }));
  };

  // Remove ingredient field
  const removeIngredient = (index) => {
    const newIngredients = editRecipe.ingredients.filter((_, i) => i !== index);
    setEditRecipe(prev => ({ ...prev, ingredients: newIngredients }));
  };

  // Remove step field
  const removeStep = (index) => {
    const newSteps = editRecipe.steps.filter((_, i) => i !== index);
    setEditRecipe(prev => ({ ...prev, steps: newSteps }));
  };

  // Handle media upload for edit
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

    setEditRecipe(prev => ({
      ...prev,
      imageFiles: [...prev.imageFiles, ...newImageFiles]
    }));
  };

  // Remove image from edit form
  const removeImage = (index) => {
    setEditRecipe(prev => {
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

  // Validate edit form before submission
  const validateForm = () => {
    if (!editRecipe.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!editRecipe.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (editRecipe.ingredients.length === 0 || editRecipe.ingredients.some(ing => !ing.trim())) {
      setError('At least one ingredient is required');
      return false;
    }
    if (editRecipe.steps.length === 0 || editRecipe.steps.some(step => !step.trim())) {
      setError('At least one step is required');
      return false;
    }
    if (!editRecipe.category) {
      setError('Category is required');
      return false;
    }
    return true;
  };

  // Open edit modal
  const openEditModal = () => {
    setEditRecipe({
      title: recipeData.title,
      description: recipeData.description,
      ingredients: recipeData.ingredients.length > 0 ? [...recipeData.ingredients] : [''],
      steps: recipeData.steps.length > 0 ? [...recipeData.steps] : [''],
      category: recipeData.category,
      rating: recipeData.rating,
      imageFiles: []
    });
    setIsEditMode(true);
    setShowMenu(false);
  };

  // Close edit modal
  const closeEditModal = () => {
    setIsEditMode(false);
    setError(null);
    // Clean up any preview URLs
    editRecipe.imageFiles.forEach(imageFile => {
      URL.revokeObjectURL(imageFile.preview);
    });
  };

  // Handle update submission
  const handleUpdate = async (e) => {
    if (e) e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsUpdating(true);
    setError(null);
    
    try {
      // First, let's check if we have new images to upload
      const hasNewImages = editRecipe.imageFiles.length > 0;
      let updatedImageUrls = [...recipeData.imageUrls]; // Keep existing images by default
      
      // If there are new images, upload them first
      if (hasNewImages) {
        try {
          const imageFormData = new FormData();
          editRecipe.imageFiles.forEach((imageFile) => {
            imageFormData.append('images', imageFile.file);
          });
          
          // Upload images separately
          const imagesResponse = await axios.post(
            'http://localhost:8095/api/v1/recipe/upload-images', 
            imageFormData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              }
            }
          );
          
          if (imagesResponse.data && Array.isArray(imagesResponse.data)) {
            // Replace image URLs with newly uploaded ones
            updatedImageUrls = imagesResponse.data;
          }
        } catch (imageError) {
          console.error('Error uploading images:', imageError);
          setError('Failed to upload images. Update canceled.');
          setIsUpdating(false);
          return;
        }
      }
      
      // Now prepare the JSON data for update
      const updatedRecipeData = {
        id: recipeData.id,
        title: editRecipe.title.trim(),
        description: editRecipe.description.trim(),
        category: editRecipe.category || '',
        rating: editRecipe.rating || 0,
        ingredients: editRecipe.ingredients
          .filter(ing => ing.trim() !== '')
          .map(ing => ing.trim()),
        steps: editRecipe.steps
          .filter(step => step.trim() !== '')
          .map(step => step.trim()),
        imageUrls: updatedImageUrls
      };

      console.log('Sending updated recipe data:', updatedRecipeData); // Debug log

      // Send the update as JSON
      const response = await axios.put(
        `http://localhost:8095/api/v1/recipe/update/${recipeData.id}`, 
        updatedRecipeData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data) {
        console.log('Recipe updated successfully:', response.data);
        alert('Recipe updated successfully!');
        // Call onUpdate callback if provided
        if (onUpdate && typeof onUpdate === 'function') {
          onUpdate(response.data);
        }
        closeEditModal();
      }
    } catch (error) {
      console.error('Error updating recipe:', error);
      if (error.code === 'ERR_NETWORK') {
        setError('Unable to connect to the server. Please check if the server is running at http://localhost:8095');
      } else if (error.response) {
        const errorMessage = error.response.data?.error || error.response.data || 'Server error occurred';
        setError(typeof errorMessage === 'string' ? errorMessage : 'Failed to update recipe. Please try again.');
        console.error('Server error details:', error.response.data);
      } else if (error.request) {
        setError('No response from server. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsUpdating(false);
    }
  };

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      if (editRecipe.imageFiles) {
        editRecipe.imageFiles.forEach(imageFile => {
          if (imageFile.preview) URL.revokeObjectURL(imageFile.preview);
        });
      }
    };
  }, [editRecipe.imageFiles]);

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        setIsDeleting(true);
        await axios.delete(`http://localhost:8095/api/v1/recipe/delete/${recipe.id}`);
        if (onDelete) {
          onDelete(recipe.id);
        }
      } catch (error) {
        console.error('Error deleting recipe:', error);
        alert('Failed to delete recipe. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      setComments([{
        id: comments.length + 1,
        user: "You",
        avatar: "/api/placeholder/40/40",
        content: newComment,
        time: "now",
        likes: 0
      }, ...comments]);
      setNewComment("");
    }
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const navigateToDetail = (e) => {
    e.preventDefault();
    navigate(`/recipe/${recipeData.id}`);
  };

  // Function to handle image error
  const handleImageError = (e) => {
    console.error('Image failed to load:', e.target.src);
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23CCCCCC'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z'/%3E%3C/svg%3E";
    e.target.className = "w-full h-48 object-contain bg-gray-100 p-2 rounded-lg";
  };

  // Function to get correct image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    
    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // If it's a relative path starting with /uploads, add the base URL
    if (imageUrl.startsWith('/uploads')) {
      return `http://localhost:8095${imageUrl}`;
    }
    
    // If it's just a filename, assume it's in uploads directory
    return `http://localhost:8095/uploads/${imageUrl}`;
  };

  // Debug log for images
  console.log('Recipe image URLs:', recipeData.imageUrls);

  return (
    <div className="w-full max-w-3xl mx-auto bg-gradient-to-b from-white to-amber-50/30 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden my-8 transition-all duration-300 hover:shadow-2xl border border-amber-100/50">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-amber-100/50 via-amber-50 to-orange-50/50 border-b border-amber-100/40">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 overflow-hidden ring-2 ring-amber-100 shadow-lg">
              {recipeData.avatarComponent ? (
                recipeData.avatarComponent
              ) : (
                <div className="flex items-center justify-center w-full h-full text-white font-bold text-lg">
                  {recipeData.author.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-md">
              <div className="bg-green-400 rounded-full w-3 h-3"></div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">{recipeData.author}</h3>
            <div className="flex items-center text-sm text-amber-700/80">
              <Clock size={14} className="mr-1.5" />
              <span>{recipeData.date} • {recipeData.readTime} read</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <button 
            className="p-2.5 rounded-full hover:bg-amber-100/60 transition-colors"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreHorizontal size={20} className="text-amber-800" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-12 w-56 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg z-10 border border-amber-100 overflow-hidden">
              <button className="flex items-center w-full px-4 py-3 text-left text-sm hover:bg-amber-50/70 transition-colors">
                <Bookmark size={18} className="mr-3 text-amber-600" />
                Save to collection
              </button>
              <button className="flex items-center w-full px-4 py-3 text-left text-sm hover:bg-amber-50/70 transition-colors">
                <Share2 size={18} className="mr-3 text-amber-600" />
                Share recipe
              </button>
              <button 
                onClick={openEditModal}
                className="flex items-center w-full px-4 py-3 text-left text-sm hover:bg-amber-50/70 transition-colors"
              >
                <Edit size={18} className="mr-3 text-amber-600" />
                Edit Recipe
              </button>
              <div className="border-t border-amber-100">
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex items-center w-full px-4 py-3 text-left text-sm hover:bg-red-50 text-red-500 transition-colors"
                >
                  <Trash2 size={18} className="mr-3" />
                  <span>{isDeleting ? 'Deleting...' : 'Delete Recipe'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-5">
        <h2 className="text-2xl font-bold mb-3 text-amber-900">{recipeData.title}</h2>
        <p className="text-gray-700 mb-4 text-lg leading-relaxed">{recipeData.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {recipeData.tags.map((tag, index) => (
            <span key={index} className={`px-3 py-1.5 ${
              index % 3 === 0 ? 'bg-amber-100 text-amber-800' : 
              index % 3 === 1 ? 'bg-orange-100 text-orange-800' : 
              'bg-emerald-100 text-emerald-800'
            } text-sm font-medium rounded-full shadow-sm border border-opacity-50 ${
              index % 3 === 0 ? 'border-amber-200' : 
              index % 3 === 1 ? 'border-orange-200' : 
              'border-emerald-200'
            }`}>#{tag}</span>
          ))}
        </div>
      </div>

      {/* Recipe images */}
      <div className="relative w-full px-6 py-2">
        {recipeData.imageUrls && recipeData.imageUrls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipeData.imageUrls.map((imageUrl, index) => {
              const finalUrl = getImageUrl(imageUrl);
              console.log(`Processing image ${index}:`, { original: imageUrl, final: finalUrl });
              
              return (
                <div key={index} className="relative group overflow-hidden rounded-xl shadow-md">
                  <img 
                    src={finalUrl}
                    alt={`Recipe ${index + 1}`}
                    className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    onError={handleImageError}
                    onLoad={() => console.log(`Image ${index} loaded successfully:`, finalUrl)}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden">
            <div className="w-full h-48 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100">
              <span className="text-amber-500 flex flex-col items-center">
                <svg className="w-10 h-10 mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>No images available</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Stats and actions */}
      <div className="px-6 py-5 bg-gradient-to-r from-amber-50/70 to-orange-50/70 border-t border-amber-100/40">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-6">
            <button 
              onClick={handleLike}
              className="flex items-center space-x-2 group"
            >
              <div className={`p-2 rounded-full transition-all ${
                isLiked ? 'bg-red-100 text-red-500 scale-110' : 'bg-white text-amber-600 group-hover:bg-amber-100'
              }`}>
                <Heart size={20} className={isLiked ? 'fill-red-500' : ''} />
              </div>
              <span className={`text-base ${isLiked ? 'text-red-500 font-medium' : 'text-amber-600'}`}>{likes}</span>
            </button>
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 group"
            >
              <div className={`p-2 rounded-full transition-all ${
                showComments ? 'bg-amber-200 text-amber-700 scale-110' : 'bg-white text-amber-600 group-hover:bg-amber-100'
              }`}>
                <MessageSquare size={20} />
              </div>
              <span className={`text-base ${showComments ? 'text-amber-700 font-medium' : 'text-amber-600'}`}>{comments.length}</span>
            </button>
          </div>
          <button className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-amber-200 hover:border-amber-300">
            <Share2 size={18} />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>

        {/* Comments section */}
        {showComments && (
          <div className="mt-4 border-t border-amber-100/50 pt-4">
            {/* Comment input */}
            <form onSubmit={handleAddComment} className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 overflow-hidden ring-2 ring-amber-50 shadow-md">
                <div className="flex items-center justify-center w-full h-full text-white font-bold text-lg">
                  Y
                </div>
              </div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm border border-amber-100"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button 
                  type="submit"
                  disabled={!newComment.trim()}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-sm px-4 py-1.5 rounded-full transition-all ${
                    newComment.trim() 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-md' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Post
                </button>
              </div>
            </form>

            {/* Comment list */}
            <div className="space-y-4 max-h-72 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-200 scrollbar-track-amber-50">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="flex group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 overflow-hidden ring-2 ring-amber-50 shadow-sm flex-shrink-0">
                      <div className="flex items-center justify-center w-full h-full text-white font-bold text-sm">
                        {comment.user.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-amber-50">
                        <div className="flex items-center">
                          <span className="font-medium text-sm text-amber-900">{comment.user}</span>
                          <span className="mx-2 text-amber-300">·</span>
                          <span className="text-xs text-amber-500">{comment.time}</span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                      </div>
                      <div className="flex items-center text-xs text-amber-500 mt-2 ml-4 space-x-4">
                        <button className="hover:text-amber-700 transition-colors">Like</button>
                        <button className="hover:text-amber-700 transition-colors">Reply</button>
                        {comment.user === "You" && (
                          <button 
                            className="text-red-500 hover:text-red-700 transition-colors"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-amber-50/50 rounded-xl">
                  <div className="mx-auto w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-amber-700">No comments yet. Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Edit Recipe Modal */}
      {isEditMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-amber-950/40 backdrop-blur-sm" 
            onClick={closeEditModal}
          ></div>
          
          {/* Modal Content */}
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 transform transition-all duration-300 scale-95 hover:scale-100 border border-amber-100">
            {/* Modal Header */}
            <div className="p-5 border-b border-amber-100 sticky top-0 bg-gradient-to-r from-amber-50 to-orange-50 z-10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-amber-900">Edit Recipe</h2>
                <p className="text-sm text-amber-600">Update your culinary masterpiece</p>
              </div>
              <button 
                onClick={closeEditModal}
                className="text-amber-500 hover:text-amber-700 p-1 rounded-full hover:bg-amber-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Form Content */}
            <div className="p-5 space-y-6 bg-gradient-to-b from-white to-amber-50/30">
              {/* Author info */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-tr from-amber-400 to-orange-500 border-2 border-amber-200 shadow">
                  {recipeData.avatarComponent ? (
                    recipeData.avatarComponent
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-white font-bold text-lg">
                      {recipeData.author.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-amber-900">{recipeData.author}</p>
                  <select className="text-sm border border-amber-200 rounded-lg px-3 py-1 bg-amber-50 focus:ring-2 focus:ring-amber-300 focus:border-transparent">
                    <option>Public</option>
                    <option>Friends</option>
                    <option>Only me</option>
                  </select>
                </div>
              </div>

              {/* Title */}
              <div className="border-b border-amber-100 pb-2">
                <input
                  type="text"
                  name="title"
                  value={editRecipe.title}
                  onChange={handleEditChange}
                  placeholder="Recipe name"
                  className="w-full text-2xl font-bold border-none focus:ring-0 p-0 placeholder-amber-300 bg-transparent text-amber-900"
                />
              </div>

              {/* Description */}
              <div className="border-b border-amber-100 pb-4">
                <textarea
                  name="description"
                  value={editRecipe.description}
                  onChange={handleEditChange}
                  placeholder="Recipe description"
                  rows={2}
                  className="w-full border-none focus:ring-0 p-0 placeholder-amber-300 resize-none text-gray-700 bg-transparent"
                />
              </div>

              {/* Media Upload */}
              <div className="border-2 border-dashed border-amber-200 rounded-xl overflow-hidden hover:border-amber-400 transition-colors">
                {editRecipe.imageFiles.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 p-4">
                    {editRecipe.imageFiles.map((imageFile, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={imageFile.preview} 
                          alt={`Preview ${index + 1}`} 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-white/90 text-amber-700 rounded-full p-1.5 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-8 cursor-pointer">
                    <div className="p-4 rounded-full bg-amber-100 text-amber-600 mb-3">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-amber-700 font-medium">Add Photos</p>
                    <p className="text-sm text-amber-500 mt-1">Drag and drop or click to browse</p>
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
              
              {/* Existing Images */}
              {recipeData.imageUrls && recipeData.imageUrls.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-amber-800 mb-2">Current Images</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {recipeData.imageUrls.map((imageUrl, index) => {
                      const finalUrl = getImageUrl(imageUrl);
                      return (
                        <div key={`existing-${index}`} className="relative group">
                          <img 
                            src={finalUrl}
                            alt={`Recipe ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg border border-amber-200"
                            onError={handleImageError}
                          />
                          <div className="absolute inset-0 bg-amber-900/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                            <span className="text-white bg-amber-800/70 px-3 py-1 rounded text-sm">Current image</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-sm text-amber-600 mt-2">
                    These are your current images. Upload new ones to replace them.
                  </p>
                </div>
              )}

              {/* Ingredients */}
              <div className="bg-amber-50/70 rounded-xl p-5 border border-amber-100">
                <h3 className="font-bold text-lg text-amber-900 mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center mr-2">1</span>
                  Ingredients
                </h3>
                <div className="space-y-3">
                  {editRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-5 h-5 rounded-full border border-amber-300 mr-3 flex-shrink-0"></span>
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => handleIngredientChange(index, e.target.value)}
                        className="flex-grow bg-transparent border-b border-amber-200 focus:border-amber-500 focus:ring-0 py-1 placeholder-amber-300 text-amber-900"
                        placeholder={`Ingredient ${index + 1}`}
                      />
                      {editRecipe.ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="ml-3 text-amber-400 hover:text-red-500 p-1 transition-colors"
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
                    className="mt-3 text-amber-600 hover:text-amber-800 text-sm font-medium flex items-center"
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Ingredient
                  </button>
                </div>
              </div>

              {/* Steps */}
              <div className="bg-amber-50/70 rounded-xl p-5 border border-amber-100">
                <h3 className="font-bold text-lg text-amber-900 mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center mr-2">2</span>
                  Instructions
                </h3>
                <div className="space-y-4">
                  {editRecipe.steps.map((step, index) => (
                    <div key={index} className="flex">
                      <span className="font-bold text-amber-600 mr-3 mt-1">{index + 1}.</span>
                      <div className="flex-grow">
                        <textarea
                          value={step}
                          onChange={(e) => handleStepChange(index, e.target.value)}
                          rows={3}
                          className="w-full bg-white border border-amber-200 rounded-lg p-3 focus:border-amber-500 focus:ring-1 focus:ring-amber-200 placeholder-amber-300 text-amber-900"
                          placeholder={`Describe step ${index + 1}`}
                        />
                        {editRecipe.steps.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeStep(index)}
                            className="mt-1 text-sm text-amber-600 hover:text-red-600 flex items-center"
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
                    className="mt-3 text-amber-600 hover:text-amber-800 text-sm font-medium flex items-center"
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Step
                  </button>
                </div>
              </div>

              {/* Meta Information */}
              <div className="bg-amber-50/70 rounded-xl p-5 border border-amber-100">
                <h3 className="font-bold text-lg text-amber-900 mb-3 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center mr-2">3</span>
                  Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-amber-700 mb-1">Category</label>
                    <select
                      name="category"
                      value={editRecipe.category}
                      onChange={handleEditChange}
                      className="w-full border border-amber-200 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-300 focus:border-transparent bg-white text-amber-900"
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
                    <label className="block text-sm font-medium text-amber-700 mb-1">Rating</label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setEditRecipe(prev => ({ ...prev, rating: star }))}
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${editRecipe.rating >= star ? 'bg-amber-100 text-amber-500' : 'bg-gray-100 text-gray-400'}`}
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
              <div className="sticky bottom-0 bg-white pt-4 pb-2 border-t border-amber-100">
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-70"
                >
                  {isUpdating ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating Recipe...
                    </span>
                  ) : 'Update Recipe'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}