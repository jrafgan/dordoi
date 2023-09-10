import  axios from 'axios';
const apiURL = 'http://localhost:8003';

const instance = axios.create({
    baseURL: apiURL,
    timeout: 5000, // Устанавливаем тайм-аут запроса (в миллисекундах)
});

export default instance;