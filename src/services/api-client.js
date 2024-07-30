import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

export default apiClient;
