import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, ChevronUp, Play, Award, Heart, MessageCircle, Bookmark, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Techniques = () => {
  const navigate = useNavigate();
  const [techniques, setTechniques] = useState([
    {
      id: 1,
      title: "Perfect Poached Eggs",
      description: "Learn the art of poaching eggs to achieve a silky yolk and tender white.",
      difficulty: "beginner",
      author: { name: "Chef John" },
      imageUrl: "/images/poached-eggs.jpg",
      steps: [
        "Fill a saucepan with water and bring to a gentle simmer.",
        "Add a splash of vinegar to the water.",
        "Crack an egg into a small bowl, then gently slide it into the water.",
        "Cook for 3-4 minutes until the white is set but yolk is runny.",
        "Remove with a slotted spoon and drain on paper towel."
      ],
      likes: 125,
      comments: ["Great technique!", "Worked perfectly!"],
      saved: false
    },
    {
      id: 2,
      title: "Searing Steak",
      description: "Master the technique of searing steak for a perfect crust and juicy interior.",
      difficulty: "intermediate",
      author: { name: "Chef Maria" },
      imageUrl: "/images/seared-steak.jpg",
      steps: [
        "Pat the steak dry and season generously with salt and pepper.",
        "Heat a cast-iron skillet until smoking hot.",
        "Add a high-smoke-point oil and place the steak in the pan.",
        "Sear for 3-4 minutes per side for medium-rare.",
        "Rest the steak for 5 minutes before slicing."
      ],
      likes: 89,
      comments: ["Love the crust this gives!", "Tips for thicker cuts?"],
      saved: false
    },
    {
      id: 3,
      title: "Sourdough Bread",
      description: "Create artisan sourdough with a crispy crust and airy crumb.",
      difficulty: "advanced",
      author: { name: "Baker Tom" },
      imageUrl: "/images/sourdough.jpg",
      steps: [
        "Mix starter, flour, water, and salt to form a dough.",
        "Perform stretch and folds every 30 minutes for 3 hours.",
        "Shape the dough and let it proof overnight in the fridge.",
        "Preheat a Dutch oven to 450°F and bake for 45 minutes."
      ],
      likes: 203,
      comments: ["Best bread recipe ever!", "How to maintain starter?"],
      saved: false
    }
  ]);
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [newComment, setNewComment] = useState('');

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleLike = (id) => {
    setTechniques(techniques.map(tech => 
      tech.id === id ? { ...tech, likes: tech.likes + 1 } : tech
    ));
  };

  const handleComment = (id) => {
    if (newComment.trim()) {
      setTechniques(techniques.map(tech => 
        tech.id === id ? { ...tech, comments: [...tech.comments, newComment] } : tech
      ));
      setNewComment('');
    }
  };

  const handleSave = (id) => {
    setTechniques(techniques.map(tech => 
      tech.id === id ? { ...tech, saved: !tech.saved } : tech
    ));
  };

  const handleEdit = (id) => {
    navigate(`/edit-technique/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this technique?')) {
      setTechniques(techniques.filter(tech => tech.id !== id));
    }
  };

  const filteredTechniques = techniques.filter(technique => {
    const matchesSearch = technique.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         technique.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || technique.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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

  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-orange-50 to-white dark:from-indigo-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2 text-cyan-600 dark:text-cyan-300">Cooking Techniques</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Master essential cooking methods and elevate your culinary creations
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search techniques..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            />
          </div>
          
          <div className="relative">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="appearance-none w-full py-3 px-4 pr-10 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-500" />
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/add-technique')}
            className="whitespace-nowrap bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-6 rounded-lg transition-colors shadow-md"
          >
            Submit Technique
          </button>
        </motion.div>
        
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredTechniques.length > 0 ? (
            filteredTechniques.map((technique) => (
              <motion.div key={technique.id} variants={itemVariants}>
                <div className="bg-teal-50 dark:bg-teal-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => toggleExpanded(technique.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div 
                          className={`p-3 rounded-full ${
                            technique.difficulty === 'beginner' 
                              ? 'bg-lime-200 dark:bg-lime-900/30 text-lime-600 dark:text-lime-400' 
                              : technique.difficulty === 'intermediate'
                              ? 'bg-amber-200 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                              : 'bg-pink-200 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400'
                          }`}
                        >
                          <Award size={24} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{technique.title}</h3>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                            <span className="capitalize">{technique.difficulty}</span>
                            <span className="mx-2">·</span>
                            <span>By {technique.author.name}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        {expandedId === technique.id ? (
                          <ChevronUp size={24} className="text-gray-500 dark:text-gray-300" />
                        ) : (
                          <ChevronDown size={24} className="text-gray-500 dark:text-gray-300" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: expandedId === technique.id ? 'auto' : 0,
                      opacity: expandedId === technique.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-1/3">
                          {technique.imageUrl && (
                            <div className="mb-4 rounded-lg overflow-hidden">
                              <img
                                src={technique.imageUrl}
                                alt={technique.title}
                                className="w-full h-48 object-cover"
                              />
                            </div>
                          )}
                          <p className="text-gray-700 dark:text-gray-200 mb-4">
                            {technique.description}
                          </p>
                          <div className="flex items-center space-x-4 mb-4">
                            <button 
                              onClick={() => handleLike(technique.id)}
                              className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-cyan-500"
                            >
                              <Heart size={20} fill={technique.likes > 0 ? "currentColor" : "none"} />
                              <span>{technique.likes}</span>
                            </button>
                            <button 
                              className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-cyan-500"
                            >
                              <MessageCircle size={20} />
                              <span>{technique.comments.length}</span>
                            </button>
                            <button 
                              onClick={() => handleSave(technique.id)}
                              className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-cyan-500"
                            >
                              <Bookmark size={20} fill={technique.saved ? "currentColor" : "none"} />
                              <span>{technique.saved ? "Saved" : "Save"}</span>
                            </button>
                          </div>
                          <div className="mt-4">
                            <input
                              type="text"
                              placeholder="Add a comment..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              className="w-full py-2 px-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                            />
                            <button
                              onClick={() => handleComment(technique.id)}
                              className="mt-2 bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-lg transition-colors shadow-md"
                            >
                              Post Comment
                            </button>
                            <div className="mt-4 space-y-2">
                              {technique.comments.map((comment, index) => (
                                <p key={index} className="text-gray-600 dark:text-gray-300 text-sm">
                                  {comment}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="lg:w-2/3">
                          <h4 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100">Step-by-Step Instructions</h4>
                          <ol className="space-y-6">
                            {technique.steps.map((step, index) => (
                              <li key={index} className="flex">
                                <div className="h-8 w-8 rounded-full bg-cyan-500 text-white flex items-center justify-center flex-shrink-0 mr-4 mt-0.5">
                                  <span>{index + 1}</span>
                                </div>
                                <div className="pt-1">
                                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{step}</p>
                                </div>
                              </li>
                            ))}
                          </ol>
                          
                          {/* Added Edit and Delete buttons section */}
                          <div className="mt-8 flex space-x-4">
                            <button
                              onClick={() => handleEdit(technique.id)}
                              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors shadow-md"
                            >
                              <Edit size={18} />
                              <span>Edit Technique</span>
                            </button>
                            <button
                              onClick={() => handleDelete(technique.id)}
                              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors shadow-md"
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
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                No techniques found matching your criteria.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setDifficultyFilter('all');
                }}
                className="border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg transition-colors"
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