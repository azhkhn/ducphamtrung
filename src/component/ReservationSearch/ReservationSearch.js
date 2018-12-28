// import { eventHub } from 'control/startUp';
import Spinner from 'vue-spinkit';
import { BuyMutationTypes } from 'store/module/buy';
import { RememberMeMutationTypes } from 'store/module/rememberMe';
import { UserMutationTypes } from 'store/module/user';
import DatePicker from 'vue2-datepicker';
import Calendar from 'vue2-slot-calendar';
import DateRangePicker from 'vue2-daterange-picker';
import Datepicker from 'vuejs-datepicker';
import { en, vi } from 'vuejs-datepicker/dist/locale';

export default {
	name: 'ReservationSearch',
	props: ['filter'],
	data() {
		return {
			en,
			vi,
			linkBar: [
				{
					text: this.$t('Hotel_div_ApplyForAccess'),
					href: '/b2b/hotelsofta',
				},
				{
					text: this.$t('Reservation_Search'),
					href: '#',
				},
			],
			fields: [],
			currentPage: 1,
			perPage: 10,
			totalRows: 0,
			// totalPerPage: 0,
			loading: true,
			pageOptions: [10, 15, 20],
			sortBy: null,
			sortDesc: false,
			sortDirection: 'asc',
			filter: null,
			langcode: '',
			agentcode: '',
			itemDetail: [],
			booking: {},
			ktra: 0,
			faill: 0,
			value: '',
			// rangeStatus: 1,
			// rangeStatus1: 2,
			// clear: false,
			currentView: 'ApplyforAccess',
			// disabled: [],
			// getBus: {},
			filter1: {
				filterReserSearch: {
					hotel: '',
					fromDate: '',
					toDate: '',
					selectedSearch: '',
					selectedStatus: '',
					bookingCode: '',
				},
			},
			startDate: '2017-09-05',
			endDate: '2017-09-15',
			fromDate: new Date(),
			toDate: new Date(),
			state: {},
			state1: {},
			errorDate: 0,
			selected: [],
			hotel: '',
			selected1: [],
			hotel1: '',
			hotel2: '',
			lstCountry: [],
			temp: '',
			countries: [],
			locations: [],
			selectedSearch: 'BOOKINGDATE',
			selectedStatus: '',
			selectedUser: '---All---',
			bookingCode: '',
			searchBy: [
				{
					key: '',
					value: '--- All ---',
				},
				{
					key: 'BOOKINGCODE',
					value: 'BOOKING CODE',
				},
				{
					key: 'BOOKINGDATE',
					value: 'BOOKING DATE',
				},
				{
					key: 'CHECKINDATE',
					value: 'CHECK IN DATE',
				},
				{
					key: 'CHECKOUTDATE',
					value: 'CHECK OUT DATE',
				},
			],
			bookingStatus: [
				{
					key: '',
					value: '--- All ---',
				},
				{
					key: 'CANCEL',
					value: 'CANCEL',
				},
				{
					key: 'AWAIT_PAYMENT',
					value: 'AWAIT PAYMENT',
				},
				{
					key: 'CLOSE',
					value: 'CLOSE',
				},
				{
					key: 'IN_SERVICE',
					value: 'IN_SERVICE',
				},
				{
					key: 'PAYMENT_FAILED',
					value: 'PAYMENT_FAILED',
				},
				{
					key: 'CONFIRM',
					value: 'CONFIRM',
				},
				{
					key: 'AWAIT_FULLY_PAYMENT',
					value: 'AWAIT_FULLY_PAYMENT',
				},
				{
					key: 'VOID',
					value: 'VOID',
				},
				{
					key: 'UNPOSTED',
					value: 'UNPOSTED',
				},
				{
					key: 'MODIFIED',
					value: 'MODIFIED',
				},
				{
					key: 'CANCELED',
					value: 'CANCELED',
				},
			],
			lstUser: [],
		};
	},
	components: {
		Spinner,
		DatePicker,
		Calendar,
		DateRangePicker,
		Datepicker,
	},
	destroyed() {
		this.$store.commit(BuyMutationTypes.SET_BOOKINGSTATUS, '');
	},
	mounted() {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0;
		this.calApi();
	},
	methods: {
		exportTableToExcel(tableID, filename = '') {
			let downloadLink;
			const dataType = 'application/vnd.ms-excel';
			const tableSelect = document.getElementById(tableID);
			const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

			// Specify file name
			filename = filename ? `${filename}.xls` : 'excel_data.xls';

			// Create download link element
			// eslint-disable-next-line prefer-const
			downloadLink = document.createElement('a');

			document.body.appendChild(downloadLink);

			if (navigator.msSaveOrOpenBlob) {
				const blob = new Blob(['\ufeff', tableHTML], {
					type: dataType,
				});
				navigator.msSaveOrOpenBlob(blob, filename);
			} else {
				// Create a link to the file
				downloadLink.href = `data:${dataType}, ${tableHTML}`;

				// Setting the file name
				downloadLink.download = filename;

				// triggering the function
				downloadLink.click();
			}
		},
		changeFilterReservationSearch() {
			this.calApi();
		},
		calApi() {
			this.loading = true;
			this.$gateway
				.post(`/v1/ta/searchReservation`, {
					bookingCode: this.bookingCode,
					bookingStatus: this.selectedStatus,
					endDate: this.toDate === '' ? '' : this.$moment(this.toDate).format('YYYY-MM-DD'),
					fromDate: this.fromDate === '' ? '' : this.$moment(this.fromDate).format('YYYY-MM-DD'),
					hotelName: this.hotel2,
					langCode: this.$store.getters.currentLanguage.code,
					searchBy: this.selectedSearch,
				})
				.then(
					response => {
						const listRes =
							response.data.value !== [] && Array.isArray(response.data.value) ? response.data.value : [];
						if (listRes.length === 0) {
							this.loading = false;
							this.faill = 1;
							this.itemDetail = [];
						} else {
							const listTmp = [];
							if (this.selectedUser !== '---All---') {
								for (let i = 0; i < listRes.length; i += 1) {
									const temp = {};
									temp.bookingCode = listRes[i].bookingCode;
									temp.bookingStatus = listRes[i].bookingStatus;
									temp.cancellationResponses = listRes[i].cancellationResponses;
									temp.checkinDate = listRes[i].checkinDate;
									temp.checkoutDate = listRes[i].checkoutDate;
									temp.createdBooking = listRes[i].createdBooking;
									temp.currencyCode = listRes[i].currencyCode;
									temp.cusName = listRes[i].cusName;
									temp.hotelId = listRes[i].hotelId;
									temp.i18ns = listRes[i].i18ns;
									temp.paymentResponses = listRes[i].paymentResponses;
									temp.totalAmount = listRes[i].totalAmount;
									temp.booked = listRes[i].booked;
									temp.dateFreeCancel = [];
									if (this.selectedUser.includes(temp.booked) === true) {
										listTmp.push(temp);
									}
								}
							} else {
								for (let i = 0; i < listRes.length; i += 1) {
									const temp = {};
									temp.bookingCode = listRes[i].bookingCode;
									temp.bookingStatus = listRes[i].bookingStatus;
									temp.cancellationResponses = listRes[i].cancellationResponses;
									temp.checkinDate = listRes[i].checkinDate;
									temp.checkoutDate = listRes[i].checkoutDate;
									temp.createdBooking = listRes[i].createdBooking;
									temp.currencyCode = listRes[i].currencyCode;
									temp.cusName = listRes[i].cusName;
									temp.hotelId = listRes[i].hotelId;
									temp.i18ns = listRes[i].i18ns;
									temp.paymentResponses = listRes[i].paymentResponses;
									temp.totalAmount = listRes[i].totalAmount;
									temp.booked = listRes[i].booked;
									temp.dateFreeCancel = [];
									listTmp.push(temp);
								}
							}
							console.log('select', this.selectedUser);
							this.itemDetail = listTmp;
							this.loading = false;
							this.itemDetail.forEach(element => {
								if (element.cancellationResponses !== null) {
									for (let j = 0; j < element.cancellationResponses.length; j += 1) {
										element.dateFreeCancel[j] = this.$moment(this.element.checkoutDate)
											.subtract(element.cancellationResponses[j].cancellationDay, 'd')
											.format('DD/MM/YYYY');
									}
								}
							});
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
		checkDate() {
			const stardate = new Date(this.fromDate);
			this.state = {
				disabledDates: {
					to: new Date(stardate.setDate(stardate.getDate())),
				},
			};
		},
		checkDate1() {
			const enddate = new Date(this.toDate);
			this.state1 = {
				disabledDates: {
					from: new Date(enddate.setDate(enddate.getDate())),
				},
			};
		},

		Scrolltop() {
			// document.body.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0;
		},
		passdata(ddata) {
			this.booking = this.$store.getters['buy/viewbooking'];
			this.$store.commit(BuyMutationTypes.SET_VIEWBOOKING, ddata);
			this.$router.push('ViewBooking');
		},
		formatPrice(value) {
			if (this.$store.getters['user/getCurrentcy'] === 'VND') {
				const val = (value / 1).toFixed(0).replace('.', '.');
				return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}
			const val = (value / 1).toFixed(0).replace('.', '.');
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
		searchReservation() {},
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
		deduplicate(arr) {
			return arr.filter((value, index) => arr.indexOf(value) === index);
		},
		callApiReservation() {
			const now = new Date();
			const day = now.setDate(now.getDate() + 1);
			this.$gateway
				.post(`/v1/ta/searchReservation`, {
					bookingCode: '',
					bookingStatus: '',
					endDate: '',
					fromDate: '',
					hotelName: '',
					langCode: this.$store.getters.currentLanguage.code,
					searchBy: '',
				})
				.then(
					response => {
						const listRes =
							response.data.value !== [] && Array.isArray(response.data.value) ? response.data.value : [];
						const listTmp = [];
						this.lstUser = [];
						this.loading = true;
						if (listRes.length > 0) {
							listTmp.push('---All---');
							listRes.forEach(element => {
								listTmp.push(element.booked);
							});
							// this.lstUser = listTmp;
							console.log('lsttmp', listTmp);
							this.lstUser = this.deduplicate(listTmp);

							console.log('lstUser', this.lstUser);
							this.loading = false;
						} else {
							this.loading = false;
							this.faill = 1;
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
		onFiltered(filteredItems) {
			this.totalRows = filteredItems.length;
			this.currentPage = 1;
		},
	},
	created() {
		this.callApiReservation();
		if (this.$store.getters.currentLanguage.code === 'vi') {
			this.fields = [
				{ key: 'ReservationInfo', label: 'Thông tin đặt trước', class: 'ReservationInfo' },
				{ key: 'Hotel', label: 'Khách sạn', class: 'Hotel' },
				{ key: 'StayDate', label: 'Ngày nghỉ' },
				{ key: 'Price', label: 'Tổng' },
				{ key: 'FreeCancel', label: 'Hủy miễn phí' },
				{ key: 'User', label: 'Người đặt', class: 'User' },
				{ key: 'PayMent', label: 'Thanh toán' },
				{ key: 'Status', label: 'Trạng thái', class: 'Statuss' },
			];
		} else {
			this.fields = [
				{ key: 'ReservationInfo', label: 'Reservation Info', class: 'ReservationInfo' },
				{ key: 'Hotel', label: 'Hotel', class: 'Hotel' },
				{ key: 'StayDate', label: 'Stay Date' },
				{ key: 'Price', label: 'Total' },
				{ key: 'FreeCancel', label: 'Free Cancel' },
				{ key: 'User', label: 'Booker', class: 'User' },
				{ key: 'PayMent', label: 'Payment' },
				{ key: 'Status', label: 'Status', class: 'Statuss' },
			];
		}
	},
	computed: {
		loadPage() {
			this.langcode = this.$store.getters.currentLanguage.code;
			this.agentcode = this.$store.getters['user/id'];
		},
	},
};
