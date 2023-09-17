import  axios from 'axios';
let apiURL = process.env.VITE_APP_API_URL_PRODUCTION;

if (process.env.NODE_ENV === 'development') {
    apiURL = 'http://localhost:8003';
}

const instance = axios.create({
    baseURL: apiURL,
    timeout: 5000, // Устанавливаем тайм-аут запроса (в миллисекундах)
});

export default instance;