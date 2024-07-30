import axios from 'axios';

const apiClient = axios.create({
    baseURL: "https://api.uaproject.xyz/",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

export default apiClient;
