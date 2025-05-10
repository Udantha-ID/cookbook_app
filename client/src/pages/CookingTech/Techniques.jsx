import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, ChevronDown, ChevronUp, 
  Award, Heart, MessageCircle, Bookmark, 
  Edit, Trash2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { techniqueService } from '../../services/techniqueService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Techniques = () => {
  const navigate = useNavigate();
  const [techniques, setTechniques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchTechniques();
  }, []);

  const fetchTechniques = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await techniqueService.getAllTechniques();
      setTechniques(data.map(tech => ({
        ...tech,
        comments: tech.comments || [],
        likes: tech.likes || 0,
        saved: tech.saved || false,
        steps: tech.steps || [],
        author: tech.author || { name: 'Anonymous' }
      })));
    } catch (err) {
      setError('Failed to load techniques');
      toast.error('Failed to fetch techniques');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleLike = (id) => {
    setTechniques(techniques.map(tech => 
      tech.techniqueId === id ? { 
        ...tech, 
        likes: (tech.likes || 0) + 1 
      } : tech
    ));
  };

  const handleComment = (id) => {
    if (!newComment.trim()) return;
    
    setTechniques(techniques.map(tech => 
      tech.techniqueId === id ? { 
        ...tech, 
        comments: [...(tech.comments || []), newComment] 
      } : tech
    ));
    setNewComment('');
  };

  const handleSave = (id) => {
    setTechniques(techniques.map(tech => 
      tech.techniqueId === id ? { 
        ...tech, 
        saved: !tech.saved 
      } : tech
    ));
  };

  const handleEdit = (id) => {
    navigate(`/edit-technique/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this technique?')) return;
    
    try {
      await techniqueService.deleteTechnique(id);
      setTechniques(techniques.filter(tech => tech.techniqueId !== id));
      toast.success('Technique deleted');
    } catch (err) {
      toast.error('Delete failed');
      console.error('Delete error:', err);
    }
  };

  const filteredTechniques = techniques.filter(tech => {
    const matchesSearch = tech.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tech.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || tech.difficultyLevel === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400 mx-auto mb-4"></div>
          <p className="text-sky-600/80">Loading techniques...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-sky-900 mb-4">Error Loading Techniques</h2>
          <p className="text-sky-600/80 mb-6">{error}</p>
          <button
            onClick={fetchTechniques}
            className="bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-500 hover:to-indigo-500 text-white py-2.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            COOKING TECHNIQUES
          </h1>
          
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={20} className="text-sky-400" />
            </div>
            <input
              type="text"
              placeholder="Search techniques..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border border-sky-100 rounded-xl bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            />
          </div>
          
          <div className="relative">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="appearance-none w-full py-3.5 px-4 pr-12 border border-sky-100 rounded-xl bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <Filter size={18} className="text-sky-400" />
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/add-technique')}
            className="whitespace-nowrap bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-500 hover:to-indigo-500 text-white py-3.5 px-8 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Submit Technique
          </button>
        </motion.div>

        {/* Techniques List */}
        <motion.div 
          className="space-y-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredTechniques.length > 0 ? (
            filteredTechniques.map((technique) => (
              <motion.div key={technique.techniqueId} variants={itemVariants}>
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all border border-sky-100">
                  {/* Technique Header */}
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => toggleExpanded(technique.techniqueId)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${
                          technique.difficultyLevel === 'beginner' 
                            ? 'bg-sky-50 text-sky-500' 
                            : technique.difficultyLevel === 'intermediate'
                            ? 'bg-indigo-50 text-indigo-500'
                            : 'bg-purple-50 text-purple-500'
                        }`}>
                          <Award size={24} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-sky-900">
                            {technique.title || 'Untitled Technique'}
                          </h3>
                          <div className="flex items-center text-sm text-sky-600/80">
                            <span className="capitalize">{technique.difficultyLevel || 'unknown'}</span>
                            <span className="mx-2">·</span>
                            <span>By {technique.author?.name || 'Anonymous'}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        {expandedId === technique.techniqueId ? (
                          <ChevronUp size={24} className="text-sky-400" />
                        ) : (
                          <ChevronDown size={24} className="text-sky-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: expandedId === technique.techniqueId ? 'auto' : 0,
                      opacity: expandedId === technique.techniqueId ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-sky-100">
                      <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Column */}
                        <div className="lg:w-1/3">
                          {technique.imageUrl && (
                            <div className="mb-6 rounded-xl overflow-hidden shadow-md">
                              <img
                                src={technique.imageUrl}
                                alt={technique.title}
                                className="w-full h-56 object-cover"
                              />
                            </div>
                          )}
                          <p className="text-sky-700/80 mb-6 leading-relaxed">
                            {technique.description || 'No description provided.'}
                          </p>
                          
                          {/* Interaction Buttons */}
                          <div className="flex items-center space-x-6 mb-6">
                            <button 
                              onClick={() => handleLike(technique.techniqueId)}
                              className="flex items-center space-x-2 text-sky-600/80 hover:text-sky-500 transition-colors"
                            >
                              <Heart size={20} fill={technique.likes > 0 ? "currentColor" : "none"} />
                              <span>{technique.likes || 0}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-sky-600/80 hover:text-sky-500 transition-colors">
                              <MessageCircle size={20} />
                              <span>{technique.comments?.length || 0}</span>
                            </button>
                            <button 
                              onClick={() => handleSave(technique.techniqueId)}
                              className="flex items-center space-x-2 text-sky-600/80 hover:text-sky-500 transition-colors"
                            >
                              <Bookmark size={20} fill={technique.saved ? "currentColor" : "none"} />
                              <span>{technique.saved ? "Saved" : "Save"}</span>
                            </button>
                          </div>

                          {/* Comments Section */}
                          <div className="mt-6">
                            <input
                              type="text"
                              placeholder="Add a comment..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              className="w-full py-2.5 px-4 border border-sky-100 rounded-xl bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                            />
                            <button
                              onClick={() => handleComment(technique.techniqueId)}
                              className="mt-3 bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-500 hover:to-indigo-500 text-white py-2.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                              Post Comment
                            </button>
                            <div className="mt-4 space-y-3">
                              {technique.comments?.map((comment, index) => (
                                <p key={index} className="text-sky-700/80 text-sm bg-sky-50/50 p-3 rounded-lg">
                                  {comment}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Right Column - Steps */}
                        <div className="lg:w-2/3">
                          <h4 className="text-xl font-semibold mb-6 text-sky-900">
                            Step-by-Step Instructions
                          </h4>
                          <ol className="space-y-6">
                            {(technique.steps || []).map((step, index) => (
                              <li key={index} className="flex">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 text-white flex items-center justify-center flex-shrink-0 mr-4 mt-0.5 shadow-md">
                                  <span>{index + 1}</span>
                                </div>
                                <div className="pt-1">
                                  <p className="text-sky-700/80 leading-relaxed">
                                    {step}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ol>
                          
                          {/* Edit/Delete Buttons */}
                          <div className="mt-8 flex space-x-4">
                            <button
                              onClick={() => handleEdit(technique.techniqueId)}
                              className="flex items-center space-x-2 bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-500 hover:to-indigo-500 text-white py-2.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                              <Edit size={18} />
                              <span>Edit Technique</span>
                            </button>
                            <button
                              onClick={() => handleDelete(technique.techniqueId)}
                              className="flex items-center space-x-2 bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white py-2.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                              <Trash2 size={18} />
                              <span>Delete Technique</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="text-center py-16 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-sky-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl text-sky-600/80 mb-6">
                No techniques found matching your criteria.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setDifficultyFilter('all');
                }}
                className="bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-500 hover:to-indigo-500 text-white py-2.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Techniques;