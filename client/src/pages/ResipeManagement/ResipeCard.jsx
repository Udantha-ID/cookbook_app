import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Heart, MessageSquare, Share2, Bookmark, Clock, User, Trash2 } from 'lucide-react';
import axios from 'axios';

export default function RecipeCard({ recipe = {}, onDelete }) {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(recipe.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, user: "Jane Smith", avatar: "/api/placeholder/40/40", content: "These look amazing! Will try the recipe this weekend.", time: "2h", likes: 3 },
    { id: 2, user: "Robert Lee", avatar: "/api/placeholder/40/40", content: "I made these yesterday. So good!", time: "1d", likes: 8 }
  ]);
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
    imageUrls: recipe.imageUrls || []
  };

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
    <div className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden my-8 transition-all duration-300 hover:shadow-2xl border border-white/20">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 overflow-hidden ring-2 ring-white shadow-lg">
              <img 
                src="/api/placeholder/40/40"
                alt="User profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-md">
              <div className="bg-green-400 rounded-full w-3 h-3"></div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">{recipeData.author}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <Clock size={14} className="mr-1.5" />
              <span>{recipeData.date} • {recipeData.readTime} read</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <button 
            className="p-2 rounded-full hover:bg-white/50 transition-colors"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreHorizontal size={20} className="text-gray-600" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-12 w-56 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl z-10 border border-gray-100">
              <button className="flex items-center w-full px-4 py-3 text-left text-sm hover:bg-gray-50/50 transition-colors">
                <Bookmark size={18} className="mr-3 text-gray-600" />
                Save to collection
              </button>
              <button className="flex items-center w-full px-4 py-3 text-left text-sm hover:bg-gray-50/50 transition-colors">
                <Share2 size={18} className="mr-3 text-gray-600" />
                Share recipe
              </button>
              <div className="border-t border-gray-100">
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex items-center w-full px-4 py-3 text-left text-sm hover:bg-gray-50/50 text-red-500 transition-colors"
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
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold mb-3 text-gray-900">{recipeData.title}</h2>
        <p className="text-gray-600 mb-4 text-lg leading-relaxed">{recipeData.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {recipeData.tags.map((tag, index) => (
            <span key={index} className={`px-3 py-1.5 ${
              index % 3 === 0 ? 'bg-blue-50 text-blue-600' : 
              index % 3 === 1 ? 'bg-green-50 text-green-600' : 
              'bg-purple-50 text-purple-600'
            } text-sm font-medium rounded-full shadow-sm`}>#{tag}</span>
          ))}
        </div>
      </div>

      {/* Recipe images */}
      <div className="relative w-full">
        {recipeData.imageUrls && recipeData.imageUrls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {recipeData.imageUrls.map((imageUrl, index) => {
              const finalUrl = getImageUrl(imageUrl);
              console.log(`Processing image ${index}:`, { original: imageUrl, final: finalUrl });
              
              return (
                <div key={index} className="relative group">
                  <img 
                    src={finalUrl}
                    alt={`Recipe ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={handleImageError}
                    onLoad={() => console.log(`Image ${index} loaded successfully:`, finalUrl)}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg"></div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-4">
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">No images available</span>
            </div>
          </div>
        )}
      </div>

      {/* Stats and actions */}
      <div className="px-6 py-4 bg-gradient-to-r from-amber-50/50 to-orange-50/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-6">
            <button 
              onClick={handleLike}
              className="flex items-center space-x-2 group"
            >
              <div className={`p-2 rounded-full transition-all ${
                isLiked ? 'bg-red-100 text-red-500 scale-110' : 'bg-white text-gray-500 group-hover:bg-gray-100'
              }`}>
                <Heart size={20} className={isLiked ? 'fill-red-500' : ''} />
              </div>
              <span className={`text-base ${isLiked ? 'text-red-500 font-medium' : 'text-gray-600'}`}>{likes}</span>
            </button>
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 group"
            >
              <div className={`p-2 rounded-full transition-all ${
                showComments ? 'bg-blue-100 text-blue-500 scale-110' : 'bg-white text-gray-500 group-hover:bg-gray-100'
              }`}>
                <MessageSquare size={20} />
              </div>
              <span className={`text-base ${showComments ? 'text-blue-500 font-medium' : 'text-gray-600'}`}>{comments.length}</span>
            </button>
          </div>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors bg-white px-4 py-2 rounded-full shadow-sm">
            <Share2 size={18} />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>

        {/* Comments section */}
        {showComments && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            {/* Comment input */}
            <form onSubmit={handleAddComment} className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 overflow-hidden ring-2 ring-white shadow-md">
                <img 
                  src="/api/placeholder/32/32"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm"
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
            <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
              {comments.map((comment) => (
                <div key={comment.id} className="flex group">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 overflow-hidden ring-2 ring-white shadow-sm flex-shrink-0">
                    <img 
                      src={comment.avatar}
                      alt="Commenter avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="bg-white px-4 py-3 rounded-xl shadow-sm">
                      <div className="flex items-center">
                        <span className="font-medium text-sm text-gray-800">{comment.user}</span>
                        <span className="mx-2 text-gray-400">·</span>
                        <span className="text-xs text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-2 ml-4 space-x-4">
                      <button className="hover:text-gray-700 transition-colors">Like</button>
                      <button className="hover:text-gray-700 transition-colors">Reply</button>
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}