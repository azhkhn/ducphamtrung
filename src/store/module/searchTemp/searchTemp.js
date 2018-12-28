export const SET_TEMP = 'setSearchTemp';
export const SET_SIMILAR = 'setSimilar';
export const SET_SEEN = 'setSeen';

export default {
	namespaced: true,
	state: {
		search: [],
		similar: [],
		seen: [],
	},
	getters: {
		search: state => state.search,
		similar: state => state.similar,
		seen: state => state.seen,
	},
	mutations: {
		[SET_TEMP]: (state, payload) => {
			if (Array.isArray(payload)) {
				state.search = payload;
			}
		},
		[SET_SIMILAR]: (state, payload) => {
			if (Array.isArray(payload)) {
				state.similar = payload;
			}
		},
		[SET_SEEN]: (state, payload) => {
			if (Array.isArray(payload)) {
				state.seen = payload;
			}
		},
	},
	actions: {},
};
