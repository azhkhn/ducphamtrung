// import Axios from "../../../node_modules/axios";
import { BuyMutationTypes } from 'store/module/buy';
import { RememberMeMutationTypes } from 'store/module/rememberMe';
import { UserMutationTypes } from 'store/module/user';

export default {
	name: 'PaymentDetail',
	data() {
		return {
			paymentDetail: {},
			fields: [
				// { key: 'Q', label: 'Q' },
				// { key: 'Title', label: 'Title' },
				// { key: 'UnitPrice', label: 'Unit Price' },
				// { key: 'Total', label: 'Total' },
			],
			link: null,
		};
	},
	mounted() {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0;
	},
	created() {
		if (this.$store.getters.currentLanguage.code === 'vi') {
			this.fields = [
				// { key: 'Q', label: 'SL' },
				{ key: 'Title', label: 'Tiêu đề' },
				// { key: 'UnitPrice', label: 'Đơn giá' },
				{ key: 'Total', label: 'Tổng' },
			];
		} else {
			this.fields = [
				// { key: 'Q', label: 'Q' },
				{ key: 'Title', label: 'Title' },
				// { key: 'UnitPrice', label: 'Unit Price' },
				{ key: 'Total', label: 'Total' },
			];
		}
		this.link = this.$store.getters['buy/payment'];
		this.detailBooking();
	},
	methods: {
		callApiPaymentReturn() {
			const tuanphansy = window.location.search.substring(1, window.location.search.length);
			this.$gateway.post(`/v1/ta/paymentReturn`, tuanphansy).then(
				response => {
					this.paymentDetail = response.data.value;
					this.$store.commit(BuyMutationTypes.SET_PAYMENT, response.data.value);
				},
				error => {
					if (error.status === 403) {
						this.showAlertLogout();
					}
				},
			);
		},
		detailBooking() {
			if (window.location.search.length === 0) {
				this.paymentDetail = this.$store.getters['buy/payment'];
			} else {
				this.callApiPaymentReturn();
			}
		},
		formatPrice(value) {
			if(this.$store.getters['user/getCurrentcy']==='VND'){
				const val = (value / 1).toFixed(0).replace('.', '.');
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}else{
				const val = (value / 1).toFixed(2).replace('.', '.');
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}
		},
		AddOtherRoom() {
			window.location.href = '/b2b/detailSearch';
		},
		goHome() {
			window.location.href = '/b2b/avaiSearch';
		},
		showAlertLogout() {
			// Use sweetalret2
			if (this.$store.getters.currentLanguage.code !== 'vi') {
				this.$swal({
					title: '<strong> Warning !!!</strong>',
					type: 'warning',
					html: `Your session has expired`,
					allowOutsideClick : false,
					showCloseButton: false,
					showCancelButton: false,
					showConfirmButton: true,
					focusConfirm: false,
					confirmButtonText: 'Pre Log In',
					confirmButtonAriaLabel: 'Thumbs up, great!',
					cancelButtonText: 'Close',
					cancelButtonAriaLabel: 'Thumbs up, great!',
					cancelButtonColor: '#d33',
				}).then(result => {
					if (result.value) {
						this.$store.commit(UserMutationTypes.SET_USER_INFO, null);
						this.$store.commit(RememberMeMutationTypes.SET_REMEMBER_AGENT, null);
						this.$store.commit(RememberMeMutationTypes.SET_REMEMBERPASSWORD, '');
						this.$store.commit(RememberMeMutationTypes.SET_REMEMBER_USERNAME, '');
						this.$store.commit(BuyMutationTypes.SET_COUPON, '');
						this.$router.push('/login');
					}
				});
			} else {
				this.$swal({
					title: '<strong> Thông báo !!!</strong>',
					type: 'warning',
					html: `Phiên làm việc của bạn đã hết hạn`,
					allowOutsideClick : false,
					showCloseButton: false,
					showCancelButton: false,
					showConfirmButton: true,
					focusConfirm: false,
					confirmButtonText: 'Đăng nhập lại',
					confirmButtonAriaLabel: 'Thumbs up, great!',
					cancelButtonText: 'Đóng',
					cancelButtonAriaLabel: 'Thumbs up, great!',
					cancelButtonColor: '#d33',
				}).then(result => {
					if (result.value) {
						this.$store.commit(UserMutationTypes.SET_USER_INFO, null);
						this.$store.commit(RememberMeMutationTypes.SET_REMEMBER_AGENT, null);
						this.$store.commit(RememberMeMutationTypes.SET_REMEMBERPASSWORD, '');
						this.$store.commit(RememberMeMutationTypes.SET_REMEMBER_USERNAME, '');
						this.$store.commit(BuyMutationTypes.SET_COUPON, '');
						this.$router.push('/login');
					}
				});
			}
		},
	},
};
