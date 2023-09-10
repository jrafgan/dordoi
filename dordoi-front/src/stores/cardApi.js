// example.js
import api from '../axios-api'; // Импортируем экземпляр Axios из api.js

// Теперь вы можете использовать этот экземпляр Axios для отправки запросов
async function fetchData() {
    try {
        const response = await api.get('/new-cards'); // Здесь '/someEndpoint' добавится к базовому URL
        console.log('Данные получены:', response.data);
    } catch (error) {
        console.error('Произошла ошибка при запросе:', error);
    }
}

