import { UserMutationTypes } from 'store/module/user';
import getRouter from 'router';

export default {
	name: 'Test',
	data() {
		return {
			username: '',
			role: '',
		};
	},
	created() {
		console.log(this.$store);
		this.username = this.$store.getters['user/userName'];
		this.role = this.$store.getters['user/roles'];
	},
	methods: {
		setFirstName() {
			this.$store.commit(UserMutationTypes.SET_FIRST_NAME, this.data);
		},
		goHome() {
			this.$gateway.get('Values').then(response => {
				console.log(response.data);
			});
		},
	},
};
