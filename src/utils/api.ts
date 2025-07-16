import axios from 'axios';

const baseURL = 'http://localhost:3000'; // Use HTTP unless you have HTTPS configured

const client = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Example: Get token from storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor (recommended)
client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized errors (e.g., redirect to login)
            console.error('Unauthorized! Redirecting to login...');
        }
        return Promise.reject(error);
    }
);

export default client;