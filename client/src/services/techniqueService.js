import axios from 'axios';

const API_URL = 'http://localhost:8095/api/v1/technique';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const techniqueService = {
    async saveTechnique(technique, imageFile) {
        try {
            let imageUrl = null;
            
            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);
                
                const uploadResponse = await axios.post(`${API_URL}/upload-image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        console.log(`Upload Progress: ${percentCompleted}%`);
                    }
                });
                
                if (!uploadResponse.data || !uploadResponse.data.url) {
                    throw new Error('Invalid response from image upload');
                }
                
                imageUrl = uploadResponse.data.url;
            }
            
            const techniqueWithImage = {
                ...technique,
                imageUrl: imageUrl
            };
            
            const response = await axiosInstance.post('', techniqueWithImage);
            return response.data;
        } catch (error) {
            console.error('Error saving technique:', error);
            throw error;
        }
    },

    async getAllTechniques() {
        try {
            const response = await axiosInstance.get('');
            return response.data;
        } catch (error) {
            console.error('Error fetching techniques:', error);
            throw error;
        }
    },

    async updateTechnique(id, technique, imageFile) {
        try {
            let imageUrl = technique.imageUrl;
            
            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);
                
                const uploadResponse = await axios.post(`${API_URL}/upload-image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                
                if (!uploadResponse.data || !uploadResponse.data.url) {
                    throw new Error('Invalid response from image upload');
                }
                
                imageUrl = uploadResponse.data.url;
            }
            
            const techniqueWithImage = {
                ...technique,
                imageUrl: imageUrl
            };
            
            const response = await axiosInstance.put(`/${id}`, techniqueWithImage);
            return response.data;
        } catch (error) {
            console.error('Error updating technique:', error);
            throw error;
        }
    },

    async deleteTechnique(id) {
        try {
            const response = await axiosInstance.delete(`/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting technique:', error);
            throw error;
        }
    }
}; 