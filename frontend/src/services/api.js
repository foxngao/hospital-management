import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000, // Tăng timeout lên 10 giây để an toàn
  withCredentials: true, // Gửi cookie/token qua CORS
});

// Interceptor cho request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor cho response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'An error occurred';

    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Request timed out. Please try again later.';
    } else if (!error.response) {
      errorMessage = 'Cannot connect to server. Check if backend is running or network issues.';
    } else {
      // Lỗi từ server (4xx, 5xx)
      errorMessage = error.response.data?.error || error.response.statusText || 'Server error';
    }

    return Promise.reject({ message: errorMessage, status: error.response?.status });
  }
);

// Hàm retry request (tùy chọn)
const retryRequest = async (originalRequest, maxRetries = 2) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await api.request(originalRequest);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1))); // Delay tăng dần
    }
  }
};

// Áp dụng retry cho các lỗi cụ thể
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.code === 'ECONNABORTED' ||
      (error.response && [502, 503, 504].includes(error.response.status))
    ) {
      return retryRequest(originalRequest);
    }
    return Promise.reject(error);
  }
);

// API functions
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;