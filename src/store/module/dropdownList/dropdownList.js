export default {
	namespaced: true,
	state: {
		city: [
			{
				id: 1,
				value: 'ha noi',
			},
			{
				id: 2,
				value: 'ha noi 2',
			},
			{
				id: 3,
				value: 'ha noi 3',
			},
		],
	},
	getters: {
		getCity: state => state.city,
	},
	mutations: {
		addData(state, city) {
			// mutate state
			state.customers.push(city);
		},
	},
	actions: {},
	// mounted() {
	// 	this.$http
	// 		.get('http://localhost/facebook-login/api/get_customers.php')
	// 		.then(response => response.data)
	// 		.then(data => {
	// 			store.commit('addData', response.data);
	// 		});
	// },
};
