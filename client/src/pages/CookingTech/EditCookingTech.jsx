import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { techniqueService } from '../../services/techniqueService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCookingTech = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficultyLevel: 'beginner',
    tags: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTechnique();
  }, [id]);

  const fetchTechnique = async () => {
    try {
      setLoading(true);
      const data = await techniqueService.getAllTechniques();
      const technique = data.find(tech => tech.techniqueId === parseInt(id));
      
      if (technique) {
        setFormData({
          title: technique.title || '',
          description: technique.description || '',
          difficultyLevel: technique.difficultyLevel || 'beginner',
          tags: technique.tags || '',
          imageUrl: technique.imageUrl || '',
        });
        if (technique.imageUrl) {
          setImagePreview(technique.imageUrl);
        }
      } else {
        toast.error('Technique not found');
        navigate('/techniques');
      }
    } catch (error) {
      console.error('Error fetching technique:', error);
      toast.error('Failed to load technique');
      setError('Failed to load technique');
      navigate('/techniques');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      setSelectedImage(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await techniqueService.updateTechnique(id, formData, selectedImage);
      toast.success('Technique updated successfully!');
      navigate('/techniques');
    } catch (error) {
      console.error('Error updating technique:', error);
      toast.error(error.message || 'Error updating technique');
      setError(error.message || 'Error updating technique');
    } finally {
      setSaving(false);
    }
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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-blue-900 dark:text-blue-100 mb-4">Error Loading Technique</h2>
          <p className="text-blue-600/80 dark:text-blue-200 mb-6">{error}</p>
          <button
            onClick={() => navigate('/techniques')}
            className="bg-gradient-to-r from-blue-400 to-indigo-400 hover:from-blue-500 hover:to-indigo-500 text-white py-2 px-6 rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            Back to Techniques
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-blue-600/80 dark:text-blue-200">Loading technique...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-24">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Edit Cooking Technique
          </h1>
          <p className="text-blue-600/80 dark:text-blue-200 text-lg">
            Update your culinary technique details
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 max-w-3xl mx-auto border border-blue-100 dark:border-blue-900/50"
        >
          <form onSubmit={handleSubmit}>
            <motion.div variants={itemVariants} className="mb-6">
              <label className="block text-blue-900 dark:text-blue-100 font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter technique title"
                className="w-full py-3.5 px-4 border border-blue-100 dark:border-blue-900/50 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all shadow-sm"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <label className="block text-blue-900 dark:text-blue-100 font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the technique"
                className="w-full py-3.5 px-4 border border-blue-100 dark:border-blue-900/50 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all shadow-sm"
                rows="4"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <label className="block text-blue-900 dark:text-blue-100 font-medium mb-2">
                Technique Image
              </label>
              <div className="flex flex-col items-center space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full py-3.5 px-4 border border-blue-100 dark:border-blue-900/50 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all shadow-sm"
                />
                {imagePreview && (
                  <div className="relative w-full max-w-md">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-56 object-cover rounded-xl shadow-md"
                    />
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <label className="block text-blue-900 dark:text-blue-100 font-medium mb-2">
                Difficulty Level
              </label>
              <select
                name="difficultyLevel"
                value={formData.difficultyLevel}
                onChange={handleInputChange}
                className="w-full py-3.5 px-4 border border-blue-100 dark:border-blue-900/50 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all shadow-sm"
                required
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <label className="block text-blue-900 dark:text-blue-100 font-medium mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="e.g., baking, grilling, quick"
                className="w-full py-3.5 px-4 border border-blue-100 dark:border-blue-900/50 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all shadow-sm"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/techniques')}
                className="border border-blue-100 dark:border-blue-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-700 dark:text-blue-300 py-3 px-6 rounded-xl transition-all shadow-sm hover:shadow-md"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-400 to-indigo-400 hover:from-blue-500 hover:to-indigo-500 text-white py-3 px-8 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-md"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Update Technique'}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EditCookingTech; 