import { BuyMutationTypes } from 'store/module/buy';

export default {
	name: 'DashBroad',
	props: {
		view: {
			default: null,
		},
	},
	data() {
		return {
			currentView: this.$store.getters['buy/curr'].currentViewDashboard,
			view: null,
		};
	},
	created() {
		// console.log('fuck life:', this.currentView);
		// console.log('fuck life:', this.view);
		if (this.view != null) {
			this.currentView = 'Dashboard';
			// console.log('shit life:', this.currentView);
		}
		// console.log('fuck currentView:', this.currentView);
	},
	methods: {
		change(view) {
			this.currentView = view;
			// this.$emit('currentViewUpdate', view);
			this.$store.commit(BuyMutationTypes.SET_CURRENT_DASHBOARD, this.currentView);
		},
	},
};
