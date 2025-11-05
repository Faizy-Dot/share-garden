import axios from 'axios';
import store from '../redux/store';

const axiosInstance = axios.create({
    baseURL: 'https://api.sharegarden.ca',
    timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const state = store?.getState();
        const token = state?.login?.user?.token;
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // If sending FormData, let axios set the correct multipart boundary
        if (config.data && typeof config.data === 'object' && typeof config.data.append === 'function') {
            // Always remove Content-Type header for FormData to let axios set multipart boundary
            if (config.headers) {
                delete config.headers['Content-Type'];
                delete config.headers['content-type'];
            }
            // Ensure axios doesn't set a default Content-Type for FormData
            config.transformRequest = [(data, headers) => {
                if (data && typeof data.append === 'function') {
                    // Let axios handle FormData without setting Content-Type
                    return data;
                }
                return data;
            }];
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('API Error Response:', {
                data: error.response.data,
                status: error.response.status,
                headers: error.response.headers,
            });
        } else if (error.request) {
            // The request was made but no response was received
            console.error('API Request Error:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('API Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; 