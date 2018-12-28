import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';
import modules from './modules';

Vue.use(Vuex);

let store = null;

const getStore = () => {
	if (!store) {
		store = new Vuex.Store({
			modules,
			strict: process.env.NODE_ENV !== 'production',
			plugins: [createPersistedState()],
		});
	}

	return store;
};

export default getStore;
