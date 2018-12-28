import getRouter from 'router';
import { RememberMeMutationTypes } from 'store/module/rememberMe';
import { UserMutationTypes } from 'store/module/user';
import { BuyMutationTypes } from 'store/module/buy';

export default {
	name: 'ViewBooking',

	data() {
		return {
			lts: {},
			textcancelReservation: '',
			itemDetail: {
				responseCode: 0,
				customerResponse: {},
				bookingResponse: {},
				bookinglineResponses: [],
				policyResponse: {},
				depositResponses: [],
				cancellResponses: [],
				paymentResponses: [],
				guests: {
					countAdults: 0,
					countChildren: 0,
				},
				subTotal: 0,
				taxTotal: 0,
				Total: 0,
				nights: 0,
				paymentAmount: {
					totalPaid: 0,
					unpaidAmount: 0,
				},
				emailHotel: '',
				currency: '',
				bookingStatus: '',
			},
			rate: 0,
			test: [],
			optionsATM: [],
			selectedATM: 0,
			getway: [],
			errorResponse6: true,
			info: [
				{ key: 'tittle', label: '', class: 'info-content' },
				{ key: 'info', label: '', class: 'info-content' },
			],
			fields: [
				// { key: 'Q', label: 'Q' },
				{ key: 'Title', label: 'Tiêu đề' },
				// { key: 'UnitPrice', label: 'Đơn giá' },
				{ key: 'Total', label: 'Tổng' },
			],
			itemModal: null,
		};
	},
	created() {
		this.test = this.$store.getters['buy/viewbooking'];
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
		this.$eventHub.$on('pdata', this.ddata);
		this.$gateway
			.post(`/v1/ta/details`, {
				bookingCode: this.test.bookingCode,
				langCode: this.$store.getters.currentLanguage.code,
			})
			.then(
				response => {
					this.lst = response.data.value;
					console.log('view booking', this.lst);
					this.itemDetail.bookingStatus = this.lst.bookingStatus;
					this.itemDetail.subTotal = this.lst.total - this.lst.totalTax;
					this.itemDetail.Total = this.lst.total;
					for (let i = 0; i < this.lst.bookinglineResponses.length; i += 1) {
						this.itemDetail.guests.countAdults =
							this.itemDetail.guests.countAdults + this.lst.bookinglineResponses[i].adult;
						this.itemDetail.guests.countChildren =
							this.itemDetail.guests.countChildren + this.lst.bookinglineResponses[i].children;
					}
					const a = this.$moment(this.lst.checkinDate);
					const b = this.$moment(this.lst.checkoutDate);
					this.itemDetail.nights = b.diff(a, 'days');
				},
				error => {
					console.log('failed', error);
					if (error.status === 403) {
						this.showAlertLogout();
					}
				},
			);
	},
	beforeDestroy() {
		this.$eventHub.$off('pdata');
	},
	mounted() {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0;
		this.ApiGateway();
	},
	methods: {
		viewAgree() {
			// eslint-disable-next-line prefer-destructuring
			this.itemModal = this.$store.getters['buy/bookings'][0];
			this.$root.$emit('bv::show::modal', 'agree');
		},
		formatPrice(value) {
			if (this.$store.getters['user/getCurrentcy'] === 'VND') {
				const val = (value / 1).toFixed(0).replace('.', '.');
				return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}
			const val = (value / 1).toFixed(2).replace('.', '.');
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
		hideModal(modal) {
			this.$root.$emit('bv::hide::modal', modal);
		},
		printSummary() {
			this.$root.$emit('bv::show::modal', 'printSummary');
			// this.$htmlToPaper('printSummary');
			// window.print();
		},
		printVoucher(e) {
			this.$root.$emit('bv::show::modal', 'printVoucher');
			// this.$htmlToPaper(e);
			// window.print(e);
			// console.log("hjdfhjdsf");
		},
		print(e, modal) {
			this.$htmlToPaper(e);
			this.$root.$emit('bv::hide::modal', modal);
		},
		cancelReservation(e) {
			// this.optionsATM = [];
			// this.textcancelReservation = '';
			// this.selectedATM = 0;
			// this.$gateway.post(`/v1/ta/getGateway?hotelId=${this.test.hotelId}`).then(
			// 	response => {
			// 		if (response.data.responseCode === 0) {
			// 			const listGetWay = typeof response.data.gateways !== 'undefined' ? response.data.gateways : [];
			// 			console.log('abababa', listGetWay);
			// 			if (listGetWay.length > 0) {
			// 				for (let i = 0; i < listGetWay.length; i += 1) {
			// 					const element = {};
			// 					element.value = listGetWay[i].id;
			// 					element.icon = listGetWay[i].icon;
			// 					listGetWay[i].names.forEach(item => {
			// 						if (item.langCode === this.$store.getters.currentLanguage.code) {
			// 							element.text = item.title;
			// 						}
			// 					});
			// 					this.optionsATM.push(element);
			// 				}
			// 			}
			// 		}
			// 	},
			// 	error => {
			// 		console.log('failed', error);
			// 		if (error.status === 403) {
			// 			this.showAlertLogout();
			// 		}
			// 	},
			// );
			this.$root.$emit('bv::show::modal', e);
		},
		ApiGateway() {
			this.$gateway.post(`/v1/ta/getGateway?hotelId=${this.test.hotelId}`).then(
				response2 => {
					const listGetWay = response2.data.gateways.length !== 0 ? response2.data.gateways : [];
					if (listGetWay.length > 0) {
						this.getway = listGetWay;
						for (let i = 0; i < this.getway.length; i += 1) {
							for (let j = 0; j < this.getway[i].names.length; j += 1) {
								if (this.$store.getters.currentLanguage.code === this.getway[i].names[j].langCode) {
									const ls = {};
									ls.value = this.getway[i].id;
									ls.text = this.getway[i].names[j].title;
									this.optionsATM.push(ls);
								}
							}
						}
						this.selectedATM = 1;
					}
				},
				error => {
					console.log('failed', error);
					if (error.status) {
						this.showAlertLogout();
					}
				},
			);
		},
		showAlertLogout() {
			// Use sweetalret2
			if (this.$store.getters.currentLanguage.code !== 'vi') {
				this.$swal({
					title: '<strong> Warning !!!</strong>',
					type: 'warning',
					html: `Your session has expired`,
					allowOutsideClick: false,
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
					allowOutsideClick: false,
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
		btnCancelReservation(e) {
			this.$gateway
				.post('/v1/ta/cancelBooking', {
					code: this.test.bookingCode,
					gatewayId: this.selectedATM,
					reason: this.textcancelReservation,
					returnLink: `http://${window.location.host}`,
				})
				.then(
					response => {
						switch (response.data.responseCode) {
							case 0:
								this.$root.$emit('bv::hide::modal', e);
								this.$swal({
									position: 'top-end',
									type: 'success',
									title: this.$t('CANCEL_BOOKING_SUCCESSFULLY'),
									showConfirmButton: false,
									timer: 1500,
								}).then(() => {
									getRouter().push('/b2b/viewbooking');
									window.location.reload();
								});
								break;
							case 1:
								this.$root.$emit('bv::hide::modal', e);
								this.$swal({
									position: 'top-end',
									type: 'error',
									title: response.data.value,
									showConfirmButton: false,
									timer: 2500,
								});
								break;
							case 2:
								this.$root.$emit('bv::hide::modal', e);
								this.$swal({
									position: 'top-end',
									type: 'error',
									title: this.$t('ERROR_CANCEL'),
									showConfirmButton: false,
									timer: 2500,
								});
								break;
							case 3:
								// if (typeof response.data.value === 'string') {
								// 	window.location.reload(true);
								// 	window.location.href = response.data.value;
								// }
								this.$root.$emit('bv::hide::modal', e);
								this.$swal({
									position: 'top-end',
									type: 'success',
									title: this.$t('CANCEL_BOOKING_SUCCESSFULLY'),
									showConfirmButton: false,
									timer: 1500,
								}).then(() => {
									getRouter().push('/b2b/viewbooking');
									window.location.reload();
								});
								break;
							case 6:
								this.errorResponse6 = false;
								this.$root.$emit('bv::hide::modal', e);
								this.$swal({
									position: 'top-end',
									type: 'error',
									title: response.data.value,
									showConfirmButton: false,
									timer: 2500,
								});
								break;
							default:
								break;
						}
					},
					error => {
						console.log('failed', error);
						if (error.status === 403) {
							this.showAlertLogout();
						}
					},
				);
		},
		changeReservation() {
			this.$root.$emit('bv::show::modal', 'changeReservation');
		},
		AddOtherRoom() {
			getRouter().push('/b2b/AvaiSearch');
		},
	},
};
