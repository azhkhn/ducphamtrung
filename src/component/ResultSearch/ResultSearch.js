import vueSlider from 'vue-slider-component';
import HotelDatePicker from 'vue-hotel-datepicker';
import axios from 'axios';
import Multiselect from 'vue-multiselect';
// import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { BuyMutationTypes } from 'store/module/buy';
import { UserMutationTypes } from 'store/module/user';
import { SearchTempMutationTypes } from 'store/module/searchTemp';
import Spinner from 'vue-spinkit';
import VueSweetalert2 from 'vue-sweetalert2';
import { RememberMeMutationTypes } from 'store/module/rememberMe';
import PrettyCheckbox from 'pretty-checkbox-vue';
import PrettyInput from 'pretty-checkbox-vue/input';

// import 'vue-material/dist/theme/default.css';
// import fab from 'vue-fab';
// import getRouter from 'router';
// import Spinner from 'vue-simple-spinner';

const items = [];
export default {
	name: 'ResultSearch',
	props: {
		datasearch: {
			default: [],
		},
	},
	data() {
		return {
			collapse1: false,
			clickService: '',
			HideDisplay: true,
			showAccessHotel: true,
			showResultSearch: true,
			loading: false,
			inputHotel: '',
			sortBy: [
				// {
				// 	key: '',
				// 	value: '-- none --'
				// },
				// {
				// 	key: 'rankStarAsc',
				// 	value: `${this.$t('STARS_INCREASE')}`
				// },
				// {
				// 	key: 'rankStarDesc',
				// 	value:  `${this.$t('STARS_DESC')}`
				// },
				// {
				// 	key: 'pricedesc',
				// 	value:`${this.$t('PRICE_DESC')}`
				// },
				// {
				// 	key: 'priceasc',
				// 	value: `${this.$t('PRICE_INCREASE')}`
				// },
			],
			sort: '',
			type: [],
			selectedameniti: [],
			selectedamenitiroom: [],
			selectedtype: [],
			selectedlocation: [],
			passApi: [],
			datasearch: [],
			swiperOptionTop: {
				spaceBetween: 10,
				loop: true,
				loopedSlides: 5, // looped slides should be the same
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			},
			swiperOptionThumbs: {
				spaceBetween: 10,
				slidesPerView: 4,
				touchRatio: 0.2,
				loop: true,
				loopedSlides: 5, // looped slides should be the same
				slideToClickedSlide: true,
			},
			pas: {
				name: '',
				rank: 0,
				address: '',
				description: '',
			},
			hotelidmodal: {
				id: 0,
			},
			modalinfo: {},
			baged: 0,
			caged: 0,
			dataArray: [
				'ezhotel',
				'ezhotel 2',
				'ezFolio',
				'Folio',
				'A25',
				'HN',
				'VN',
				'abc',
				'def',
				'ghk',
				'ez 2',
				'123',
			],
			nameData: '',
			datePickerTranslate: {
				// night: 'Ngày',
				// nights: 'Ngày tối đa',
				// 'day-names': ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
				// 'check-in': 'Ngày Checkin',
				// 'check-out': 'Ngày Checkout',
				// 'month-names': [
				// 	'Tháng 1',
				// 	'Tháng 2',
				// 	'Tháng 3',
				// 	'Tháng 4',
				// 	'Tháng 5',
				// 	'Tháng 6',
				// 	'Tháng 7',
				// 	'Tháng 8',
				// 	'Tháng 9',
				// 	'Tháng 10',
				// 	'Tháng 11',
				// 	'Tháng 12',
				// ],
			},
			markup: [
				{
					id: 1,
					name: 'Popularity',
				},
			],
			lstMarkup: [
				{
					id: 1,
					name: 'Popularity',
				},
			],
			pageOptions: [1, 10, 15, 20],
			items,
			fields: [
				{
					key: 'img',
					label: '',
					class: 'image-content',
				},
				{
					key: 'info',
					label: 'Xếp hạng sao',
					sortable: true,
					class: 'info-content',
				},
				{
					key: 'action',
					label: 'Giá tiền',
					sortable: true,
				},
			],
			hotelAmenityMore: false,
			roomAmenityMore: false,
			locationMore: false,
			typeMore: false,
			currentPage: 1,
			perPage: 10,
			totalRows: 0,
			modalMap: {
				center: {
					lat: 1,
					lng: 2,
				},
				zoom: 1,
				name: '',
			},
			// modalInfo: {
			// 	title: '',
			// 	hotelid: ''
			// },
			markers: [],
			buy: {
				idHotel: 0,
				idRoom: 0,
				nameHotel: '',
				nameRoom: '',
				quantities: 0,
				price: 0,
				promotion: 0,
				address: '',
				rankStar: 0,
			},
			shopping: [],
			totalShop: 0,
			// Tuanphansy
			selected: {},
			selectedStar: [],
			selectedHotelAmenity: [],
			checkin: new Date(),
			checkOutdate: new Date(this.$moment(this.checkin).add(1, 'd')),

			selectedRoomAmenity: [],
			selectedHotelLocation: [],
			agentId: 0,
			hotelType: [],
			locations: [],
			filterLocations: [],
			filterLocationsLang: [],
			counterChilds: [],
			// children
			unit: {
				quantities: 0,
				ages: 0,
			},
			// adults
			unitAdults: {
				quantities: 0,
				age: 0,
			},
			// currentMoney: {},
			// value: [0, 0],
			currentMoney: [0, 0],
			currentMoney0: 0,
			currentMoney1: 0,
			valueMoney: [],
			numberStar: {
				star0half: 0.5,
				star1half: 1.5,
				star2half: 2.5,
				star3half: 3.5,
				star4half: 4.5,
				star5half: 5.5,
				star1: 1,
				star2: 2,
				star3: 3,
				star4: 4,
				star5: 5,
				star0: 0,
			},
			countStar0: [],
			countStar1: [],
			countStar2: [],
			countStar3: [],
			countStar4: [],
			countStar5: [],
			countStar0half: [],
			countStar1half: [],
			countStar2half: [],
			countStar3half: [],
			countStar4half: [],
			countStar5half: [],
			// count hotel amenities
			hotelAmenities: [],
			filterAmenities: [],
			filterAmenities1: [],
			listAmenities: [],
			countAmenities: [],
			// count room amenities
			roomAmenities: [],
			push2: [],
			pushPrice: [],
			filterRoomAmenities: [],
			filterRoomAmenities1: [],
			listRoomAmenities: [],
			countRoomAmenities: [],
			// count hotel location
			hotelLocations: [],
			filterHotelLocations: [],
			listHotelLocations: [],
			countHotelLocations: [],
			// count type hotel
			typeAmenities: [],
			filterTypeHotel: [],
			listTypeHotel: [],
			countTypeHotel: [],

			name: '',
			searchTemp: [],
			infoSearch: {
				location: {},
				fromDate: '',
				toDate: '',
				countAdults: 0,
				countChild: 0,
			},
			ktra: 0,
			maxPrice: 0,
			optionsold: [
				{
					value: 1,
					text: `1 ${this.$t('ages')}`,
				},
				{
					value: 2,
					text: `2 ${this.$t('ages')}`,
				},
				{
					value: 3,
					text: `3 ${this.$t('ages')}`,
				},
				{
					value: 4,
					text: `4 ${this.$t('ages')}`,
				},
				{
					value: 5,
					text: `5 ${this.$t('ages')}`,
				},
				{
					value: 6,
					text: `6 ${this.$t('ages')}`,
				},
				{
					value: 7,
					text: `7 ${this.$t('ages')}`,
				},
				{
					value: 8,
					text: `8 ${this.$t('ages')}`,
				},
				{
					value: 9,
					text: `9 ${this.$t('ages')}`,
				},
				{
					value: 10,
					text: `10 ${this.$t('ages')}`,
				},
				{
					value: 11,
					text: `11 ${this.$t('ages')}`,
				},
				{
					value: 12,
					text: `12 ${this.$t('ages')}`,
				},
			],
			errordate: false,
			errorlocation: false,
			ab1: 0,
			ab2: 0,
			cd1: 0,
			cd2: 0,
			setWeekend: 7,
			t2: 0,
			t3: 0,
			t4: 0,
			t5: 0,
			t6: 0,
			t7: 0,
			cn: 0,
			m: [],
			clearAllFilter: 0,
			clearStarFilter: 0,
			clearHotelAmenitiFilter: 0,
			clearRoomAmenitiFilter: 0,
			clearHotelTypeFilter: 0,
			// clearHotelLocationFilter :0,
		};
	},
	mounted() {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0;
		this.page = this.perPage;
	},
	components: {
		PrettyInput,
		PrettyCheckbox,
		vueSlider,
		HotelDatePicker,
		axios,
		swiper,
		swiperSlide,
		Multiselect,
		VueSweetalert2,
		// 'vue-simple-spinner': Spinner,
		Spinner,
		// fab,
	},
	computed: {
		filteredDataArray() {
			return this.dataArray.filter(
				option =>
					option
						.toString()
						.toLowerCase()
						.indexOf(this.nameData.toLowerCase()) >= 0,
			);
		},
		changeFilter() {
			this.callApiResultSearch();
		},
	},
	created() {
		this.page = this.perPage;
		if (this.$store.getters.currentLanguage.code !== 'vi') {
			this.datePickerTranslate = {
				night: 'Night',
				nights: 'Nights',
				'day-names': ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
				'check-in': 'Check-in',
				'check-out': 'Check-Out',
				'month-names': [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
					'September',
					'October',
					'November',
					'December',
				],
			};
			this.sortBy = [];
			this.sortBy.push(
				{
					key: '',
					value: '-- none --',
				},
				{
					key: 'rankStarAsc',
					value: 'Star ratings are increasing',
				},
				{
					key: 'rankStarDesc',
					value: 'Star Rating Descending',
				},
				{
					key: 'pricedesc',
					value: 'Price decreases',
				},
				{
					key: 'priceasc',
					value: 'Price increases',
				},
			);
		} else {
			this.datePickerTranslate = {
				night: 'Ngày',
				nights: 'Ngày tối đa',
				'day-names': ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
				'check-in': 'Checkin',
				'check-out': 'Checkout',
				'month-names': [
					'Tháng 1',
					'Tháng 2',
					'Tháng 3',
					'Tháng 4',
					'Tháng 5',
					'Tháng 6',
					'Tháng 7',
					'Tháng 8',
					'Tháng 9',
					'Tháng 10',
					'Tháng 11',
					'Tháng 12',
				],
			};
			this.sortBy = [];
			this.sortBy.push(
				{
					key: 'none',
					value: '-- none --',
				},
				{
					key: 'rankStarAsc',
					value: 'Hạng sao giảm dần',
				},
				{
					key: 'rankStarDesc',
					value: 'Hạng sao tăng dần',
				},
				{
					key: 'pricedesc',
					value: 'Giá tiền tăng dần',
				},
				{
					key: 'priceasc',
					value: 'Giá tiền giảm dần',
				},
			);
		}
		this.$gateway.get(`/v1/ta/get-change-rate`).then(
			responsemo => {
				const list = typeof responsemo.data.value !== 'undefined' ? responsemo.data.value : [];
				this.$store.commit(UserMutationTypes.SET_RATE, list);
			},
			error => {
				console.log('failed', error);
			},
		);
		// if (this.currentMoney[0] !== 0 && this.currentMoney[1] !== 0) {
		// 	this.currentMoney[0] = +this.currentMoney[0];
		// 	this.currentMoney[1] = +this.currentMoney[1];
		// 	this.valueMoney = this.currentMoney;
		// }
		// else {
		// 	this.valueMoney = [];
		// }
		this.agentId = this.$store.getters['user/id'];
		this.totalShop = this.$store.getters['buy/total'];
		this.shopping = this.$store.getters['buy/bookings'];
		this.searchTemp = this.$store.getters['searchTemp/search'];
		this.checkin = new Date(this.searchTemp[1]);
		this.checkOutdate = new Date(this.searchTemp[2]);
		this.langcode = this.$store.getters.currentLanguage.code;
		this.$gateway.post(`/v1/ta/getLocation`).then(
			response => {
				const listRes =
					typeof response.data.locations !== 'undefined' && Array.isArray(response.data.locations)
						? response.data.locations
						: [];
				const listTmp = [];
				if (listRes.length > 0) {
					for (let i = 0; i < listRes.length; i += 1) {
						// match data
						const temp = {};
						temp.id = listRes[i].id;
						temp.locType = listRes[i].locType;
						temp.parent = listRes[i].parent;
						temp.i18ns = listRes[i].names;
						listTmp.push(temp);
					}
					this.locations = listTmp;
				}
				this.locations.forEach(element => {
					for (let i = 0; i < element.i18ns.length; i += 1) {
						const temp = {};
						temp.id = element.id;
						temp.langCode = element.i18ns[i].langCode;
						temp.title = element.i18ns[i].title;
						this.filterLocations.push(temp);
					}
				});
				if (this.searchTemp.length > 0) {
					this.unitAdults.quantities = this.searchTemp[3];
					this.unit.quantities = this.searchTemp[4];
					this.counterChilds = this.searchTemp[5];
					this.selected = this.searchTemp[0];
					this.checkin = this.searchTemp[1];
					this.startDate = this.searchTemp[1];
					this.checkOutdate = this.searchTemp[2];
					this.endDate = this.searchTemp[2];
					this.infoSearch.countAdults = this.unitAdults.quantities;
					this.infoSearch.countChild = this.unit.quantities;
					this.infoSearch.location = this.selected;
					this.infoSearch.fromDate = this.checkin;
					this.infoSearch.toDate = this.checkOutdate;
					this.callApiResultSearch(
						this.selectedamenitiroom,
						this.selectedameniti,
						this.selectedtype,
						this.selectedStar,
						this.selected.id,
					);
				} else {
					this.selected = 0;
					this.checkin = new Date();
					this.checkOutdate = new Date();
					this.startDate = new Date();
					this.endDate = new Date();

					this.unitAdults.quantities = 2;
					this.unit.quantities = 0;
					this.counterChilds = [];
					this.callApiResultSearch(
						this.selectedamenitiroom,
						this.selectedameniti,
						this.selectedtype,
						this.selectedStar,
						0,
					);
				}
			},
			error => {
				console.log('failed', error);
			},
		);

		this.loading = true;
		this.HideDisplay = true;
	},
	methods: {
		currentMoney() {
			return this.$store.getters['user/currentcy'];
		},
		isCurrentMoney(currency) {
			return this.$store.getters['user/getCurrentcy'] === currency;
		},
		changeMoney(code) {
			this.$store.commit(UserMutationTypes.SET_CURRENTCY, code);
			this.rate = code;
			window.location.reload(true);
		},
		strip(html) {
			const tmp = document.createElement('DIV');
			tmp.innerHTML = html;
			return tmp.textContent || tmp.innerText;
		},
		checkmoney() {
			this.currentMoney[0] = +this.currentMoney[0];
			this.currentMoney[1] = +this.currentMoney[1];
		},
		clearAll() {
			this.deleteTickStar();
			this.deleteTickHotelAmeniti();
			this.deleteTickRoomAmeniti();
			this.deleteTickHotelLocation();
			this.deleteTickHotelType();
		},
		deleteTickStar() {
			if (this.selectedStar.length !== 0) {
				this.selectedStar = [];
				this.callApiResultSearch(
					this.selectedameniti,
					this.selectedamenitiroom,
					this.selectedtype,
					this.selectedStar,
				);
			}
		},
		deleteTickHotelAmeniti() {
			if (this.selectedameniti.length !== 0) {
				this.selectedameniti = [];
				this.callApiResultSearch(
					this.selectedameniti,
					this.selectedamenitiroom,
					this.selectedtype,
					this.selectedStar,
				);
			}
		},
		deleteTickRoomAmeniti() {
			if (this.selectedamenitiroom.length !== 0) {
				this.selectedamenitiroom = [];
				this.callApiResultSearch(
					this.selectedameniti,
					this.selectedamenitiroom,
					this.selectedtype,
					this.selectedStar,
				);
			}
		},
		deleteTickHotelLocation() {
			if (this.selectedlocation.length !== 0) {
				this.selectedlocation = [];
				this.callApiResultSearch(
					this.selectedameniti,
					this.selectedamenitiroom,
					this.selectedtype,
					this.selectedStar,
					this.selectedlocation,
				);
			}
		},
		deleteTickHotelType() {
			if (this.selectedtype.length !== 0) {
				this.selectedtype = [];
				this.callApiResultSearch(
					this.selectedameniti,
					this.selectedamenitiroom,
					this.selectedtype,
					this.selectedStar,
					this.selectedlocation,
				);
			}
		},
		deletePriceHotel() {
			if (this.currentMoney.length !== 0) {
				this.currentMoney = [];
				this.callApiResultSearch(this.selectedamenitiroom, this.selectedameniti, this.selectedtype);
			}
		},

		deleteNameHotel() {
			this.inputHotel = '';
			this.callApiResultSearch(this.selectedamenitiroom, this.selectedameniti, this.selectedtype);
		},
		callApichangemonney() {
			this.$gateway.post(`/v1/ta/get-change-rate`).then(
				responsemo => {
					const list = typeof responsemo.data.value !== 'undefined' ? responsemo.data.value : [];
					this.$store.commit(UserMutationTypes.SET_RATE, list);
				},
				error => {
					console.log('failed', error);
				},
			);
		},
		// eslint-disable-next-line consistent-return
		isNumber(evt) {
			evt = evt || window.event;
			const charCode = evt.which ? evt.which : evt.keyCode;
			if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
				evt.preventDefault();
			} else {
				return true;
			}
		},
		showAlert() {
			// Use sweetalret2
			if (this.$store.getters.currentLanguage.code !== 'vi') {
				this.$swal({
					title: '<strong>Result not found !</strong>',
					type: 'warning',
					html: `We could not find the result that matches your search request. Please try again.`,
					showCloseButton: false,
					showCancelButton: true,
					allowOutsideClick: false,
					showConfirmButton: false,
					focusConfirm: false,
					confirmButtonText: 'Home Page',
					confirmButtonAriaLabel: 'Thumbs up, great!',
					cancelButtonText: 'Close',
					cancelButtonAriaLabel: 'Thumbs up, great!',
					cancelButtonColor: '#258fe0',
				}).then(result => {
					if (result.value) {
						this.$router.push('avaiSearch');
					}
				});
			} else {
				this.$swal({
					title: '<strong>Không tìm thấy kết quả !</strong>',
					type: 'warning',
					html: `Chúng tôi không thể tìm thấy kết quả phù hợp với yêu cầu tìm kiếm của bạn. Vui lòng thử tìm lại.`,
					showCloseButton: false,
					showCancelButton: true,
					showConfirmButton: false,
					allowOutsideClick: false,
					focusConfirm: false,
					confirmButtonText: 'Trang chủ',
					confirmButtonAriaLabel: 'Thumbs up, great!',
					cancelButtonText: 'Đóng',
					cancelButtonAriaLabel: 'Thumbs up, great!',
					cancelButtonColor: '#258fe0',
				}).then(result => {
					if (result.value) {
						this.$router.push('avaiSearch');
						// eslint-disable-next-line no-empty
					}
				});
			}
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
						this.$store.commit(SearchTempMutationTypes.SET_TEMP, []);
						this.$store.commit(BuyMutationTypes.SET_TOTAL, 0);
						this.$store.commit(BuyMutationTypes.SET_BOOKINGS, []);
						this.$store.commit(BuyMutationTypes.SET_CURRENT, 'ApplyforAccess');
						this.$store.commit(SearchTempMutationTypes.SET_SEEN, []);
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
						this.$store.commit(SearchTempMutationTypes.SET_TEMP, []);
						this.$store.commit(BuyMutationTypes.SET_TOTAL, 0);
						this.$store.commit(BuyMutationTypes.SET_BOOKINGS, []);
						this.$store.commit(BuyMutationTypes.SET_CURRENT, 'ApplyforAccess');
						this.$store.commit(SearchTempMutationTypes.SET_SEEN, []);
						this.$store.commit(RememberMeMutationTypes.SET_REMEMBER_AGENT, null);
						this.$store.commit(RememberMeMutationTypes.SET_REMEMBERPASSWORD, '');
						this.$store.commit(RememberMeMutationTypes.SET_REMEMBER_USERNAME, '');
						this.$store.commit(BuyMutationTypes.SET_COUPON, '');
						this.$router.push('/login');
					}
				});
			}
		},
		// add_overlay:function(){
		// 	window.addEventListener("load", function(event) {
		// 		document.getElementById('overlay').classList.add('show');
		// 	})
		// },
		onConfirm() {
			//	window.location.reload(true);
			this.errordate = false;
		},
		onCancel() {
			window.location.reload(true);
			this.errordate = false;
		},
		modifySearch() {
			if (this.checkin === null || this.checkOutdate === null) {
				this.errordate = true;
				return;
			}
			this.errordate = false;

			if (this.selected === null) {
				this.errorlocation = true;
				return;
			}
			this.errorlocation = false;

			const now = new Date();
			const a = this.$moment(this.checkin);
			const b = this.$moment(this.checkOutdate);
			const c = this.$moment(this.$store.getters['searchTemp/search'][1]);
			const d = this.$moment(this.$store.getters['searchTemp/search'][2]);
			this.ab1 = a.diff(now, 'days');
			this.cd1 = b.diff(now, 'days');
			this.ab2 = c.diff(now, 'days');
			this.cd2 = d.diff(now, 'days');
			const adult = this.unitAdults.quantities === '' ? 2 : this.unitAdults.quantities;
			const children = this.unit.quantities === '' ? 0 : this.unit.quantities;
			if (
				this.ab1 !== this.ab2 ||
				this.cd1 !== this.cd2 ||
				adult !== this.$store.getters['searchTemp/search'][3] ||
				children !== this.$store.getters['searchTemp/search'][4] ||
				this.selected.id !== this.$store.getters['searchTemp/search'][0].id
			) {
				this.$store.commit(BuyMutationTypes.SET_TOTAL, 0);
				this.$store.commit(BuyMutationTypes.SET_BOOKINGS, []);
			}

			if (
				this.errordate === false &&
				this.errorlocation === false &&
				this.checkin !== null &&
				this.checkOutdate !== null &&
				this.selected !== null
			) {
				this.temp = [this.selected, this.checkin, this.checkOutdate, adult, children, this.counterChilds];
				// save search
				this.$store.commit(SearchTempMutationTypes.SET_TEMP, this.temp);
				window.location.reload(true);
				this.callApiResultSearch(
					this.selectedameniti,
					this.selectedamenitiroom,
					this.selectedtype,
					this.selectedStar,
				);
			}
		},
		filterByHotel() {
			this.name = this.inputHotel;
			this.callApiResultSearch(this.selectedamenitiroom, this.selectedameniti, this.selectedtype);
		},
		arraysEqual(a, b) {
			if (Array.isArray(a) && Array.isArray(b)) {
				for (
					let i = 0;
					i < a.length;
					i += 1 // assert each element equal
				)
					// eslint-disable-next-line no-undef
					if (!arraysEqual(a[i], b[i])) return false;
				return true;
			}
			return true; // if not both arrays, should be the same
		},
		callApiResultSearch(aHotel, aRoom, type, star, location, monney) {
			console.log('monney',monney);
			if (
				aHotel.length === 0 &&
				aRoom.length === 0 &&
				type.length === 0 &&
				// location === 0 &&
				(typeof star === 'undefined' || star === null || star.length === 0)
			) {
				this.clearAllFilter = 0;
				this.clearHotelAmenitiFilter = 0;
				this.clearRoomAmenitiFilter = 0;
				this.clearStarFilter = 0;
				this.clearHotelTypeFilter = 0;
				// this.clearHotelLocationFilter =0;
			} else {
				if (aHotel.length > 0) {
					this.clearHotelAmenitiFilter = 1;
				} else {
					this.clearHotelAmenitiFilter = 0;
				}
				if (aRoom.length > 0) {
					this.clearRoomAmenitiFilter = 1;
				} else {
					this.clearRoomAmenitiFilter = 0;
				}
				// if (location.length > 0) {
				// 	this.clearHotelLocationFilter = 1;
				// } else {
				// 	this.clearHotelLocationFilter = 0;
				// }
				if (type.length > 0) {
					this.clearHotelTypeFilter = 1;
				} else {
					this.clearHotelTypeFilter = 0;
				}
				if (typeof star === 'undefined' || star === null || star.length === 0) {
					this.clearStarFilter = 0;
				} else {
					this.clearStarFilter = 1;
				}
				this.clearAllFilter = 1;
			}
			const pricePush = monney == null ? this.valueMoney : monney;
			this.$store.commit(BuyMutationTypes.SET_PRICE, pricePush);
			const now = new Date();
			this.infoSearch.countAdults = this.unitAdults.quantities;
			this.infoSearch.countChild = this.unit.quantities;
			this.infoSearch.location = location;
			this.infoSearch.fromDate = this.$store.getters['searchTemp/search'][1];
			this.infoSearch.toDate = this.$store.getters['searchTemp/search'][2];
			const n = [];
			const startdate = new Date(this.$store.getters['searchTemp/search'][1]);
			const endDate = new Date(this.$store.getters['searchTemp/search'][2]);
			const curDate = startdate;
			while (curDate <= endDate.setDate(endDate.getDate() - 1)) {
				const dayOfWeek = curDate.getDay();
				this.m.push(dayOfWeek);
				curDate.setDate(curDate.getDate() + 1);
			}
			for (let i = 0; i < this.m.length; i++) {
				if (this.m[i] === 1) {
					this.t2 = 1;
				}
				if (this.m[i] === 2) {
					this.t3 = 1;
				}
				if (this.m[i] === 3) {
					this.t4 = 1;
				}
				if (this.m[i] === 4) {
					this.t5 = 1;
				}
				if (this.m[i] === 5) {
					this.t6 = 1;
				}
				if (this.m[i] === 6) {
					this.t7 = 1;
				}
				if (this.m[i] === 0) {
					this.cn = 1;
				}
			}
			if (Array.isArray(monney) && monney[0] === 0 && monney[1] === 0) {
				monney.splice(0, 2);
			}
			// console.log('ngày',this.m);
			this.$gateway
				.post(`/v1/ta/searchHotel`, {
					agentId: +this.agentId,
					checkinDate: this.$moment(this.$store.getters['searchTemp/search'][1]).format('YYYY-MM-DD'),
					checkoutDate:
						this.$store.getters['searchTemp/search'][2] === null
							? this.$moment(now.setDate(now.getDate() + 1)).format('YYYY-MM-DD')
							: this.$moment(this.$store.getters['searchTemp/search'][2]).format('YYYY-MM-DD'),
					adults: this.unitAdults.quantities,
					children: this.unit.quantities,
					childrenAges: this.counterChilds,
					name: this.name,
					locations:
						// eslint-disable-next-line no-nested-ternary
						typeof location === 'undefined'
							? [this.searchTemp[0].id, ...this.selectedlocation]
							: typeof location === 'number' ? [location] : [this.searchTemp[0].id, ...location],
					// prices: monney[0] === 0 && monney[1] === 0 ? [] : monney,
					prices: monney === [0, 0] ? [] : monney,
					stars: star,
					amenities: [...aHotel, ...aRoom],
					types: type,
					langCode: this.$store.getters.currentLanguage.code,
					currency: this.$store.getters['user/getCurrentcy'],
				})
				.then(
					response => {
						this.loading = true;
						this.HideDisplay = true;
						if (response.data.responseCode === 0) {
							const listRes =
								typeof response.data.value !== 'undefined' && Array.isArray(response.data.value)
									? response.data.value
									: [];
							const listTmp = [];
							if (listRes.length > 0) {
								for (let i = 0; i < listRes.length; i += 1) {
									const temp = {};
									temp.id = listRes[i].id;
									temp.image = listRes[i].image;
									temp.rankStar = listRes[i].rankStar;
									temp.price = listRes[i].price;
									temp.quantity = listRes[i].quantity;
									temp.location = listRes[i].location;
									temp.names = listRes[i].names;
									temp.address = listRes[i].address;
									temp.descriptions = listRes[i].descriptions;
									temp.paymentPolicies = listRes[i].paymentPolicies;
									temp.amenities = listRes[i].amenityGroups;
									temp.typeAmenities = listRes[i].type;
									temp.roomAmenities = listRes[i].rooms;
									temp.build = listRes[i].build;
									temp.floor = listRes[i].floor;
									temp.room = listRes[i].room;
									temp.airportDistance = listRes[i].airportDistance;
									temp.airportTime = listRes[i].airportTime;
									temp.centerDistance = listRes[i].centerDistance;
									temp.electric = listRes[i].electric;
									temp.currency = listRes[i].currency;
									temp.currencySymbol = listRes[i].currencySymbol;
									temp.locationId = listRes[i].locationId;
									temp.imgs = listRes[i].imgs;
									temp.thumbs = listRes[i].thumbs;
									temp.marks = listRes[i].marks;
									temp.childrenPolicy = listRes[i].childrenPolicy;
									temp.cancellationPolicies = listRes[i].cancellationPolicies;
									temp.countRoom = 0;
									for (let j = 0; j < temp.roomAmenities.length; j++) {
										temp.countRoom += temp.roomAmenities[j].roomQuantity;
									}
									temp.listPrice = [];
									temp.minPrice = listRes[i].rooms[0].defaultPrice;
									temp.minPrice1 = 0;
									// xet weekend
									if (listRes[i].weekend !== null) {
										temp.weekend = listRes[i].weekend;
										temp.weekendD = temp.weekend.split(',');
										temp.lstWeekend = [];
										if (temp.weekendD.length > 0) {
											for (let d = 0; d < temp.weekendD.length; d++) {
												if (temp.weekendD[d] === 'MON') {
													temp.lstWeekend.push(1);
												}
												if (temp.weekendD[d] === 'TUE') {
													temp.lstWeekend.push(2);
												}
												if (temp.weekendD[d] === 'WED') {
													temp.lstWeekend.push(3);
												}
												if (temp.weekendD[d] === 'THU') {
													temp.lstWeekend.push(4);
												}
												if (temp.weekendD[d] === 'FRI') {
													temp.lstWeekend.push(5);
												}
												if (temp.weekendD[d] === 'SAT') {
													temp.lstWeekend.push(6);
												}
												if (temp.weekendD[d] === 'SUN') {
													temp.lstWeekend.push(0);
												}
											}
											for (let w = 0; w < temp.lstWeekend.length; w++) {
												if (temp.lstWeekend[w] === 1) {
													temp.weekend2 = 1;
												}
												if (temp.lstWeekend[w] === 2) {
													temp.weekend3 = 1;
												}
												if (temp.lstWeekend[w] === 3) {
													temp.weekend4 = 1;
												}
												if (temp.lstWeekend[w] === 4) {
													temp.weekend5 = 1;
												}
												if (temp.lstWeekend[w] === 5) {
													temp.weekend6 = 1;
												}
												if (temp.lstWeekend[w] === 6) {
													temp.weekend7 = 1;
												}
												if (temp.lstWeekend[w] === 0) {
													temp.weekendcn = 1;
												}
											}
										}
										if (
											(temp.weekendcn === 1 && this.cn === 1) ||
											(temp.weekend2 === 1 && this.t2 === 1) ||
											(temp.weekend3 === 1 && this.t3 === 1) ||
											(temp.weekend4 === 1 && this.t4 === 1) ||
											(temp.weekend5 === 1 && this.t5 === 1) ||
											(temp.weekend6 === 1 && this.t6 === 1) ||
											(temp.weekend7 === 1 && this.t7 === 1)
										) {
											temp.set = 1;
										} else {
											temp.set = 0;
										}
									} else {
										temp.set = 0;
									}
									for (let j = 0; j < this.$store.getters['user/rate'].length; j++) {
										if (
											this.$store.getters['user/rate'][j].fromCode === temp.currency &&
											this.$store.getters['user/getCurrentcy'] ===
												this.$store.getters['user/rate'][j].toCode
										) {
											temp.rate = this.$store.getters['user/rate'][j].rate;
											break;
										}
									}
									temp.maxPricehotel = listRes[i].rooms[0].defaultPrice * temp.rate;
									temp.inHour = listRes[i].inHour;
									temp.outHour = listRes[i].outHour;
									listTmp.push(temp);
									// console.log('money', listTmp);
								}
								this.loading = false;
							} else {
								this.loading = false;
								this.HideDisplay = false;
								this.showResultSearch = true;
								this.showAccessHotel = false;
								this.showAlert();
							}
							this.items = [];
							this.items = listTmp;
							if (location) {
								// eslint-disable-next-line no-empty
								if (location.length === 0) {
								} else {
									const listResFn = [];
									if (location.length > 0) {
										location.forEach(e => {
											let listResNew = [];
											listResNew = this.items.filter(item => item.locationId === e);
											listResNew.forEach(f => {
												listResFn.push(f);
											});
										});
										this.items.length = 0;
										listResFn.forEach(d => {
											this.items.push(d);
										});
									}
								}
							}
							for (let i = 0; i < this.items.length; i++) {
								this.items[i].listPrice = [];
								for (let j = 0; j < this.items[i].roomAmenities.length; j++) {
									// this.items[i].countRoom += this.items[i].roomAmenities[j].roomQuantity;
									const tmp = {};
									if (this.items[i].set === 1) {
										if (
											this.items[i].roomAmenities[j].defaultPrice <
											this.items[i].roomAmenities[j].weekendPrice
										) {
											tmp.Price = this.items[i].roomAmenities[j].defaultPrice;
										} else tmp.Price = this.items[i].roomAmenities[j].weekendPrice;
									} else {
										tmp.Price = this.items[i].roomAmenities[j].defaultPrice;
									}
									// tmp.Price = this.items[i].roomAmenities[j].defaultPrice;
									this.items[i].listPrice.push(tmp);
								}
								for (let k = 0; k < this.items[i].listPrice.length; k++) {
									if (this.items[i].minPrice >= this.items[i].listPrice[k].Price) {
										this.items[i].minPrice = this.items[i].listPrice[k].Price;
									}
									if (
										this.items[i].maxPricehotel <=
										this.items[i].listPrice[k].Price * this.items[i].rate
									) {
										this.items[i].maxPricehotel =
											this.items[i].listPrice[k].Price * this.items[i].rate;
									}
								}
								for (let m = 0; m < this.$store.getters['user/rate'].length; m++) {
									if (
										this.$store.getters['user/rate'][m].fromCode === this.items[i].currency &&
										this.$store.getters['user/rate'][m].toCode ===
											this.$store.getters['user/getCurrentcy']
									) {
										this.items[i].minPrice1 =
											this.items[i].minPrice * this.$store.getters['user/rate'][m].rate;
									}
								}
								for (let k = 0; k < this.items.length; k++) {
									if (this.items[i].maxPricehotel >= this.maxPrice) {
										this.maxPrice = this.items[i].maxPricehotel;
									}
								}
							}
							return this.$gateway.post(`/v1/ta/getHotelAmenity`);
						} else if (response.data.responseCode === 3) {
							this.loading = false;
							this.HideDisplay = false;
							this.showResultSearch = false;
							this.showAccessHotel = true;
						} else {
							this.loading = false;
							this.HideDisplay = false;
							this.showResultSearch = true;
							this.showAccessHotel = false;
							this.showAlert();
						}
					},
					error => {
						if (error.status === 403) {
							this.showAlertLogout();
						}
					},
				)
				// call api Hotel amenities
				.then(
					response => {
						const listRes =
							typeof response.data.amenities !== 'undefined' && Array.isArray(response.data.amenities)
								? response.data.amenities
								: [];
						const listTmp = [];
						if (listRes.length > 0) {
							for (let i = 0; i < listRes.length; i += 1) {
								const temp = {};
								temp.id = listRes[i].id;
								temp.i18ns = listRes[i].names;
								listTmp.push(temp);
							}
						}
						this.hotelAmenities = listTmp;
						return this.$gateway.post(`/v1/ta/getLocation`);
					},
					error => {
						console.log('failed', error);
					},
				)
				// call api Location
				.then(
					response => {
						const listRes =
							typeof response.data.locations !== 'undefined' && Array.isArray(response.data.locations)
								? response.data.locations
								: [];
						const listTmp = [];
						if (listRes.length > 0) {
							for (let i = 0; i < listRes.length; i += 1) {
								// match data
								const temp = {};
								temp.id = listRes[i].id;
								temp.locType = listRes[i].locType;
								temp.parent = listRes[i].parent;
								temp.i18ns = listRes[i].names;
								listTmp.push(temp);
							}
							this.locations = listTmp;
						}
						this.locations.forEach(element => {
							const temp = {};
							temp.id = element.id;
							for (let i = 0; i < element.i18ns.length; i += 1) {
								if (element.i18ns[i].langCode === this.$store.getters.currentLanguage.code) {
									temp.langCode = element.i18ns[i].langCode;
									temp.title = element.i18ns[i].title;
								}
							}
						});
						this.filterLocationsLang = this.filterLocations.filter(
							loc => loc.langCode === this.$store.getters.currentLanguage.code,
						);
						this.hotelLocations = this.filterLocations.filter(loc => loc.id === 3);
						return this.$gateway.post(`/v1/ta/getRoomAmenity`);
					},
					error => {
						console.log('failed', error);
					},
				)
				// call api Room amenities
				.then(
					response => {
						const listRes =
							typeof response.data.amenities !== 'undefined' && Array.isArray(response.data.amenities)
								? response.data.amenities
								: [];
						const listTmp = [];
						if (listRes.length > 0) {
							for (let i = 0; i < listRes.length; i += 1) {
								// match data
								const temp = {};
								temp.id = listRes[i].id;
								temp.icon = listRes[i].icon;
								temp.i18ns = listRes[i].names;
								listTmp.push(temp);
							}
							this.roomAmenities = listTmp;
						}
						return this.$gateway.post(`/v1/ta/getHotelType`);
					},
					error => {
						console.log('failed', error);
					},
				)
				// call api get Hotel Type
				.then(
					response => {
						const listRes1 =
							typeof response.data.types !== 'undefined' && Array.isArray(response.data.types)
								? response.data.types
								: [];
						const listTmp = [];
						if (listRes1.length > 0) {
							for (let i = 0; i < listRes1.length; i += 1) {
								// match data
								const temp = {};
								temp.id = listRes1[i].id;
								temp.i18ns = listRes1[i].i18ns;
								listTmp.push(temp);
							}
							this.typeAmenities = listTmp;
						}
						this.countHotelAmenities();
						this.countTypeAmenities();
						this.countStar();
						this.countRoomsAmenities();
						this.countHotelLocation();
					},
					error => {
						console.log('failed', error);
					},
				);
		},
		countHotelAmenities() {
			// count Hotel amenities -- tuanphansy
			this.filterAmenities = [];
			this.items.forEach(element => {
				for (let i = 0; i < element.amenities.length; i += 1) {
					this.filterAmenities.push(element.amenities[i]);
				}
			});
			this.filterAmenities1 = [];
			this.filterAmenities.forEach(element => {
				for (let i = 0; i < element.amenities.length; i += 1) {
					this.filterAmenities1.push(element.amenities[i]);
				}
			});
			this.listAmenities = [];
			for (let i = 0; i < this.filterAmenities1.length; i += 1) {
				this.listAmenities.push(this.filterAmenities1[i].id);
			}
			this.listAmenities.sort((a, b) => a - b);
			const arrayAmenities = [];
			let current = null;
			let cnt = 0;
			for (let i = 0; i < this.listAmenities.length; i += 1) {
				if (this.listAmenities[i] !== current) {
					if (cnt > 0) {
						for (let j = 0; j < this.hotelAmenities.length; j += 1) {
							if (current === this.hotelAmenities[j].id) {
								const temp = {};
								temp.id = this.hotelAmenities[j].id;
								temp.i18ns = this.hotelAmenities[j].i18ns;
								temp.count = cnt;
								arrayAmenities.push(temp);
							}
							this.countAmenities = arrayAmenities;
						}
					}
					current = this.listAmenities[i];
					cnt = 1;
				} else {
					cnt += 1;
				}
			}
			if (cnt > 0) {
				for (let j = 0; j < this.hotelAmenities.length; j += 1) {
					if (current === this.hotelAmenities[j].id) {
						const temp = {};
						temp.id = this.hotelAmenities[j].id;
						temp.i18ns = this.hotelAmenities[j].i18ns;
						temp.count = cnt;
						arrayAmenities.push(temp);
					}
				}
				this.countAmenities = arrayAmenities;
			}
		},
		countRoomsAmenities() {
			// count Room Amenities
			this.push2 = [];
			this.items.forEach(element => {
				for (let i = 0; i < element.roomAmenities.length; i += 1) {
					this.push2.push(element.roomAmenities[i]);
				}
			});
			console.log('tienichphong', this.push2);
			this.filterRoomAmenities = [];
			this.push2.forEach(element => {
				for (let i = 0; i < element.amenityGroups.length; i += 1) {
					this.filterRoomAmenities.push(element.amenityGroups[i]);
				}
			});
			this.filterRoomAmenities1 = [];
			this.filterRoomAmenities.forEach(element => {
				for (let i = 0; i < element.amenities.length; i += 1) {
					this.filterRoomAmenities1.push(element.amenities[i]);
				}
			});
			this.listRoomAmenities = [];
			for (let i = 0; i < this.filterRoomAmenities1.length; i += 1) {
				this.listRoomAmenities.push(this.filterRoomAmenities1[i].id);
			}
			this.listRoomAmenities.sort((a, b) => a - b);
			const arrayRoomAmenities = [];
			let currentRoom = null;
			let cntRoom = 0;
			for (let i = 0; i < this.listRoomAmenities.length; i += 1) {
				if (this.listRoomAmenities[i] !== currentRoom) {
					if (cntRoom > 0) {
						for (let j = 0; j < this.roomAmenities.length; j += 1) {
							if (currentRoom === this.roomAmenities[j].id) {
								const temp = {};
								temp.id = this.roomAmenities[j].id;
								temp.icon = this.roomAmenities[j].icon;
								temp.i18ns = this.roomAmenities[j].i18ns;
								temp.count = cntRoom;
								arrayRoomAmenities.push(temp);
							}
							this.countRoomAmenities = arrayRoomAmenities;
						}
					}
					currentRoom = this.listRoomAmenities[i];
					cntRoom = 1;
				} else {
					cntRoom += 1;
				}
			}
			if (cntRoom > 0) {
				for (let j = 0; j < this.roomAmenities.length; j += 1) {
					if (currentRoom === this.roomAmenities[j].id) {
						const temp = {};
						temp.id = this.roomAmenities[j].id;
						temp.icon = this.roomAmenities[j].icon;
						temp.i18ns = this.roomAmenities[j].i18ns;
						temp.count = cntRoom;
						arrayRoomAmenities.push(temp);
					}
				}
				this.countRoomAmenities = arrayRoomAmenities;
			}
		},
		countTypeAmenities() {
			// count hotel type
			this.filterTypeHotel = [];
			this.items.forEach(element => {
				this.filterTypeHotel.push(element.typeAmenities);
			});
			this.listTypeHotel = [];
			for (let i = 0; i < this.filterTypeHotel.length; i += 1) {
				this.listTypeHotel.push(this.filterTypeHotel[i].id);
			}
			this.listTypeHotel.sort((a, b) => a - b);

			const arrayTypeHotel = [];
			let currentTypeHotel = null;
			let cntTypeHotel = 0;
			for (let i = 0; i < this.listTypeHotel.length; i += 1) {
				if (this.listTypeHotel[i] !== currentTypeHotel) {
					if (cntTypeHotel > 0) {
						for (let j = 0; j < this.typeAmenities.length; j += 1) {
							if (currentTypeHotel === this.typeAmenities[j].id) {
								const temp = {};
								temp.id = this.typeAmenities[j].id;
								temp.i18ns = this.typeAmenities[j].i18ns;
								temp.count = cntTypeHotel;
								arrayTypeHotel.push(temp);
							}
							this.countTypeHotel = arrayTypeHotel;
						}
					}
					currentTypeHotel = this.listTypeHotel[i];
					cntTypeHotel = 1;
				} else {
					cntTypeHotel += 1;
				}
			}
			if (cntTypeHotel > 0) {
				for (let j = 0; j < this.typeAmenities.length; j += 1) {
					if (currentTypeHotel === this.typeAmenities[j].id) {
						const temp = {};
						temp.id = this.typeAmenities[j].id;
						temp.i18ns = this.typeAmenities[j].i18ns;
						temp.count = cntTypeHotel;
						arrayTypeHotel.push(temp);
					}
				}
				this.countTypeHotel = arrayTypeHotel;
			}
		},
		countStar() {
			// count star
			this.countStar0 = this.items.filter(loc => loc.rankStar === 0);
			this.countStar1 = this.items.filter(loc => loc.rankStar === 1);
			this.countStar2 = this.items.filter(loc => loc.rankStar === 2);
			this.countStar3 = this.items.filter(loc => loc.rankStar === 3);
			this.countStar4 = this.items.filter(loc => loc.rankStar === 4);
			this.countStar5 = this.items.filter(loc => loc.rankStar === 5);
			this.countStar0half = this.items.filter(loc => loc.rankStar === 0.5);
			this.countStar1half = this.items.filter(loc => loc.rankStar === 1.5);
			this.countStar2half = this.items.filter(loc => loc.rankStar === 2.5);
			this.countStar3half = this.items.filter(loc => loc.rankStar === 3.5);
			this.countStar4half = this.items.filter(loc => loc.rankStar === 4.5);
			this.countStar5half = this.items.filter(loc => loc.rankStar === 5.5);
		},
		countHotelLocation() {
			// count hotel location
			this.filterHotelLocations = [];
			this.items.forEach(element => {
				this.filterHotelLocations.push(element.locationId);
			});
			console.log('locations', this.push);
			this.filterHotelLocations.sort((a, b) => a - b);
			const arrayHotelLocations = [];
			let currentHotelLocations = null;
			let cntHotelLocations = 0;
			for (let i = 0; i < this.filterHotelLocations.length; i += 1) {
				if (this.filterHotelLocations[i] !== currentHotelLocations) {
					if (currentHotelLocations > 0) {
						for (let j = 0; j < this.filterLocations.length; j += 1) {
							if (currentHotelLocations === this.filterLocations[j].id) {
								const temp = {};
								temp.id = this.filterLocations[j].id;
								temp.title = this.filterLocations[j].title;
								temp.langCode = this.filterLocations[j].langCode;
								temp.count = cntHotelLocations;
								arrayHotelLocations.push(temp);
							}
						}
						this.countHotelLocations = arrayHotelLocations;
					}
					currentHotelLocations = this.filterHotelLocations[i];
					cntHotelLocations = 1;
				} else {
					cntHotelLocations += 1;
				}
			}
			if (cntHotelLocations > 0) {
				for (let j = 0; j < this.filterLocations.length; j += 1) {
					if (currentHotelLocations === this.filterLocations[j].id) {
						const temp = {};
						temp.id = this.filterLocations[j].id;
						temp.title = this.filterLocations[j].title;
						temp.langCode = this.filterLocations[j].langCode;
						temp.count = cntHotelLocations;
						arrayHotelLocations.push(temp);
					}
					this.countHotelLocations = arrayHotelLocations;
				}
			}
		},
		confirm() {
			this.$root.$emit('bv::toggle::collapse', 'collapse1');
		},
		deleteShop(index, item) {
			let total = '0';
			this.$store.commit(BuyMutationTypes.SET_BOOKINGS, index);
			this.shopping = this.$store.getters['buy/bookings'];
			this.test = this.$store.getters['buy/total'];
			if (this.shopping.length === 0) {
				total = '0';
			} else {
				total = +this.test - +item.price * +item.quantities;
			}

			this.$store.commit(BuyMutationTypes.SET_TOTAL, total);
			this.totalShop = this.$store.getters['buy/total'];
		},
		hideModal() {
			this.$root.$emit('bv::hide::modal', 'select');
		},
		hideModalinfo(e) {
			this.$root.$emit('bv::hide::modal', e);
		},
		resetModal() {
			this.modalMap.center = {
				lat: 1,
				lng: 2,
			};
			this.modalMap.zoom = 1;
			this.modalMap.name = '';
			this.markers = [];
		},
		showModalinfo(row) {
			this.modalinfo = {};
			this.modalinfo = row;
			this.modalinfo.type = row.typeAmenities.i18ns ? row.typeAmenities.i18ns : [];
			this.baged = row.childrenPolicy.baged;
			this.caged = row.childrenPolicy.caged;
			this.modalMap.center = row.location;
			this.modalMap.zoom = 12;
			this.modalMap.name = row.names;
			this.markers.push({
				position: row.location,
			});
			this.$root.$emit('bv::show::modal', 'modalinfo');
		},
		clickHomePage() {
			this.$router.push('avaiSearch');
		},
		clickModify() {
			this.$root.$emit('bv::show::modal', 'modalModifySearch');
		},
		// select hotel and push to page Detail Search
		select(item) {
			this.shopping = this.$store.getters['buy/bookings'];
			// filter similar & seen
			const similar = this.items;
			// .filter((e, index, items) => e.rankStar === item.rankStar)
			// .filter((e, index) => index < 10);
			// similar
			this.$store.commit(SearchTempMutationTypes.SET_SIMILAR, similar);
			// seen
			let tempSeen = [];
			tempSeen = this.$store.getters['searchTemp/seen'];
			if (tempSeen.length === 0) {
				tempSeen.push(item);
			}
			for (let i = 0; i < tempSeen.length; i += 1) {
				if (tempSeen[i].id === item.id) {
					this.ktra = 1;
					tempSeen.splice(i, 1, item);
					break;
				}
			}
			if (this.ktra !== 1) {
				tempSeen.push(item);
			}
			this.$store.commit(SearchTempMutationTypes.SET_SEEN, tempSeen);
			if (this.shopping[0] == null) {
				const rsSearchPass = {
					idHotel: item.id,
					checkIndate: this.$store.getters['searchTemp/search'][1],
					checkOutdate: this.$store.getters['searchTemp/search'][2],
					adults: this.unitAdults,
					children: this.unit.quantities,
				};
				const temp = [
					this.selected,
					this.$store.getters['searchTemp/search'][1],
					this.$store.getters['searchTemp/search'][2],
					this.$store.getters['searchTemp/search'][3],
					this.$store.getters['searchTemp/search'][4],
					this.$store.getters['searchTemp/search'][5],
					item.id,
					'',
				];
				this.$store.commit(SearchTempMutationTypes.SET_TEMP, temp);
				this.$router.push({
					name: 'Detail Search - B2B Platform',
					params: {
						dataPass: rsSearchPass,
					},
				});
			} else if (item.id !== this.shopping[0].idHotel) {
				this.hotelidmodal.id = item.id;
				this.$root.$emit('bv::show::modal', 'select');
			} else {
				const rsSearchPass = {
					idHotel: item.id,
					checkIndate: this.$store.getters['searchTemp/search'][1],
					checkOutdate: this.$store.getters['searchTemp/search'][2],
					adults: this.unitAdults,
					children: this.counterChilds,
				};
				const temp = [
					this.selected,
					this.$store.getters['searchTemp/search'][1],
					this.$store.getters['searchTemp/search'][2],
					this.$store.getters['searchTemp/search'][3],
					this.$store.getters['searchTemp/search'][4],
					this.$store.getters['searchTemp/search'][5],
					item.id,
					'',
				];
				this.$store.commit(SearchTempMutationTypes.SET_TEMP, temp);
				this.$router.push({
					name: 'Detail Search - B2B Platform',
					params: {
						dataPass: rsSearchPass,
					},
				});
				// push pata localstore
				this.$store.commit(BuyMutationTypes.SET_HOTEL, {
					// eslint-disable-next-line no-undef
					idhotel: idHotel,
				});
			}
		},
		ok(id) {
			this.shopping = this.$store.getters['buy/bookings'];
			this.$store.commit(BuyMutationTypes.SET_TOTAL, 0);
			this.shopping = [];
			this.$store.commit(BuyMutationTypes.SET_BOOKINGS, []);
			this.totalShop = this.$store.getters['buy/total'];
			const temp = [
				this.selected,
				this.$store.getters['searchTemp/search'][1],
				this.$store.getters['searchTemp/search'][2],
				this.$store.getters['searchTemp/search'][3],
				this.$store.getters['searchTemp/search'][4],
				this.$store.getters['searchTemp/search'][5],
				id.id,
				'',
			];
			this.$store.commit(SearchTempMutationTypes.SET_TEMP, temp);
			this.$router.push({
				name: 'Detail Search - B2B Platform',
			});
			this.$store.commit(BuyMutationTypes.SET_HOTEL, {
				id,
			});
		},
		// format price
		formatPrice(value) {
			if (this.$store.getters['user/getCurrentcy'] === 'VND') {
				const val = (value / 1).toFixed(0).replace('.', '.');
				return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}
			const val = (value / 1).toFixed(2).replace('.', '.');
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
		diffAdult() {
			if (this.unitAdults.quantities <= 1) {
				this.unitAdults.quantities = 1;
				// eslint-disable-next-line no-plusplus
			} else this.unitAdults.quantities--;
		},
		addAdult() {
			if (this.unitAdults.quantities >= 999) {
				this.unitAdults.quantities = 999;
			} else {
				// eslint-disable-next-line no-plusplus
				this.unitAdults.quantities++;
			}
		},
		// count units children
		diffUnits() {
			if (this.unit.quantities <= 0) {
				this.unit.quantities = 0;
			} else {
				// eslint-disable-next-line no-plusplus
				this.unit.quantities--;
				this.counterChilds.splice(this.counterChilds, 1);
			}
		},
		addUnits() {
			if (this.unit.quantities > 99) {
				this.unit.quantities = 99;
			} else {
				// eslint-disable-next-line no-plusplus
				this.unit.quantities++;
			}
			this.counterChilds.push(0);
		},
		diffUnitsChild(index) {
			if (this.counterChilds[index] <= 0) {
				this.counterChilds[index] = 0;
			} else {
				const temp = this.counterChilds[index] - 1;
				this.counterChilds.splice(index, 1, temp);
			}
		},
		addUnitsChild(index) {
			if (this.counterChilds[index] >= 12) {
				this.counterChilds[index] = 12;
			} else {
				const temp = this.counterChilds[index] + 1;
				this.counterChilds.splice(index, 1, temp);
			}
		},
		// start modal Map
		modalMap(center, zoom) {
			this.modalMap.center = center;
			this.modalMap.zoom = zoom;
			this.$refs.modalMap.show();
		},
		hideModal() {
			this.$root.$emit('bv::hide::modal', 'modalInfo');
		},
		info(item, button) {
			this.modalMap.center = item.location;
			this.modalMap.zoom = 12;
			this.modalMap.name = item.names;
			this.markers.push({
				position: item.location,
			});
			this.$root.$emit('bv::show::modal', 'modalMap');
			console.log('ok');
		},
		// end modal Map
		onFiltered(filteredItems) {
			// Trigger pagination to update the number of buttons/pages due to filtering
			this.totalRows = filteredItems.length;
			this.currentPage = 1;
		},
		// sort list result Search
		// eslint-disable-next-line consistent-return
		sortedArray(e) {
			if (e === 'rankStarDesc') {
				// eslint-disable-next-line no-inner-declarations
				function compare(a, b) {
					if (a.rankStar < b.rankStar) return -1;
					if (a.rankStar > b.rankStar) return 1;
					return 0;
				}
				return this.items.sort(compare);
			} else if (e === 'rankStarAsc') {
				// eslint-disable-next-line no-inner-declarations
				function compare(a, b) {
					if (a.rankStar > b.rankStar) return -1;
					if (a.rankStar < b.rankStar) return 1;
					return 0;
				}
				return this.items.sort(compare);
			} else if (e === 'pricedesc') {
				// eslint-disable-next-line no-inner-declarations
				function compare(a, b) {
					if (a.minPrice1 < b.minPrice1) return -1;
					if (a.minPrice1 > b.minPrice1) return 1;
					return 0;
				}
				return this.items.sort(compare);
			} else if (e === 'priceasc') {
				// eslint-disable-next-line no-inner-declarations
				function compare(a, b) {
					if (a.minPrice1 > b.minPrice1) return -1;
					if (a.minPrice1 < b.minPrice1) return 1;
					return 0;
				}
				return this.items.sort(compare);
				// eslint-disable-next-line no-empty
			} else if (e === 'none') {
			}
		},
	},
};
