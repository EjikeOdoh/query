import axios from 'axios';

const baseURL = 'http://localhost:3000';

const client = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

client.interceptors.request.use(
    (config) => {

        let token = localStorage.getItem('myToken');

        if (token) {
            token = JSON.parse(token)
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Unauthorized! Redirecting to login...');
        }
        return Promise.reject(error);
    }
);

export default client;