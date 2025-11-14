import axios from 'axios';


const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080/';


const api = axios.create({
baseURL: API_BASE,
headers: { 'Content-Type': 'application/json' },
});


api.interceptors.request.use(config => {
const token = localStorage.getItem('accessToken');
if (token) config.headers.Authorization = `Bearer ${token}`;
return config;
});


api.interceptors.response.use(r => r, err => {
if (err.response?.status === 401) {
localStorage.removeItem('accessToken');
window.location.href = '/login';
}
return Promise.reject(err);
});


export default api;