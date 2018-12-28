export default {
	name: 'LeftNavBar',
	methods: {
		change(view) {
			console.log(view);
			this.$emit('currentViewUpdate', view);
		},
	},
};
