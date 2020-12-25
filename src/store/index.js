import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tokenString: '',
    },
    mutations: {
        setTokenString(state, payload) {
            state.tokenString = payload.tokenString;
        },
    },
    actions: {},
    modules: {},
});
