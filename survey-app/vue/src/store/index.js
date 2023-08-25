import { createStore } from 'vuex';

const store = createStore({
    state: {
        sideBarOpen: false,
        user: {
            data: {
                name: 'John Doe',
                email: 'john@example.com',
                image: 'https://via.placeholder.com/150'
            },
            token: 123
        }
    },
    getters: {
        sideBarOpen: state => {
            return state.sideBarOpen
        }
    },
    mutations: {
        toggleSidebar (state) {
            state.sideBarOpen = !state.sideBarOpen
        },
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
        }
    },
    actions: {
        toggleSidebar(context) {
            context.commit('toggleSidebar')
        }
    }
});

export default store;