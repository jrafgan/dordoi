import { createStore } from "vuex";
import axios from '../axios-api';
import {sendRequest, reqFailure, reqSuccess} from "./api";
import userStore from "./userStore";

export const cardStore = createStore({
    state: {
        allCards: [],
        userCards: [],
        selectedCard: null
       },
    getters: {
        getState: (state) => state,
        getAllCards: (state) => state.allCards,
    },
    mutations: {
        // Мутация для обновления данных пользователя
        setSelectedCard(state, data) {
            state.selectedCard = data.card;

        },
        setAllCards(state, data) {
            state.allCards = data;
            console.log('card state : ', state.allCards);
        },
        setUserCards(state, data) {
            state.userCards = data.cards;
        },
    },
    actions: {
        async createNewCard({ commit }, cardData) {
            try {
                // Обработайте ответ здесь
                await sendRequest(commit, {
                    endpoint: 'cards/',
                    data: cardData,
                    successCallback: reqSuccess,
                    errorCallback: reqFailure,
                    mutation: 'setAllCards',
                    token: userStore.state.token
                });
            } catch (e) {
                // Обработайте ошибку здесь
            }
        },
        async getNewCards({ commit }) {
            try {
                console.log('get new cards in action! ')
                await sendRequest(commit, {
                    method: 'GET',
                    endpoint: 'cards/',
                    data: null,
                    successCallback: reqSuccess,
                    errorCallback: reqFailure,
                    mutation: 'setAllCards',
                    token: undefined
                });
                // Обработайте ответ здесь
            } catch (error) {
                // Обработайте ошибку здесь
            }
        },
        async findByKeyword() {
            try {
                const res = await axios.get('ваш_адрес_запроса');
                // Обработайте ответ здесь
            } catch (error) {
                // Обработайте ошибку здесь
            }
        },
        async findByCategory() {
            try {
                const res = await axios.get('ваш_адрес_запроса');
                // Обработайте ответ здесь
            } catch (error) {
                // Обработайте ошибку здесь
            }
        },
        async deleteCard({ commit }, cardData) {
            try {
                const res = await axios.delete('ваш_адрес_запроса');
                // Обработайте ответ здесь
            } catch (error) {
                // Обработайте ошибку здесь
            }
        },
        async editCard({ commit }, cardData) {
            try {
                const res = await axios.put('ваш_адрес_запроса');
                // Обработайте ответ здесь
            } catch (error) {
                // Обработайте ошибку здесь
            }
        },
    },
});

export default cardStore;
