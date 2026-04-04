import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Check if it's a user or captain request and add appropriate token
    if (config.url?.includes('/users/')) {
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
      }
    } else if (config.url?.includes('/captain/')) {
      const captainToken = localStorage.getItem('captainToken');
      if (captainToken) {
        config.headers.Authorization = `Bearer ${captainToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear local storage
      if (error.config.url?.includes('/user/')) {
        localStorage.removeItem('userToken');
      } else if (error.config.url?.includes('/captain/')) {
        localStorage.removeItem('captainToken');
      }
      // You might want to redirect to login page here
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// User API endpoints
export const userAPI = {
  // Authentication
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  logout: () => api.post('/users/logout'),

  // Profile CRUD
  getProfile: () => api.get('/api/users/profile'),
//   updateProfile: (userData) => api.put('/api/users/profile', userData),
//   deleteAccount: () => api.delete('/api/users/profile'),

  // Additional user endpoints can be added here
  // getUserRides: () => api.get('/api/user/rides'),
  // bookRide: (rideData) => api.post('/api/user/book-ride', rideData),
};

// Captain API endpoints
export const captainAPI = {
  // Authentication
  register: (captainData) => api.post('/captains/register', captainData),
  login: (credentials) => api.post('/captains/login', credentials),
  logout: () => api.post('/captains/logout'),

  // Profile CRUD
  getProfile: () => api.get('/api/captain/profile'),
//   updateProfile: (captainData) => api.put('/api/captain/profile', captainData),
//   deleteAccount: () => api.delete('/api/captain/profile'),

  // Additional captain endpoints can be added here
  // getCaptainRides: () => api.get('/api/captain/rides'),
  // updateRideStatus: (rideId, status) => api.put(`/api/captain/rides/${rideId}`, { status }),
  // getCaptainStats: () => api.get('/api/captain/stats'),
};

// Generic API utilities
export const apiUtils = {
  // Check if user is authenticated
  isUserAuthenticated: () => !!localStorage.getItem('userToken'),
  isCaptainAuthenticated: () => !!localStorage.getItem('captainToken'),

  // Get stored tokens
  getUserToken: () => localStorage.getItem('userToken'),
  getCaptainToken: () => localStorage.getItem('captainToken'),

  // Clear all tokens
  clearAllTokens: () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('captainToken');
  },

  // Set tokens
  setUserToken: (token) => localStorage.setItem('userToken', token),
  setCaptainToken: (token) => localStorage.setItem('captainToken', token),
};

export default api;
