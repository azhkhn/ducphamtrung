import getRouter from 'router';

export default {
	name: 'PageActive',
	created() {
		if (window.location.search.length === 0) {
			getRouter().push('/login');
		}
	},
	methods: {
		btnConfirmActive() {
			const tuanphansy = window.location.search.substring(1, window.location.search.length);
			this.$gateway.post('/v1/ta/confirmRegister', tuanphansy).then(response => {
				if (response.data.responseCode === 0) {
					this.$swal({
						position: 'center',
						type: 'success',
						title: this.$t('Active_Success'),
						text: 'Chào mừng bạn gia nhập ezB2B thuộc ezCloud',
						showConfirmButton: false,
						timer: 15000,
					}).then(() => {
						getRouter().push('/login');
					});
				} else {
					this.$swal({
						position: 'top-end',
						type: 'error',
						title: this.$t('Active_Faild'),
						showConfirmButton: false,
						timer: 15000,
					}).then(() => {
						getRouter().push('/outside/register');
					});
				}
			});
		},
	},
};
