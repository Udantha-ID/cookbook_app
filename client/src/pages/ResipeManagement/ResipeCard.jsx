import { useState } from 'react';
import { MoreHorizontal, Heart, MessageSquare, Share2, Bookmark, Clock, User } from 'lucide-react';

export default function RecipeCard() {
  const [likes, setLikes] = useState(189);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, user: "Jane Smith", avatar: "/api/placeholder/40/40", content: "These look amazing! Will try the recipe this weekend.", time: "2h", likes: 3 },
    { id: 2, user: "Robert Lee", avatar: "/api/placeholder/40/40", content: "I made these yesterday. So good!", time: "1d", likes: 8 }
  ]);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
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

  return (
    <div className="max-w-fit mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-6 transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 overflow-hidden">
              <img 
                src="/api/placeholder/40/40"
                alt="User profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
              <div className="bg-green-400 rounded-full w-3 h-3"></div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Mike Johnson</h3>
            <div className="flex items-center text-xs text-gray-500">
              <Clock size={12} className="mr-1" />
              <span>Mar 14, 2024 • 30 min read</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreHorizontal size={18} />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-xl z-10 border border-gray-100">
              <button className="flex items-center w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors">
                <Bookmark size={16} className="mr-2" />
                Save to collection
              </button>
              <button className="flex items-center w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors">
                <Share2 size={16} className="mr-2" />
                Share recipe
              </button>
              <div className="border-t border-gray-100">
                <button className="flex items-center w-full px-4 py-3 text-left text-sm hover:bg-gray-50 text-red-500 transition-colors">
                  <User size={16} className="mr-2" />
                  Unfollow author
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-2">
        <h2 className="text-xl font-bold mb-2 text-gray-900">Chocolate Chip Cookies</h2>
        <p className="text-gray-600 mb-3">Soft and chewy cookies with melty chocolate chips. Perfect for any occasion!</p>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">#dessert</span>
          <span className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded-full">#baking</span>
          <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full">#easy</span>
        </div>
      </div>

      {/* Recipe image */}
      <div className="relative w-full h-64 overflow-hidden group">
        <img 
          src="/api/placeholder/600/400" 
          alt="Chocolate chip cookies" 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button 
          onClick={handleSave}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${isSaved ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-white'}`}
        >
          <Bookmark size={18} className={isSaved ? 'fill-white' : ''} />
        </button>
      </div>

      {/* Stats and actions */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLike}
              className="flex items-center space-x-1 group"
            >
              <div className={`p-1.5 rounded-full transition-colors ${isLiked ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>
                <Heart size={18} className={isLiked ? 'fill-red-500' : ''} />
              </div>
              <span className={`text-sm ${isLiked ? 'text-red-500 font-medium' : 'text-gray-500'}`}>{likes}</span>
            </button>
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1 group"
            >
              <div className={`p-1.5 rounded-full transition-colors ${showComments ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>
                <MessageSquare size={18} />
              </div>
              <span className={`text-sm ${showComments ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>{comments.length}</span>
            </button>
          </div>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors">
            <Share2 size={18} />
            <span className="text-sm">Share</span>
          </button>
        </div>

        {/* Comments section */}
        {showComments && (
          <div className="mt-4 border-t border-gray-100 pt-3">
            {/* Comment input */}
            <form onSubmit={handleAddComment} className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 overflow-hidden">
                <img 
                  src="/api/placeholder/32/32"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button 
                  type="submit"
                  disabled={!newComment.trim()}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-sm px-3 py-1 rounded-full transition-colors ${newComment.trim() ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-gray-400 cursor-not-allowed'}`}
                >
                  Post
                </button>
              </div>
            </form>

            {/* Comment list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {comments.map((comment) => (
                <div key={comment.id} className="flex group">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    <img 
                      src={comment.avatar}
                      alt="Commenter avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-2 flex-1 min-w-0">
                    <div className="bg-gray-50 px-3 py-2 rounded-lg inline-block">
                      <div className="flex items-center">
                        <span className="font-medium text-sm text-gray-800">{comment.user}</span>
                        <span className="mx-2 text-gray-400">·</span>
                        <span className="text-xs text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-0.5">{comment.content}</p>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1 ml-3 space-x-3">
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