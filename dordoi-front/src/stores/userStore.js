import { createStore } from "vuex";
import {
    loadAndDecryptFromLocalStorage,
    removeFromLocalStorage,

} from "./loacalStorage";
import { jashyruunAchkych, lsKey } from "../DataArr";
import {checkPostRequest, postReqFailure, postReqSuccess} from "./api";

export const store = createStore({
    state: {
        username: '',
        email: '',
        token: '',
        userId: '',
        loggedIn: false, // Начальное значение изменено на false, так как изначально пользователь не вошел
    },
    getters: {
        getState: (state) => state,
        isLoggedIn: (state) => state.loggedIn,
    },
    mutations: {
        // Мутация для обновления данных пользователя
        setUserData(state, userData) {
            state.username = userData.user.username;
            state.email = userData.user.email;
            state.token = userData.token;
            state.userId= userData.user._id;
            state.loggedIn = true;
        },
        logoutUser(state) {
            state.username = '';
            state.email = '';
            state.token = '';
            state.loggedIn = false;
        },
    },
    actions: {
        async initializeUser({ commit }) {
            try {
                const kardar = loadAndDecryptFromLocalStorage(lsKey, jashyruunAchkych);
                if (kardar) {
                    // Если есть токен и данные пользователя в Local Storage, инициализируем хранилище
                    await checkPostRequest(commit, {
                        endpoint: 'users/session',
                        data: {userId: kardar.userId },
                        successCallback: postReqSuccess,
                        errorCallback: postReqFailure,
                        mutation: 'setUserData',
                        token: kardar.token
                    });
                }
            } catch (e) {
                // Обработайте ошибку здесь (например, показ сообщения об ошибке)
                console.error('Ошибка при выполнении POST-запроса:', e);
            }
        },
        async register({ commit }, userData) {
            try {
                await checkPostRequest(commit, {
                    endpoint: 'users/register',
                    data: userData,
                    token: null,
                    successCallback: postReqSuccess,
                    errorCallback: postReqFailure,
                    mutation: 'setUserData'
                });
            } catch (error) {
                // Обработайте ошибку здесь
                console.error('Ошибка при выполнении POST-запроса:', error);
            }
        },

        async login({ commit }, userData) {
            try {
                await checkPostRequest(commit, {
                    endpoint: 'users/login',
                    data: userData,
                    successCallback: postReqSuccess,
                    errorCallback: postReqFailure,
                    mutation: 'setUserData',
                    token: null
                });
            } catch (e) {
                // Обработайте ошибку здесь (например, показ сообщения об ошибке)
                console.error('Ошибка при выполнении POST-запроса:', e);
            }
        },

        logout({ commit }) {
            // Выход пользователя: удалите данные из Local Storage и обновите состояние
            removeFromLocalStorage(lsKey);
            console.log('logout in action !');
            commit('logoutUser');
        },
    },
});

export default store;
