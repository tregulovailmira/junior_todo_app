import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:5000/'
});

http.interceptors.response.use(response => {
    if (response.data.access_token) {
        window.localStorage.setItem('token', response.data.access_token)
    }
    return response
});

export default http;