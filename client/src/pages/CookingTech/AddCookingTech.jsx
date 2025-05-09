import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { techniqueService } from '../../services/techniqueService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCookingTech = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficultyLevel: 'beginner',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
    setLoading(true);
    try {
      // Prepare the data according to the backend DTO
      const techniqueData = {
        title: formData.title,
        description: formData.description,
        difficultyLevel: formData.difficultyLevel,
        tags: formData.tags,
      };

      console.log('Submitting technique data:', techniqueData);
      const response = await techniqueService.saveTechnique(techniqueData, selectedImage);
      console.log('Server response:', response);
      
      toast.success('Technique saved successfully!');
      navigate('/techniques');
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      toast.error(error.message || 'Error saving technique');
    } finally {
      setLoading(false);
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

  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-orange-50 to-white dark:from-indigo-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2 text-cyan-600 dark:text-cyan-300">
            Add New Cooking Technique
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Share your culinary expertise with the community
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-teal-50 dark:bg-teal-800 rounded-xl shadow-lg p-6 max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit}>
            <motion.div variants={itemVariants} className="mb-6">
              <label className="block text-gray-800 dark:text-gray-100 font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter technique title"
                className="w-full py-3 px-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <label className="block text-gray-800 dark:text-gray-100 font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the technique"
                className="w-full py-3 px-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                rows="4"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <label className="block text-gray-800 dark:text-gray-100 font-medium mb-2">
                Technique Image
              </label>
              <div className="flex flex-col items-center space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full py-3 px-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
                {imagePreview && (
                  <div className="relative w-full max-w-md">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <label className="block text-gray-800 dark:text-gray-100 font-medium mb-2">
                Difficulty Level
              </label>
              <select
                name="difficultyLevel"
                value={formData.difficultyLevel}
                onChange={handleInputChange}
                className="w-full py-3 px-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                required
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <label className="block text-gray-800 dark:text-gray-100 font-medium mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="e.g., baking, grilling, quick"
                className="w-full py-3 px-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/techniques')}
                className="border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-6 rounded-lg transition-colors shadow-md disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Submit Technique'}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddCookingTech;