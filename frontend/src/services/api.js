import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api' // L'adresse de ton backend Node.js
});

export default api;