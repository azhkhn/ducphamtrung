import axios from 'axios';
import { BuyMutationTypes } from 'store/module/buy';

export default {
	name: 'NavBarLeft',
	data() {
		return {
			hotel: '',
			country: '',
			lstCountry: [],
			store: '',
			currentView: 'ApplyforAccess',
			classCurrent: 'none',
		};
	},
	methods: {
		change(view) {
			this.$store.commit(BuyMutationTypes.SET_CURRENT, view);
			console.log(view);
			this.$emit('currentViewUpdate', view);
			const curr = this.$store.getters['buy/curr'];
			this.currentView = curr.currentview;
		},
	},
	created() {
		const curr = this.$store.getters['buy/curr'];
		this.currentView = curr.currentview;
	},
};
