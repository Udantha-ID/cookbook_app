import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { techniqueService } from '../../services/techniqueService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { X, Upload } from 'lucide-react';

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
      const response = await techniqueService.saveTechnique(formData, selectedImage);
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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-24">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-sky-100 p-8">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
              Add New Cooking Technique
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-sky-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter technique title"
                  className="w-full px-4 py-3 border border-sky-100 rounded-xl bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-sky-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the technique"
                  className="w-full px-4 py-3 border border-sky-100 rounded-xl bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                  rows="4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-700 mb-2">
                  Technique Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-sky-100 border-dashed rounded-xl">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mx-auto h-32 w-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setImagePreview(null)}
                          className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                        >
                          <X size={16} className="text-sky-600/80" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload size={24} className="mx-auto h-12 w-12 text-sky-400" />
                        <div className="flex text-sm text-sky-600/80">
                          <label
                            htmlFor="image-upload"
                            className="relative cursor-pointer rounded-md font-medium text-sky-500 hover:text-sky-400 focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-sky-500/80">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="difficultyLevel" className="block text-sm font-medium text-sky-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  name="difficultyLevel"
                  value={formData.difficultyLevel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-sky-100 rounded-xl bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                  required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-sky-700 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="e.g., baking, grilling, quick"
                  className="w-full px-4 py-3 border border-sky-100 rounded-xl bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/techniques')}
                  className="px-6 py-3 border border-sky-100 rounded-xl text-sky-600/80 hover:bg-sky-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-500 hover:to-indigo-500 text-white rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    'Submit Technique'
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddCookingTech;