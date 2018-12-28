import { events } from 'vue-i18n-manager';
import { UserMutationTypes } from 'store/module/user';

export default {
	name: 'FooterAll',
	data() {
		return {
			opacityvi: 0.4,
			opacityen: 1,
		};
	},
	created() {
		if (this.$store.getters.currentLanguage.code !== 'vi') {
			this.opacityvi = 1;
			this.opacityen = 0.4;
		} else {
			this.opacityvi = 0.4;
			this.opacityen = 1;
		}
	},
	methods: {
		changeLanguage(code) {
			this.$store.dispatch(events.SET_LANGUAGE, code);
			this.$store.commit(UserMutationTypes.SET_LANGCODE, code);
			window.location.reload(true);
		},
		isCurrentLanguage(code) {
			return this.$store.getters.currentLanguage.code === code;
		},
		// $('button.vi').click(function() {
		// 	$('button.en').css('opacity', '0.4');
		// });
	},
};
