import { createStore } from 'vuex';
import axiosClient from '../axios';

const store = createStore({
    state: {
        sideBarOpen: false,
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN'),
        }
    },
    getters: {
        sideBarOpen: state => {
            return state.sideBarOpen
        }
    },
    actions: {
        toggleSidebar(context) {
            context.commit('toggleSidebar')
        },
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                axiosClient.post('/register', user)
                .then(response => {
                    commit('setUser', response.data);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
            })
        },
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                axiosClient.post('/login', user)
                .then(response => {
                    commit('setUser', response.data);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                axiosClient.post('/logout')
                .then(response => {
                    commit('logout');
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
            })
        }
    },
    mutations: {
        toggleSidebar (state) {
            state.sideBarOpen = !state.sideBarOpen
        },
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem('TOKEN');
        },
        setUser: (state, userData) => {
            state.user.data = userData.user;
            state.user.token = userData.token;
            sessionStorage.setItem('TOKEN', userData.token);
        }
    }
});

export default store;