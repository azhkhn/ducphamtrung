export const SET_REMEMBERPASSWORD = 'setRememberPassword';
export const SET_REMEMBER_AGENT = 'setRememberagentId';
export const SET_REMEMBER_USERNAME = 'setRememberusername';
export const SET_REMEMBER_FULLNAME = 'setRememberfullname';

export default {
	namespaced: true,
	state: {
		rememberPassword: {
			agentId: '',
			username: '',
			password: '',
			fullName: '',
		},
	},
	getters: {
		rememberPassword: state => state.rememberPassword,
	},
	mutations: {
		[SET_REMEMBERPASSWORD]: (state, payload) => {
			state.rememberPassword.password = payload;
		},
		[SET_REMEMBER_AGENT]: (state, payload) => {
			state.rememberPassword.agentId = payload;
		},
		[SET_REMEMBER_USERNAME]: (state, payload) => {
			state.rememberPassword.username = payload;
		},
		[SET_REMEMBER_FULLNAME]: (state, payload) => {
			state.rememberPassword.fullName = payload;
		},
	},
	actions: {},
};
