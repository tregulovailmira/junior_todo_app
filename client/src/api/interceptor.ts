import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

http.interceptors.response.use(response => {
  if (response.data.access_token) {
    window.localStorage.setItem('token', response.data.access_token);
  }
  return response;
});

http.interceptors.request.use(config => {
  const token = window.localStorage.getItem('token');
  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }
  return config;
});

export default http;
