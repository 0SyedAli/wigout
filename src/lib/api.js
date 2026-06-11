import axios from 'axios';
import { getCookie } from 'cookies-next';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token to headers if it exists
api.interceptors.request.use(
  (config) => {
    const token = getCookie('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here (e.g., redirect to login if 401)
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.error('Unauthorized, please login again.');
    }
    return Promise.reject(error);
  }
);

export const fetchSupportTickets = async ({ page = 1, limit = 10, status = "", search = "" } = {}) => {
  const params = {
    page,
    limit,
    ...(status ? { status } : {}),
    ...(search ? { search } : {}),
  };

  return api.get('/admin/support', { params });
};

export const updateSupportStatus = async (ticketId, status) => {
  const endpoints = [
    `/admin/support/${ticketId}/status`,
    `/admin/support/${ticketId}`,
    `/admin/support/resolve/${ticketId}`,
  ];

  let lastError;

  for (const endpoint of endpoints) {
    try {
      return await api.patch(endpoint, { status });
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
};

export const fetchNotifications = async ({ page = 1, limit = 10 } = {}) => {
  return api.get('/admin/notifications/', {
    params: {
      page,
      limit,
    },
  });
};

export const createNotification = async (payload) => {
  return api.post('/admin/notifications/', payload);
};

export const deleteReview = async (reviewId) => {
  return api.delete(`/admin/reviews/${reviewId}`);
};

export default api;
