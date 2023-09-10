import CryptoJS from "crypto-js";
import { jashyruunAchkych } from "../DataArr";

// Сохранение данных в Local Storage
export function saveToLocalStorage(key, data) {
    localStorage.setItem(key, data);
}

// Извлечение данных из Local Storage
export function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? data : null;
}

// Удаление данных из Local Storage
export function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}

export function encryptData(jashyruunMaalymat) {
    if (typeof jashyruunMaalymat !== 'string') {
        jashyruunMaalymat = JSON.stringify(jashyruunMaalymat);
    }
    return CryptoJS.AES.encrypt(jashyruunMaalymat, jashyruunAchkych)
}

export function decryptData(kardar) {
    const bytes = CryptoJS.AES.decrypt(kardar, jashyruunAchkych);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}

export function encryptAndSaveToLocalStorage(key, data, encryptionKey) {
    const encryptedData = encryptData(data, encryptionKey);
    saveToLocalStorage(key, encryptedData);
}

// Извлечение данных из Local Storage и их расшифровка
export function loadAndDecryptFromLocalStorage(key, decryptionKey) {
    const encryptedData = loadFromLocalStorage(key);
    if (encryptedData) {
        return decryptData(encryptedData, decryptionKey);
    }
    return null;
}
