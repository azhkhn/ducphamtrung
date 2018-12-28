import { events } from 'vue-i18n-manager';

export default {
	name: 'App',
	data() {
		return {
			// showModal: false,
		};
	},
	created() {
		console.log(this.currentLangCode);
		if (this.currentLangCode !== '' && this.currentLangCode !== null) {
			this.$store.dispatch(events.SET_LANGUAGE, this.currentLangCode);
		}
	},
	computed: {
		currentLangCode() {
			return this.$store.getters['user/getCurrentLangCode'];
		},
	},
};
