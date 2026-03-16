import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Pointing to our local Node backend
});

// Request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    // We will extract token from user object saved in localStorage by Zustand
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
        try {
            const parsed = JSON.parse(authStorage);
            const token = parsed?.state?.user?.token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (e) {
            console.error('Failed to parse auth storage token');
        }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

