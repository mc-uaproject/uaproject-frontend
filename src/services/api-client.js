import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiClient = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}`,
    },
});

export default apiClient;
