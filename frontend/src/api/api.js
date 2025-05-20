// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://eld-trip-logger.onrender.com/api',  
});

export default api;
