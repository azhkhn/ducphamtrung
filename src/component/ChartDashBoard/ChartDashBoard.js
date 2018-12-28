import DatePicker from 'vue2-datepicker';
import Calendar from 'vue2-slot-calendar';
import DateRangePicker from 'vue2-daterange-picker';
import Datepicker from 'vuejs-datepicker';
import { en, vi } from 'vuejs-datepicker/dist/locale';
import 'swiper/dist/css/swiper.css';
import { BuyMutationTypes } from 'store/module/buy';
import { RememberMeMutationTypes } from 'store/module/rememberMe';
import { UserMutationTypes } from 'store/module/user';

export default {
	data() {
		return {
			en,
			vi,
			now: new Date(),
			state: {},
			from: new Date(),
			to: new Date(this.$moment(new Date()).add(-30, 'd')),
			fromBooking: new Date(),
			toBooking: new Date(this.$moment(new Date()).add(-30, 'd')),
			fromStaff: new Date(),
			toStaff: new Date(this.$moment(new Date()).add(-30, 'd')),
			fromStatus: new Date(),
			fromBookingStaff: new Date(),

			series: [
				{
					name: '',
					data: [],
				},
			],

			seriesBooking: [
				{
					name: '',
					data: [],
				},
			],

			seriesStaff: [
				{
					name: '',
					data: [],
				},
			],
			seriesStatus: [],

			seriesBookingStaff: [],
			labelsStaff: [],
			categoriesOption: [],
			categoriesBooking: [],
			categoriesOptionStaff: [],
			labelsOption: [],
		};
	},
	components: {
		DatePicker,
		Calendar,
		DateRangePicker,
		Datepicker,
	},
	computed: {
		checkAddDay() {
			const b = this.$moment(this.to);
			const a = this.$moment(this.now);
			if (b.diff(a, 'days') >= 0) {
				return true;
			}
			return false;
		},
		checkAddDayBooking() {
			const b = this.$moment(this.toBooking);
			const a = this.$moment(this.now);
			if (b.diff(a, 'days') >= 0) {
				return true;
			}
			return false;
		},
		checkAddDayStaff() {
			const b = this.$moment(this.toStaff);
			const a = this.$moment(this.now);
			if (b.diff(a, 'days') >= 0) {
				return true;
			}
			return false;
		},
		chartOptions() {
			return {
				dataLabels: {
					enabled: true,
				},
				stroke: {
					curve: 'smooth',
				},
				labels: [...this.labelsOption],
				colors: ['#ffbc70', '#b47ee3', '#acacac', '#458de6', '#ff8383', '#e13434', '#fffb88', '#a9ea2c'],
				legend: {
					show: true,
					showForSingleSeries: true,
					position: 'bottom',
					// itemMargin: {
					// 	horizontal: 20,
					// 	vertical: 5,
					// },
					containerMargin: {
						left: 0,
						top: 0,
					},
					formatter(seriesName, opts) {
						return [seriesName, ' - ', opts.w.globals.series[opts.seriesIndex]];
					},
				},
				tooltip: {
					y: {
						formatter: undefined,
						title: {
							formatter: seriesName => seriesName,
						},
					},
				},
				responsive: [
					{
						breakpoint: 480,
						options: {
							chart: {
								width: 300,
							},
						},
					},
				],
			};
		},
		optionsStaff() {
			return {
				stroke: {},
				fill: {
					type: 'horizontalBar',
				},
				dataLabels: {
					enabled: true,
					textAnchor: 'start',
					style: {
						colors: ['#000'],
					},
					formatter(val) {
						return (val / 1)
							.toFixed(0)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					},
				},
				chart: {},
				xaxis: {
					categories: [...this.categoriesOptionStaff],
				},
				plotOptions: {
					bar: {
						horizontal: true,
						distributed: true,
						barHeight: '90%',
						dataLabels: {
							position: 'right',
						},
					},
				},
			};
		},
		chartOptionsBookingStaff() {
			return {
				dataLabels: {
					enabled: true,
				},

				labels: [...this.labelsStaff],
				legend: {
					show: true,
					showForSingleSeries: true,
					position: 'right',
					containerMargin: {
						left: 0,
						top: 0,
					},
					formatter(seriesName, opts) {
						return [seriesName, ' - ', opts.w.globals.series[opts.seriesIndex]];
					},
				},
				tooltip: {
					x: {},
				},
				responsive: [
					{
						breakpoint: 480,
						options: {
							chart: {
								width: 300,
							},
						},
					},
				],
			};
		},
		options() {
			return {
				stroke: {
					curve: 'smooth',
				},
				fill: {
					type: 'origin',
				},
				dataLabels: {
					enabled: false,
				},
				chart: {
					id: 'vuechart-example',
				},
				xaxis: {
					categories: [...this.categoriesOption],
				},
				yaxis: {
					labels: {
						style: {
							color: '#8e8da4',
						},
						offsetX: 0,
						formatter(val) {
							return (val / 1)
								.toFixed(0)
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
						},
					},
				},
			};
		},
		optionsBooking() {
			return {
				stroke: {
					curve: 'smooth',
				},
				fill: {
					type: 'origin',
				},
				dataLabels: {
					enabled: false,
				},
				chart: {
					id: 'vuechart-example',
				},
				xaxis: {
					categories: [...this.categoriesBooking],
				},
			};
		},
	},
	created() {
		this.from = this.$moment(new Date(this.$moment(new Date()).add(-15, 'd'))).format('YYYY-MM-DD');
		this.to = this.$moment(new Date()).format('YYYY-MM-DD');
		this.fromBooking = this.$moment(new Date(this.$moment(new Date()).add(-15, 'd'))).format('YYYY-MM-DD');
		this.toBooking = this.$moment(new Date()).format('YYYY-MM-DD');
		this.fromStaff = this.$moment(new Date(this.$moment(new Date()).add(-15, 'd'))).format('YYYY-MM-DD');
		this.toStaff = this.$moment(new Date()).format('YYYY-MM-DD');
		this.callApiBookingPrice();
		this.callApiBookingCount();
		this.callApiBookingStaff();
		this.callApiBookingStatus();
		this.callApiBookingbyStaff();
	},
	methods: {
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
						// getRouter().push('/login');
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
		diffDay() {
			this.from = this.$moment(new Date(this.$moment(this.from).add(-15, 'd'))).format('YYYY-MM-DD');
			this.to = this.$moment(new Date(this.$moment(this.to).add(-15, 'd'))).format('YYYY-MM-DD');
			this.options.xaxis.categories = [];
			this.callApiBookingPrice();
			console.log('date', this.options.xaxis.categories);
			this.options.xaxis.categories = this.options.xaxis.categories;
		},
		addDay() {
			this.from = this.$moment(new Date(this.$moment(this.from).add(15, 'd'))).format('YYYY-MM-DD');
			this.to = this.$moment(new Date(this.$moment(this.to).add(15, 'd'))).format('YYYY-MM-DD');
			this.options.xaxis.categories = [];
			this.callApiBookingPrice();
			this.options.xaxis.categories = this.options.xaxis.categories;
		},
		diffDayStaff() {
			this.fromStaff = this.$moment(new Date(this.$moment(this.fromStaff).add(-15, 'd'))).format('YYYY-MM-DD');
			this.toStaff = this.$moment(new Date(this.$moment(this.toStaff).add(-15, 'd'))).format('YYYY-MM-DD');
			this.callApiBookingStaff();
		},
		addDayStaff() {
			this.fromStaff = this.$moment(new Date(this.$moment(this.fromStaff).add(15, 'd'))).format('YYYY-MM-DD');
			this.toStaff = this.$moment(new Date(this.$moment(this.toStaff).add(15, 'd'))).format('YYYY-MM-DD');
			this.callApiBookingStaff();
		},
		diffDayBooking() {
			this.fromBooking = this.$moment(new Date(this.$moment(this.fromBooking).add(-15, 'd'))).format(
				'YYYY-MM-DD',
			);
			this.toBooking = this.$moment(new Date(this.$moment(this.toBooking).add(-15, 'd'))).format('YYYY-MM-DD');
			this.callApiBookingCount();
		},
		addDayBooking() {
			this.fromBooking = this.$moment(new Date(this.$moment(this.fromBooking).add(15, 'd'))).format('YYYY-MM-DD');
			this.toBooking = this.$moment(new Date(this.$moment(this.toBooking).add(15, 'd'))).format('YYYY-MM-DD');
			this.optionsBooking.xaxis.categories = [];
			this.callApiBookingCount();
		},
		formatPrice(value) {
			const val = (value / 1).toFixed(0).replace('.', '.');
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
		callApiBookingPrice() {
			this.$gateway
				.post(`/v1/ta/booking-price-month`, {
					from: this.from,
					to: this.to,
				})
				.then(
					response => {
						// eslint-disable-next-line valid-typeof
						const list = typeof response.data.value !== [] ? response.data.value : [];
						this.series[0].data = [];
						this.categoriesOption = [];
						for (let i = 0; i < response.data.value.length; i += 1) {
							this.series[0].data.push(response.data.value[i].price);
							this.categoriesOption.push(this.$moment(response.data.value[i].date).format('DD/MM'));
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
		callApiBookingCount() {
			this.$gateway
				.post(`/v1/ta/booking-count-month`, {
					from: this.fromBooking,
					to: this.toBooking,
				})
				.then(
					response => {
						// eslint-disable-next-line valid-typeof
						const list = typeof response.data.value !== [] ? response.data.value : [];
						this.seriesBooking[0].data = [];
						this.categoriesBooking = [];
						for (let i = 0; i < response.data.value.length; i += 1) {
							this.seriesBooking[0].data.push(response.data.value[i].quantity);
							this.categoriesBooking.push(this.$moment(response.data.value[i].name).format('DD/MM'));
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
		callApiBookingStaff() {
			this.$gateway
				.post(`/v1/ta/booking-price-month-by-staff`, {
					from: this.fromStaff,
					to: this.toStaff,
				})
				.then(
					response => {
						// eslint-disable-next-line valid-typeof
						const list = typeof response.data.value !== [] ? response.data.value : [];
						this.seriesStaff[0].data = [];
						this.categoriesOptionStaff = [];
						for (let i = 0; i < response.data.value.length; i += 1) {
							this.seriesStaff[0].data.push(response.data.value[i].price);
							this.categoriesOptionStaff.push(response.data.value[i].name);
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
		checkDate() {
			const stardate = new Date();
			this.state = {
				disabledDates: {
					from: new Date(stardate.setDate(stardate.getDate())),
				},
			};
			this.callApiBookingStatus();
		},
		checkDateStaff() {
			const stardate = new Date();
			this.state = {
				disabledDates: {
					from: new Date(stardate.setDate(stardate.getDate())),
				},
			};
			this.callApiBookingbyStaff();
		},
		callApiBookingStatus() {
			this.$gateway
				.post(`/v1/ta/bookingCount`, {
					inputDate: this.fromStatus,
				})
				.then(
					response => {
						this.seriesStatus = [];
						this.labelsOption = [];
						this.seriesStatus.push(response.data.value.awaitPayment);
						this.seriesStatus.push(response.data.value.awaitFullyPayment);
						this.seriesStatus.push(response.data.value.paymentFailed);
						this.seriesStatus.push(response.data.value.confirm);
						this.seriesStatus.push(response.data.value.voids);
						this.seriesStatus.push(response.data.value.cancel);
						this.seriesStatus.push(response.data.value.inService);
						this.seriesStatus.push(response.data.value.close);
						//
						this.labelsOption.push(`Await Payment`);
						this.labelsOption.push(`Await Fully Payment`);
						this.labelsOption.push(`Payment Failed`);
						this.labelsOption.push(`Confirm`);
						this.labelsOption.push(`Void`);
						this.labelsOption.push(`Cancel`);
						this.labelsOption.push(`Inservice`);
						this.labelsOption.push(`Close`);
					},
					error => {
						console.log('failed', error);
						if (error.status === 403) {
							this.showAlertLogout();
						}
					},
				);
		},
		callApiBookingbyStaff() {
			this.$gateway
				.post(`/v1/ta/booking-by-staff`, {
					inputDate: this.fromBookingStaff,
				})
				.then(
					response => {
						this.seriesBookingStaff = [];
						this.chartOptionsBookingStaff.labels = [];
						const listStaff = [];
						response.data.value.forEach(element => {
							listStaff.push(element.name);
							this.seriesBookingStaff.push(element.quantity);
						});
						this.labelsStaff = [...listStaff];
					},
					error => {
						console.log('failed', error);
						if (error.status === 403) {
							this.showAlertLogout();
						}
					},
				);
		},
	},
	mounted() {},

	// eslint-disable-next-line prettier/prettier
  };
