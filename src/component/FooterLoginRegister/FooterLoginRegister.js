import { events } from 'vue-i18n-manager';

export default {
	name: 'FooterLoginRegister',
	methods: {
		changeLanguage(code) {
			this.$store.dispatch(events.SET_LANGUAGE, code);
		},
		isCurrentLanguage(code) {
			return this.$store.getters.currentLanguage.code === code;
		},
	},
};
