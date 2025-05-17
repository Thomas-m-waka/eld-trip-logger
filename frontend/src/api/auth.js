// src/api/auth.js
// src/api/auth.js
import api from './api';

// Attach token to all requests
api.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Auto-refresh token on 401
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refreshToken');

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post('/token/refresh/', { refresh: refreshToken });
        const newAccessToken = res.data.access;
        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        clearTokens();
        window.location.href = '/login'; // or use a navigation method
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// Utility to set tokens after login
export const setTokens = (access, refresh) => {
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
  window.dispatchEvent(new Event('authChange')); // notify app of login
};

// Utility to clear tokens (e.g., on logout or token error)
export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.dispatchEvent(new Event('authChange')); // notify app of logout
};

export default api;
