import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import LeftSideBar from '../../components/LeftSideBar';
import RightSideBar from '../../components/RightSideBar';
import { Plus } from 'lucide-react';

function Techniques() {
  const navigate = useNavigate();
  const [techniques, setTechniques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch techniques from backend
  const fetchTechniques = async () => {
    try {
      const response = await axios.get('http://localhost:8095/api/v1/techniques/get-all');
      setTechniques(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching techniques:', error);
      setError('Failed to load techniques. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechniques();
  }, []);

  const handleTechniqueDeleted = (techniqueId) => {
    setTechniques(prevTechniques => prevTechniques.filter(technique => technique.id !== techniqueId));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="flex gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LeftSideBar />
          <div className="flex-1">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-sky-100 p-8 mb-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  Cooking Techniques
                </h1>
                <button
                  onClick={() => navigate('/techniques/add')}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-500 hover:to-indigo-500 text-white rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <Plus size={20} />
                  <span>Add Technique</span>
                </button>
              </div>
            </div>
            
            {/* Loading State */}
            {loading && (
              <div className="mt-8 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <motion.div 
                className="mt-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-red-700">{error}</p>
              </motion.div>
            )}

            {/* Empty State */}
            {!loading && !error && techniques.length === 0 && (
              <motion.div 
                className="mt-8 text-center p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-sky-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-xl font-semibold text-sky-700 mb-2">No Techniques Yet</h3>
                <p className="text-sky-500">Be the first to share a cooking technique!</p>
              </motion.div>
            )}

            {/* Techniques List */}
            {!loading && !error && techniques.length > 0 && (
              <motion.div 
                className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {techniques.map(technique => (
                  <motion.div
                    key={technique.id}
                    variants={itemVariants}
                  >
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-sky-100 overflow-hidden hover:shadow-xl transition-all">
                      {technique.image && (
                        <div className="relative h-48 w-full">
                          <img
                            src={technique.image}
                            alt={technique.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="px-3 py-1 text-sm font-medium text-sky-600 bg-sky-50 rounded-full">
                            {technique.difficultyLevel}
                          </span>
                          <span className="text-sm text-sky-500">
                            {new Date(technique.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-sky-900 mb-2">
                          {technique.title}
                        </h3>
                        <p className="text-sky-600 mb-4 line-clamp-2">
                          {technique.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {technique.tags?.split(',').map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs font-medium text-sky-600 bg-sky-50 rounded-full"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => navigate(`/techniques/${technique.id}`)}
                            className="px-4 py-2 text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleTechniqueDeleted(technique.id)}
                            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
          <RightSideBar />
        </motion.div>
      </div>
    </div>
  );
}

export default Techniques;