import axios from 'axios';
import store from './store';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api'
});

axiosClient.interceptors.request.use(function (config) {
    const token = store.state.user.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default axiosClient;