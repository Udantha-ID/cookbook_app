import axios from 'axios';

const API_URL = 'http://localhost:8095/api/v1/meal';

const mealService = {
    // Create a new meal plan
    createMeal: async (mealData) => {
        try {
            const response = await axios.post(`${API_URL}/save`, mealData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get all meal plans
    getAllMeals: async () => {
        try {
            const response = await axios.get(`${API_URL}/getAll`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update a meal plan
    updateMeal: async (id, mealData) => {
        try {
            const response = await axios.put(`${API_URL}/update/${id}`, mealData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete a meal plan
    deleteMeal: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/delete/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default mealService; 