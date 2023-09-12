import axios from '../axios-api';
import {encryptAndSaveToLocalStorage} from "./loacalStorage";
import {jashyruunAchkych, lsKey} from "../DataArr";

// Функция для выполнения GET-запросов
export async function getReq(endpoint, token) {
    try {
        const headers = {
            Authorization: token ? `Bearer ${token}` : undefined,
        };
        console.log('getReq in action...')
        return await axios.get(endpoint, token ? { headers } : null);
    } catch (e) {
        throw e;
    }
}


// Функция для выполнения POST-запросов
export async function postReq(endpoint, data, token, isFormData = false) {
    try {

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

export function reqSuccess(data) {
    // Сохраняем данные в Local Storage
    if (data.user){
        const jashyruunMaalymat = {
            userId: data.user._id,
            token: data.token
        };
        encryptAndSaveToLocalStorage(lsKey, jashyruunMaalymat, jashyruunAchkych);
    }

}

export function reqFailure(res) {
    // что делать при ошибке с сервера
    console.error('Ошибка с сервера :', res);
}

export async function sendRequest(commit, {
    method = 'POST', // Метод запроса по умолчанию - POST
    endpoint,
    data,
    successCallback,
    errorCallback,
    mutation,
    token,
}) {
    try {
        let response;
        console.log('props : ', commit, {
            method,
            endpoint,
            data,
            successCallback,
            errorCallback,
            mutation,
            token,
        })
        switch (method.toUpperCase()) {
            case 'POST':
                response = await postReq(endpoint, data, token);
                break;
            case 'GET':
                response = await getReq(endpoint, token);
                break;
            // Добавьте обработку других методов, если необходимо
            default:
                throw new Error('Неподдерживаемый метод запроса');
        }

        if (response.status === 200) {
            const responseData = response.data;
            console.log('server response : ', responseData);
            if (mutation) {
                // Если указана мутация, вызываем ее
                commit(mutation, responseData);
                console.log('mutation : ', mutation);
            }

            // Вызываем callback для успешного запроса
            if (typeof successCallback === 'function') {
                successCallback(responseData);
            }
        } else {
            // Вызываем callback для ошибки запроса
            if (typeof errorCallback === 'function') {
                errorCallback(response.data.error);
            }
        }
    } catch (e) {
        // Обрабатываем ошибку
        console.error(`Ошибка при выполнении ${method}-запроса:`, e);
        // Вызываем callback для ошибки запроса
        if (typeof errorCallback === 'function') {
            errorCallback(e);
        }
    }
}

// export async function checkPostRequest(commit, {endpoint, data, successCallback, errorCallback, mutation, token}) {
//     try {
//         const response = await postReq(endpoint, data, token);
//         if (response.status === 200) {
//             const responseData = response.data;
//
//             if (mutation) {
//                 // Если указана мутация, вызываем ее
//                 commit(mutation, responseData);
//                 console.log('mutation : ', mutation)
//             }
//             console.log('token : ', responseData.token);
//             // Вызываем callback для успешного запроса
//             if (typeof successCallback === 'function') {
//                 successCallback(responseData);
//                 console.log('response data : ', responseData);
//             }
//         } else {
//             // Вызываем callback для ошибки запроса
//             if (typeof errorCallback === 'function') {
//                 errorCallback(response.data.error);
//             }
//         }
//     } catch (e) {
//         // Обрабатываем ошибку
//         console.error('Ошибка при выполнении POST-запроса:', e);
//         // Вызываем callback для ошибки запроса
//         if (typeof errorCallback === 'function') {
//             errorCallback(e);
//         }
//     }
// }
