import apiClient from './api-client'; // Ensure correct import

export const getFormData = async (userId) => {
    try {
        console.log('Fetching form data for user ID:', userId); // Add this log
        const response = await apiClient.get(`/form/${userId}`);
        console.log('Form data fetched:', response.data); // Add this log
        return response.data;
    } catch (error) {
        console.error('Failed to fetch form data:', error);
        throw error;
    }
};

export const saveFormData = async (userId, formData) => {
    try {
        console.log('Saving form data for user ID:', userId, formData); // Add this log
        const response = await apiClient.post(`/form/${userId}`, formData);
        console.log('Form data saved:', response.data); // Add this log
        return response.data;
    } catch (error) {
        console.error('Failed to save form data:', error);
        throw error;
    }
};
