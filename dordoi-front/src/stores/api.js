import axios from '../axios-api';
import {encryptAndSaveToLocalStorage} from "./loacalStorage";
import {jashyruunAchkych, lsKey} from "../DataArr";

// Функция для выполнения GET-запросов
export async function getReq(endpoint) {
    try {
        return await axios.get(endpoint);
    } catch (e) {
        throw e;
    }
}

// Функция для выполнения POST-запросов
export async function postReq(endpoint, data, token, isFormData = false) {
    try {
        // if (token) {
        //     return await axios.post(endpoint, data, {
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //             'Content-Type': 'application/json', // Указываем тип контента JSON
        //         },
        //     });
        // }
        // return await axios.post(endpoint, data);

        const headers = {
            Authorization: token ? `Bearer ${token}` : undefined,
        };

        if (data instanceof FormData) {
            headers['Content-Type'] = 'multipart/form-data';
        } else {
            headers['Content-Type'] = 'application/json';
        }

        return await axios.post(endpoint, data, {
            headers,
        });
    } catch (e) {
        throw e;
    }
}

export function postReqSuccess(data) {
    // Сохраняем данные в Local Storage
    const jashyruunMaalymat = {
        userId: data.user._id,
        token: data.token
    };
    encryptAndSaveToLocalStorage(lsKey, jashyruunMaalymat, jashyruunAchkych);
    console.log('userInitialized and saved ! : ')
}

export function postReqFailure(res) {
    // что делать при ошибке с сервера
    console.error('Ошибка с сервера :', res);
}

export async function checkPostRequest(commit, {endpoint, data, successCallback, errorCallback, mutation, token}) {
    try {
        console.log('checkPostRequest received data : ', {endpoint, data, successCallback, errorCallback, token})
        const response = await postReq(endpoint, data, token);
        if (response.status === 200) {
            const responseData = response.data;
            // if (endpoint.includes('users')) {
            //     commit('setUserData', responseData);
            // }

            console.log('mutation : ', mutation);
            if (mutation) {
                // Если указана мутация, вызываем ее
                console.log('mutation : ', mutation);
                commit(mutation, responseData);

            }
            console.log('token : ', responseData.token);
            // Вызываем callback для успешного запроса
            if (typeof successCallback === 'function') {
                successCallback(responseData);
                console.log('response data : ', responseData);
            }
        } else {
            // Вызываем callback для ошибки запроса
            if (typeof errorCallback === 'function') {
                errorCallback(response.data.error);
            }
        }
    } catch (e) {
        // Обрабатываем ошибку
        console.error('Ошибка при выполнении POST-запроса:', e);
        // Вызываем callback для ошибки запроса
        if (typeof errorCallback === 'function') {
            errorCallback(e);
        }
    }
}
