import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        username: '',
        email: '',
        password: '',
        loggedIn: false,
    }),
    getters: {
        getState: (state) => state,
    },
    actions: {
        login(username, email, password) {
            this.username = username;
            this.email = email;
            this.password = password;
            this.loggedIn = true;
        },
        logout() {
            this.username = '';
            this.email = '';
            this.password = '';
            this.loggedIn = false;
        },
    },
});
