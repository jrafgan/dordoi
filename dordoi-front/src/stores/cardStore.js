import { createStore } from 'vuex';
import axios from '../axios-api';
import {sendRequest, reqFailure, reqSuccess} from './api';
import userStore from './userStore';

export const cardStore = createStore({
    state: {
        allCards: [],
        userCards: [],
        searchedCards: [],
        selectedCard: null,
        message: ''
       },
    getters: {
        getState: (state) => state,
        getAllCards: (state) => state.allCards,
        getSearchedCards: (state) => state.searchedCards,
        getUserCards: (state) => state.userCards,
        getSelectedCard: (state) => state.selectedCard,
        getCardMessage: (state) => state.message
    },
    mutations: {
        // Мутация для обновления данных пользователя
        setSelectedCard(state, data) {
            state.selectedCard = data;
        },
        setSearchedCards(state, data) {
            state.searchedCards = data.cards;
            state.message = data.message;

        },
        setAllCards(state, data) {
            state.allCards = data.cards;
            state.message = data.message;
        },
        setUserCards(state, data) {
            state.userCards = data.cards;
            state.message = data.message;
        },
        clearCardMessage(state, data) {
            state.message = '';
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
        async findByKeyword({ commit }, words) {
            try {
                console.log('keyword before send : ', words);
                await sendRequest(commit, {
                    method: 'GET',
                    endpoint: `cards/search?keyword=${words}`,
                    data: null,
                    successCallback: reqSuccess,
                    errorCallback: reqFailure,
                    mutation: 'setSearchedCards',
                    token: undefined
                });
                // Обработайте ответ здесь
            } catch (error) {
                // Обработайте ошибку здесь
            }
        },
        async findUserCards({ commit }, userId) {
            try {
                await sendRequest(commit, {
                    method: 'GET',
                    endpoint: `cards/user/${userId}`,
                    data: null,
                    successCallback: reqSuccess,
                    errorCallback: reqFailure,
                    mutation: 'setUserCards',
                    token: userStore.state.token
                });
            } catch (error) {
                // Обработайте ошибку здесь
            }
        },
        async deleteCard({ commit }, cardId) {
            try {
                console.log('card id in deleteCard : ', cardId);
                await sendRequest(commit, {
                    method: 'DELETE',
                    endpoint: `cards/${cardId}?user=${userStore.state.userId}`,
                    data: null,
                    successCallback: reqSuccess,
                    errorCallback: reqFailure,
                    mutation: 'setAllCards',
                    token: userStore.state.token
                });
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
