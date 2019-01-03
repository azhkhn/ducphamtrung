import { eventHub } from 'control/startUp';
import VueJwtDecode from 'vue-jwt-decode';

export const SET_USER_INFO = 'setUserInfo';
export const SET_ACCESS_TOKEN = 'setAccessToken';
export const SET_CURRENT_MENU = 'setCurrentMenu';
export const SET_USER_ID = 'setUserId';
export const SET_LANGCODE = 'setLanguage';
export const SET_CURRENTCY = 'getCurrentcy';
export const SET_RATE = 'rate';
export const SET_RATEALL = 'rateAll';
export const SET_ROLE = 'setRole';

export default {
	namespaced: true,
	state: {
		accessToken: '',
		userName: '',
		roles: '',
		menu: {},
		id: '',
		currentLangCode: 'vi',
		currentcy: '',
		rate: [],
		rateAll: [],
	},
	getters: {
		userName: state => `${state.userName}`,
		roles: state => state.roles,
		accessToken: state => `${state.accessToken}`,
		menu: state => state.menu,
		id: state => `${state.id}`,
		getCurrentLangCode: state => `${state.currentLangCode}`,
		getCurrentcy: state => `${state.currentcy}`,
		rate: state => state.rate,
		rateAll: state => state.rateAll,
	},
	mutations: {
		[SET_LANGCODE]: (state, payload) => {
			state.currentLangCode = payload;
		},
		[SET_RATEALL]: (state, payload) => {
			if (Array.isArray(payload)) {
				state.rateAll = payload;
			} else {
				state.rateAll.splice(payload, 1);
			}
		},
		[SET_RATE]: (state, payload) => {
			if (Array.isArray(payload)) {
				state.rate = payload;
			} else {
				state.rate.splice(payload, 1);
			}
		},
		[SET_CURRENTCY]: (state, payload) => {
			state.currentcy = payload;
		},
		[SET_USER_INFO]: (state, payload) => {
			if (payload == null) {
				state.accessToken = '';
				state.userName = '';
				state.roles = [];
				state.menu = {};
				state.id = '';
				eventHub.$emit('role-changed', {});
				return;
			}
			// state.userName = payload.userName;
			// state.roles = payload.roles ? payload.roles.split(',') : [];
			const info = VueJwtDecode.decode(payload);

			if (info != null) {
				state.accessToken = payload;
				state.userName = info.sub;
				state.roles = [];
				if (info.auth) {
					for (let i = 0; i < info.auth.length; i += 1) {
						state.roles.push(info.auth[i].authority);
					}
				}
				eventHub.$emit('role-changed', {});
			}
		},
		[SET_ACCESS_TOKEN]: (state, payload) => {
			const info = VueJwtDecode.decode(payload);
			if (info != null) {
				state.accessToken = payload;
				state.userName = info.sub;
				state.roles = [];
				if (info.auth) {
					for (let i = 0; i < info.auth.length; i += 1) {
						state.roles.push(info.auth[i].authority);
					}
				}
				eventHub.$emit('role-changed', {});
			}
		},
		[SET_CURRENT_MENU]: (state, payload) => {
			state.menu = payload;
			//eventHub.$emit('role-changed', {});
		},
		[SET_USER_ID]: (state, payload) => {
			state.id = payload;
		},
		[SET_ROLE]: (state, payload) => {
			state.roles = payload;
		},
	},
	actions: {},
};
