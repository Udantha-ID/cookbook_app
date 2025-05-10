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
            // For now, we'll just use a placeholder image URL since image upload is not implemented
            const techniqueWithImage = {
                ...technique,
                imageUrl: imageFile ? URL.createObjectURL(imageFile) : null
            };
            
            const response = await axiosInstance.post('/save', techniqueWithImage);
            return response.data;
        } catch (error) {
            console.error('Error saving technique:', error);
            throw error;
        }
    },

    async getAllTechniques() {
        try {
            const response = await axiosInstance.get('/get-all-techniques');
            return response.data;
        } catch (error) {
            console.error('Error fetching techniques:', error);
            throw error;
        }
    },

    async updateTechnique(id, technique, imageFile) {
        try {
            // For now, we'll just use a placeholder image URL since image upload is not implemented
            const techniqueWithImage = {
                ...technique,
                techniqueId: parseInt(id),
                imageUrl: imageFile ? URL.createObjectURL(imageFile) : technique.imageUrl
            };
            
            const response = await axiosInstance.put(`/update/${id}`, techniqueWithImage);
            return response.data;
        } catch (error) {
            console.error('Error updating technique:', error);
            throw error;
        }
    },

    async deleteTechnique(id) {
        try {
            const response = await axiosInstance.delete(`/delete/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting technique:', error);
            throw error;
        }
    }
}; 