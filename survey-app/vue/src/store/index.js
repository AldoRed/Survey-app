import { createStore } from 'vuex';
import axiosClient from '../axios';

const tmpSurveys = [
    {
        id: 1,
        title: 'A little more about you',
        slug: 'a-little-more-about-you',
        status: 'draft',
        image: 'https://picsum.photos/400/400',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam nis',
        created_at: '2021-01-01 00:00:00',
        updated_at: '2021-01-01 00:00:00',
        expire_date: '2021-01-01 00:00:00',
        questions: [
            {
                id: 1,
                type: 'select',
                question: "From which country are you?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: 'f8af96f2-1d80-3453-0943-e0e0-akelidwkna',
                            text: 'USA'
                        },
                        {
                            uuid: 'f8afasdfal-53-0943-e0e0-akelide0e0-akel',
                            text: 'Canada'
                        },
                        {
                            uuid: 'f8af96f2-1d80-3453-0943-e0e0-akelidwknd',
                            text: 'Mexico'
                        },
                    ],
                },
            },
            {
                id: 2,
                type: 'checkbox',
                question: "Which language videos do you want to learn?",
                description: 
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam nis",
                data: {
                    options: [
                        {
                            uuid: 'f8af96f2-1d80-3453-0943-e0e0-akelifwkna',
                            text: 'JavaScript'
                        },
                        {
                            uuid: 'f8afasdfal-53-0943-e0e0-akelide0e0dakel',
                            text: 'PHP'
                        },
                        {
                            uuid: 'f8af96f2-1d80-3453-0943-e0e0gasdfidwknd',
                            text: 'Python'
                        },
                    ],
                },
            },
            {
                id: 3,
                type: 'radio',
                question: "If you have to choose one, which one would you choose?",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam nis",
                data: {
                    options: [
                        {
                            uuid: 'f8af96f2-1d80-3453-0943-e0e0-akelifwkna',
                            text: 'JavaScript'
                        },
                        {
                            uuid: 'f8afasdfal-53-0943-e0e0-akelide0e0dakel',
                            text: 'PHP'
                        },
                        {
                            uuid: 'f8af96f2-1d80-3453-0943-e0e0gasdfidwknd',
                            text: 'Python'
                        },
                    ],
                },
            },
            {
                id: 4,
                type: 'text',
                question: "What is your name?",
                description: null,
                data: {},
            },
            {
                id: 5,
                type: 'textarea',
                question: "What is your opinion about this survey?",
                description: "Write your opinion about this survey",
                data: {},
            },
        
        ],

    },
    {
        id: 2,
        title: 'What superpower would you like to have?',
        slug: 'what-superpower-would-you-like-to-have',
        status: true,
        image: 'https://picsum.photos/400/400',
        description: 'Superpower is a popular culture term for an imaginary superhuman ability. They are most frequently used in pulp magazines, comic books, science fiction, television programs, video games, and films as the key attribute of a superhero.',
        created_at: '2023-09-09',
        updated_at: '2023-09-10',
        expire_date: '2023-09-13',
        questions: [],
    },
    {
        id: 3,
        title: 'Ranking of the best programming languages',
        slug: 'ranking-of-the-best-programming-languages',
        status: 'active',
        image: 'https://picsum.photos/400/400',
        description: 'The best programming languages, ranked by the community',
        created_at: '2021-01-01 00:00:00',
        updated_at: '2021-01-01 00:00:00',
        expire_date: '2021-01-01 00:00:00',
        questions: [],
    },
    {
        id: 4,
        title: 'Who is the best soccer player in the world?',
        slug: 'who-is-the-best-soccer-player-in-the-world',
        status: 'active',
        image: 'https://picsum.photos/400/400',
        description: 'The best soccer player in the world, ranked by the community',
        created_at: '2021-01-01 00:00:00',
        updated_at: '2021-01-01 00:00:00',
        expire_date: '2021-01-01 00:00:00',
        questions: [],
    },
];

const store = createStore({
    state: {
        sideBarOpen: false,
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN'),
        },
        surveys: [...tmpSurveys],
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