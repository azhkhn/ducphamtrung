import { events } from 'vue-i18n-manager';

export default {
	name: 'HomePage',
	data() {
		return {
			message: 'hello world',
			firstName: '',
		};
	},
	created() {
		this.firstName = this.$store.getters['user/firstName'];
		// const router = getRouter();
		// console.log(router.currentRoute.name);
		// const configManager = getValue(CONFIG_MANAGER);
		// const gateway = getValue(GATEWAY);
		// gateway
		// 	.get(`${configManager.getVariable(VariableNames.VERSIONED_STATIC_ROOT)}data/test.json`)
		// 	.then(response => {
		// 		console.log(response.data);
		// 	});
	},
	methods: {
		ChangeLanguage() {
			// console.log(this.$store.getters.currentLanguage);
			if (this.$store.getters.currentLanguage.code !== 'en') this.$store.dispatch(events.SET_LANGUAGE, 'en');
			else this.$store.dispatch(events.SET_LANGUAGE, '');
		},
	},
};
