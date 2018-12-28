import vueSlider from 'vue-slider-component';
import HotelDatePicker from 'vue-hotel-datepicker';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { BuyMutationTypes } from 'store/module/buy';
import axios from 'axios';
import Multiselect from 'vue-multiselect';
import { SearchTempMutationTypes } from 'store/module/searchTemp';
import getRouter from 'router';
import VueSweetalert2 from 'vue-sweetalert2';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VeeValidate from 'vee-validate';
import { RememberMeMutationTypes } from 'store/module/rememberMe';
import { UserMutationTypes } from 'store/module/user';

Vue.use(Vuelidate);
Vue.use(VeeValidate);
// import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css'; // This line here
// import swal from 'sweetalert2';
// const swal = require('sweetalert2');
const items = [];

const hotelMap = {
	hotelId: '1',
	name: 'sapa',
	location: {
		lat: 21.0227788,
		lng: 105.8194541,
	},
};

export default {
	name: 'DetailSearch',
	props: {
		dataPass: {
			default: null,
		},
		databook: {
			default: {},
		},
	},

	data() {
		return {
			hotelidmodal: {
				id: 0,
			},
			dismissSecs: 3,
			dismissCountDown: 0,
			errodismissCountDown: 0,
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
			collapse2: false,
			collapse3: false,
			agentId: 0,
			shoppingCart: {
				position: 'top-right',
				bgColor: '#0070C0',
				icon: 'shopping-cart',
			},
			plans: [],
			rooms: [],
			thumb: [],
			imgs: [],
			apihotelname: [],
			apihoteladdress: [],
			filterLocations: [],
			hotelMap,
			modalMap: {
				hotelID: '',
				zoom: 12,
				name: '',
				location: {
					lat: 0,
					lng: 0,
				},
			},
			swiperOption: {
				slidesPerView: 3,
				spaceBetween: 20,
				freeMode: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
			},
			dataPass: {},
			databook: {},
			itemModal: {},
			test: '',
			date: '',
			buy: {
				idHotel: 0,
				idRoom: 0,
				nameHotel: '',
				nameRoom: '',
				quantities: 0,
				price: 0,
				promotion: 0,
				promotionTitle: null,
				address: '',
				rankStar: 0,
				idplant: 0,
				checkindatebook: '',
				checkoutdatebook: '',
				adult: 0,
				children: 0,
				nameplant: [],
				currency: '',
				maxAdultsRoom: 0,
				maxGuests: 0,
				maxGuestsPlant: 0,
				exadulttype: 0,
				exchiltype: 0,
				exAdult: 0,
				exChil: 0,
				paymentPolicies: [],
				serviceTaxPercent: 0,
				valueAddedTaxPercent: 0,
				desscription: '',
				paymentPolicy: '',
				cancelPolicy: '',
				childrenPolicy: {},
				disable: 10000000000001,
				sumslroom: 0,
				inHour: '',
				outHour: '',
				priceone: 0,
				taxIncluded: false,
				prommotionPrice: 0,
				priceUnitOne: 0,
				childrenPermitted: null,
			},
			similarHotel: [],
			shopping: [],
			totalShop: 0,
			msg:
				'<h4>Checkin Policy</h4><p>- Checkin Time: 14:00</p><p>- Checkout Time: 12:00</p>Distances shown are straight-line distances on the map. Actual travel distances may vary.',
			active: true,
			activeTab: 0,
			showBooks: false,
			swiperOptionTop: {
				spaceBetween: 10,
				loop: true,
				autoplay: {
					delay: 2500,
					disableOnInteraction: false,
				},
				loopedSlides: 5, // looped slides should be the same
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			},
			swiperOptionThumbs: {
				spaceBetween: 10,
				slidesPerView: 4,
				autoplay: {
					delay: 2500,
					disableOnInteraction: false,
				},
				touchRatio: 0.2,
				loop: true,
				loopedSlides: 5, // looped slides should be the same
				slideToClickedSlide: true,
			},
			// slider view details
			swiperOptionTop1: {
				spaceBetween: 10,
				loop: true,
				loopedSlides: 5, // looped slides should be the same
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			},
			swiperOptionThumbs1: {
				spaceBetween: 10,
				slidesPerView: 4,
				touchRatio: 0.2,
				loop: true,
				loopedSlides: 5, // looped slides should be the same
				slideToClickedSlide: true,
			},
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
				// 'check-in': 'Checkin',
				// 'check-out': 'Checkout',
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
			locations: [],
			counterChilds: [],
			unit: {
				quantities: 0,
				ages: 0,
			},
			unitAdults: {
				quantities: 0,
				age: 0,
			},
			counterChildsRoom: [],
			unitRoom: {
				quantities: 0,
				age: 0,
			},
			unitAdultsRoom: {
				quantities: 0,
				age: 0,
			},
			checkinroom: '',
			checkoutroom: '',
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
			pageOptions: [1, 5, 10, 15],
			currentMoney: 0,
			items,

			fields: [
				{
					key: 'img',
					class: 'image-content',
				},
				{
					key: 'info',
					class: 'info-content',
					label:
						'<b-row><b-col>Rate Plan</b-col><b-col>Capacity</b-col><b-col>Total</b-col><b-col>Rooms</b-col></b-row>',
				},
			],
			fieldsModalCart: [
				{
					key: 'nameRoom',
					label: 'Name Room',
					class: 'nameRoom',
				},
				{
					key: 'quanlity',
					label: 'Quanlity',
					class: 'quanlity',
				},
				{
					key: 'price',
					label: 'Price',
					class: 'price',
				},
				{
					key: 'Total',
					label: 'Total',
					class: 'Total',
				},
				{
					key: 'cancellation',
					label: 'Cancellation',
					class: 'cancellation',
				},
			],
			fieldsDetail: [
				{
					key: 'ratePlan',
					class: 'ratePlan',
				},
				{
					key: 'capacity',
					class: 'capacity',
				},
				{
					key: 'total',
					class: 'total',
				},
				{
					key: 'rooms',
					class: 'rooms',
				},
			],
			hotelAmenityMore: false,
			roomAmenityMore: false,
			locationMore: false,
			selected: null,
			typeMore: false,
			currentPage: 1,
			perPage: 5,
			totalRows: items.length,

			modalInfo: {
				title: '',
				hotelid: '',
			},
			markers: [],
			// duc
			hotel: {},
			count: 0,
			kt: 0,
			dem: 0,
			priceold: 0,
			checkinDate: '',
			checkoutDate: '',
			capacity: {
				adults: 0,
				children: 0,
			},
			itemroom: [],
			sumplans: 0,
			sumroom: 0,
			selectedRoom: [],
			disnable: 10000000000000000000000000000000000000000000000000000000000000,
			searchTemp: [],
			ktra: 0,
			gtri: 0,
			sl: 0,
			listplant: [],
			rootLink: 'http://imgb2b.ezhotel.vn:8888/hotel/',
			textcoupon: '',
			totalNight: 0,
			errodate: false,
			ab1: 0,
			ab2: 0,
			cd1: 0,
			cd2: 0,
			ktAddcart: false,
			errorAddcart: false,
			checkclass: 'sticky1',
			checkclass1: '',
			lstRoomAmenitiGroup: [],
			lstRoomAmeniti: [],
			lstRoomAmeniti1: [],
			lstRoomAmeniti2: [],
			selectedamenitiroom: [],
			selectAmeniti: [],
			kiemtra: 0,
		};
	},
	components: {
		vueSlider,
		HotelDatePicker,
		swiper,
		swiperSlide,
		axios,
		Multiselect,
		VueSweetalert2,
	},
	computed: {
		getListShop: {
			get() {
				return this.$store.getters['buy/bookings'];
			},
			set(data) {
				this.$store.commit(BuyMutationTypes.SET_BOOKINGS, data);
			},
		},
		filteredDataArray() {
			return this.dataArray.filter(
				option =>
					option
						.toString()
						.toLowerCase()
						.indexOf(this.nameData.toLowerCase()) >= 0,
			);
		},
	},
	created() {
		window.addEventListener('scroll', this.addclass);
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
		}
		if (this.$store.getters['buy/coupon'] !== '') {
			this.textcoupon = this.$store.getters['buy/coupon'];
		}
		this.searchTemp = this.$store.getters['searchTemp/search'];
		const a = this.$moment(this.searchTemp[1]);
		const b = this.$moment(this.searchTemp[2]);
		this.totalNight = b.diff(a, 'days');
		this.$gateway.post(`/v1/ta/getLocation`).then(
			response => {
				const listRes =
					typeof response.data.locations !== 'undefined' && Array.isArray(response.data.locations)
						? response.data.locations
						: [];
				const listTmp = [];
				if (listRes.length > 0) {
					for (let i = 0; i < listRes.length; i += 1) {
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
			},
			error => {
				console.log('failed', error);
			},
		);

		this.seenHotel = this.$store.getters['searchTemp/seen'];
		if (this.searchTemp.length > 0) {
			this.unitAdults.quantities = this.searchTemp[3];
			this.unit.quantities = this.searchTemp[4];
			this.counterChilds = this.searchTemp[5];
			this.unitAdultsRoom.quantities = this.searchTemp[3];
			this.unitRoom.quantities = this.searchTemp[4];
			this.counterChildsRoom = this.searchTemp[5];
			this.selected = this.searchTemp[0];
			this.checkin = new Date(this.searchTemp[1]);
			this.checkOutdate = new Date(this.searchTemp[2]);
		} else {
			this.selected = '';
			this.checkin = new Date();
			this.checkOutdate = new Date();
			this.unitAdults.quantities = 2;
			this.unit.quantities = 0;
			this.counterChilds = [];
		}
		this.agentId = this.$store.getters['user/id'];
		this.shopping = this.$store.getters['buy/bookings'];
		this.totalShop = this.$store.getters['buy/total'];
		this.cities = this.locations.filter(loc => loc.type === 1);
		this.places = this.locations.filter(loc => loc.type === 0);
		this.countStar1 = items.filter(loc => loc.rankStar >= 1 && loc.rankStar < 2);
		this.countStar2 = items.filter(loc => loc.rankStar >= 2 && loc.rankStar < 3);
		this.countStar3 = items.filter(loc => loc.rankStar >= 3 && loc.rankStar < 4);
		this.countStar4 = items.filter(loc => loc.rankStar >= 4 && loc.rankStar < 5);
		this.countStar5 = items.filter(loc => loc.rankStar === 5);
	},
	mounted() {
		this.CallApiDetail();
	},
	methods: {
		filterAmeniti(e) {
			e.sort((a, b) => a - b);
			this.filterAmenitiRoom(e);
		},
		deleteTickRoomAmeniti() {
			this.selectedamenitiroom = [];
			const array = [];
			this.filterAmenitiRoom(array);
		},
		CallApiDetail() {
			this.hotel = [];
			this.apihotelname = [];
			this.apihoteladdress = [];
			this.$gateway
				.post(`/v1/ta/hotelDetail`, {
					agentId: +this.agentId,
					adults: this.searchTemp[3] ? this.searchTemp[3] : 2,
					checkinDate: this.$moment(this.searchTemp[1]).format('YYYY-MM-DD'),
					checkoutDate: this.$moment(this.searchTemp[2]).format('YYYY-MM-DD'),
					children: this.searchTemp[4],
					hotelId: this.searchTemp[6],
					amenities: [],
					coupon: this.searchTemp[7],
					currency: this.$store.getters['user/getCurrentcy'],
					prices: this.$store.getters['buy/price'],
				})
				.then(
					response => {
						const listRes = typeof response.data.value !== 'undefined' ? response.data.value : {};
						if (listRes !== '') {
							this.active = false;
							this.items = [];
							this.apihotelname.push(listRes.names);
							this.apihoteladdress.push(listRes.address);
							for (let i = 0; i < listRes.rooms.length; i += 1) {
								listRes.rooms[i].filter = 1;
								listRes.rooms[i].lstdisable = [];
								listRes.rooms[i].Special = 0;
								listRes.rooms[i].lstpricepromotion = [];
								for (let j = 0; j < listRes.rooms[i].plans.length; j += 1) {
									const p = {};
									p.idPlant = listRes.rooms[i].plans[j].id;
									p.idroom = listRes.rooms[i].id;
									p.se = 0;
									listRes.rooms[i].lstdisable.push(p);
								}
								for (let k = 0; k < listRes.rooms[i].plans.length; k += 1) {
									let pricePromotion = listRes.rooms[i].plans[k].price;
									listRes.rooms[i].plans[k].prommotionPrice = 0;
									for (let p = 0; p < listRes.rooms[i].plans[k].promotions.length; p++) {
										if (listRes.rooms[i].plans[k].promotions[p] !== null) {
											pricePromotion += +listRes.rooms[i].plans[k].promotions[p].price;
										}
									}
									listRes.rooms[i].lstpricepromotion.push(pricePromotion);
									if (listRes.rooms[i].plans[k].promotions.length > 0) {
										for (let kt = 0; kt < listRes.rooms[i].plans[k].promotions.length; kt += 1) {
											if (listRes.rooms[i].plans[k].promotions[kt] !== null) {
												listRes.rooms[i].Special = 1;
												break;
											}
										}
									}
									listRes.rooms[i].plans[k].prommotionPrice = +pricePromotion;
								}
								listRes.rooms[i].lstpricepromotion.sort((a, b) => a - b);
								// eslint-disable-next-line prefer-destructuring
								listRes.rooms[i].minprice = listRes.rooms[i].lstpricepromotion[0];
							}

							console.log('rômdis:', listRes);
							for (let i = 0; i < listRes.rooms.length; i += 1) {
								listRes.rooms[i].giatr = 0;
								for (let j = 0; j < listRes.rooms[i].plans.length; j += 1) {
									listRes.rooms[i].plans[j].choose = 0;
									listRes.rooms[i].plans[j].disable = 0;
								}
							}
							listRes.showCollapse = true;
							this.hotel = listRes;
							listRes.rooms.forEach(element => {
								this.lstRoomAmenitiGroup.push(element.amenityGroups);
							});
							console.log('lstgroup', this.lstRoomAmenitiGroup);
							for (let i = 0; i < this.lstRoomAmenitiGroup.length; i += 1) {
								this.lstRoomAmenitiGroup[i].forEach(element => {
									this.lstRoomAmeniti.push(element);
								});
							}
							this.lstRoomAmeniti.forEach(element => {
								this.lstRoomAmeniti1.push(element.amenities);
							});
							const lstAmenitiRoom = [];
							for (let i = 0; i < this.lstRoomAmeniti1.length; i += 1) {
								this.lstRoomAmeniti1[i].forEach(element => {
									lstAmenitiRoom.push(element);
								});
							}
							for (let i = 0; i < lstAmenitiRoom.length; i += 1) {
								if (this.lstRoomAmeniti2.length > 0) {
									let ktt = 0;
									for (let j = 0; j < this.lstRoomAmeniti2.length; j += 1) {
										if (lstAmenitiRoom[i].id === this.lstRoomAmeniti2[j].id) {
											ktt = 1;
											break;
										}
									}
									if (ktt === 0) {
										this.lstRoomAmeniti2.push(lstAmenitiRoom[i]);
									}
								} else {
									this.lstRoomAmeniti2.push(lstAmenitiRoom[i]);
								}
							}
							this.items.push(listRes.rooms);
							for (let m = 0; m < this.lstRoomAmeniti2.length; m += 1) {
								this.lstRoomAmeniti2[m].count = 0;
								for (let i = 0; i < this.items[0].length; i += 1) {
									for (let j = 0; j < this.items[0][i].amenityGroups.length; j += 1) {
										for (
											let k = 0;
											k < this.items[0][i].amenityGroups[j].amenities.length;
											k += 1
										) {
											if (
												this.lstRoomAmeniti2[m].id ===
												this.items[0][i].amenityGroups[j].amenities[k].id
											) {
												this.lstRoomAmeniti2[m].count += 1;
											}
										}
									}
								}
							}
							console.log('lstgroup1', this.lstRoomAmeniti);
							console.log('lstgroup2', lstAmenitiRoom);
							for (let i = 0; i < this.$store.getters['user/rate'].length; i++) {
								if (
									this.$store.getters['user/rate'][i].fromCode === this.hotel.currency &&
									this.$store.getters['user/getCurrentcy'] ===
										this.$store.getters['user/rate'][i].toCode
								) {
									this.hotel.rate = this.$store.getters['user/rate'][i].rate;
									break;
								}
							}
							this.modalMap = {};
							this.modalMap.location = this.hotel.location;
							this.modalMap.zoom = 12;
							this.modalMap.name = this.hotel.names;
							this.markers = [];
							this.markers.push({
								position: this.hotel.location,
							});
							this.thumb = [];
							this.imgs = [];
							this.thumb.push(listRes.thumbs);
							this.imgs.push(listRes.imgs);
							this.sumplans = 0;
							this.sumroom = 0;
							for (let i = 0; i < this.items[0].length; i += 1) {
								if (this.items[0][i].filter === 1) {
									this.sumplans += this.items[0][i].plans.length;
									this.sumroom += 1;
								}
							}
							// this.sumroom = this.items[0].length;
							const similar = this.$store.getters['searchTemp/similar'];
							this.similarHotel = [];
							for (let i = 0; i < similar.length; i++) {
								if (similar[i].id !== this.hotel.id) {
									this.similarHotel.push(similar[i]);
								}
							}
						}
					},
					error => {
						if (error.status === 403) {
							this.showAlertLogout();
						}
					},
				);
		},
		filterAmenitiRoom(arr) {
			if (arr.length > 0) {
				for (let i = 0; i < this.items[0].length; i += 1) {
					this.items[0][i].filter = 0;
				}
				arr.forEach(element => {
					for (let i = 0; i < this.items[0].length; i += 1) {
						for (let j = 0; j < this.items[0][i].amenityGroups.length; j += 1) {
							for (let k = 0; k < this.items[0][i].amenityGroups[j].amenities.length; k += 1) {
								if (element === this.items[0][i].amenityGroups[j].amenities[k].id) {
									this.items[0][i].filter = 1;
								}
							}
						}
					}
				});
			} else {
				for (let i = 0; i < this.items[0].length; i += 1) {
					this.items[0][i].filter = 1;
				}
			}
			this.sumplans = 0;
			this.sumroom = 0;
			for (let i = 0; i < this.items[0].length; i += 1) {
				if (this.items[0][i].filter === 1) {
					this.sumplans += this.items[0][i].plans.length;
					this.sumroom += 1;
				}
			}
		},
		addclass() {
			if (document.documentElement.scrollTop >= 450) {
				this.checkclass = 'sticky';
				this.checkclass1 = 'sticky1';
			} else {
				this.checkclass = 'sticky1';
				this.checkclass1 = 'searchFixd1';
			}
		},
		strip(html) {
			const tmp = document.createElement('DIV');
			tmp.innerHTML = html;
			return tmp.textContent || tmp.innerText;
		},
		isNumber(evt) {
			evt = evt || window.event;
			const charCode = evt.which ? evt.which : evt.keyCode;
			if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
				evt.preventDefault();
			} else {
				return true;
			}
		},
		tesst(e) {
			this.$root.$emit('bv::toggle::collapse', e);
		},
		modifySearch() {
			this.$validator
				.validateAll()
				.then(response => {
					if (response === true) {
						if (this.checkin !== this.searchTemp[1] || this.checkOutdate !== this.searchTemp[2]) {
							this.$store.commit(BuyMutationTypes.SET_TOTAL, 0);
							this.$store.commit(BuyMutationTypes.SET_BOOKINGS, []);
						}
						const temp = [
							this.selected,
							this.checkin,
							this.checkOutdate,
							this.unitAdults.quantities,
							this.counterChilds.length,
							this.counterChilds,
						];
						this.$store.commit(SearchTempMutationTypes.SET_TEMP, temp);
						getRouter().push('/b2b/resultSearch');
					} else {
						console.log('ducccday');
					}
				})
				.catch(e => {
					// Catch errors
					console.log('duccc', e);
				});
		},
		confirm() {
			this.$root.$emit('bv::toggle::collapse', 'collapse1');
		},
		confirm1() {
			this.$root.$emit('bv::toggle::collapse', 'collapse2');
		},
		countDownChanged(dismissCountDown) {
			this.dismissCountDown = dismissCountDown;
		},
		countDownChanged1(err0dismissCountDown) {
			this.errodismissCountDown = errodismissCountDown;
		},
		onConfirm() {
			//	window.location.reload(true);
			this.errodate = false;
		},
		onCancel() {
			this.errodate = false;
		},
		addCart(item, detail, selected, chin, chout) {
			// this.changePlant();
			let sl = 0;
			if (this.$store.getters['buy/bookings'].length !== 0) {
				for (let i = 0; i < this.$store.getters['buy/bookings'].length; i++) {
					if (
						this.$store.getters['buy/bookings'][i].idRoom === item.id &&
						this.$store.getters['buy/bookings'][i].idplant !== detail.id
					) {
						sl += +this.$store.getters['buy/bookings'][i].quantities;
					}
				}
				if (selected > +item.roomQuantity - +sl && sl > 0) {
					this.ktAddcart = true;
				} else {
					this.ktAddcart = false;
				}
				if (this.ktAddcart === true) {
					this.errorAddcart = true;
				} else if (selected > 0) {
					this.buy.taxIncluded = this.hotel.taxIncluded;
					this.buy.inHour = this.hotel.inHour;
					this.buy.outHour = this.hotel.outHour;
					this.buy.serviceTaxPercent = this.hotel.serviceTaxPercent;
					this.buy.valueAddedTaxPercent = this.hotel.valueAddedTaxPercent;
					this.buy.idHotel = this.hotel.id;
					this.buy.idRoom = item.id;
					this.buy.address = this.hotel.address;
					this.buy.nameHotel = this.hotel.names[0].title;
					this.buy.rankStar = this.hotel.rankStar;
					if (item.names[0] != null) {
						this.buy.nameRoom = item.names[0].title;
					} else this.buy.nameRoom = 'K dữ liệu';
					this.buy.childrenPermitted = item.childrenPermitted;
					this.buy.quantities = +selected;
					this.buy.price = +detail.price;
					this.buy.priceone = +detail.price / +selected;
					this.buy.priceUnitOne = +detail.price / +selected;
					this.buy.promotion = detail.prommotionPrice;
					this.buy.promotionTitle = detail.promotions;
					this.buy.idplant = detail.id;
					this.buy.checkindatebook = this.$moment(this.$store.getters['searchTemp/search'][1]).format(
						'YYYY-MM-DD',
					);
					this.buy.checkoutdatebook = this.$moment(this.$store.getters['searchTemp/search'][2]).format(
						'YYYY-MM-DD',
					);
					this.buy.adult = this.unitAdultsRoom.quantities;
					this.buy.children = this.unitRoom.quantities;
					this.buy.nameplant = detail.names;
					this.buy.desscription = this.hotel.descriptions;
					this.buy.currency = this.hotel.currency;
					this.buy.paymentPolicy = this.hotel.paymentPolicies;
					this.buy.cancelPolicy = this.hotel.cancellationPolicies;
					this.buy.childrenPolicy = this.hotel.childrenPolicy;
					this.buy.maxAdultsRoom = item.maxAdults;
					this.buy.maxGuests = item.maxGuests;
					this.buy.maxGuestsPlant = detail.guestsIncluded;
					this.buy.exadulttype = detail.extraAdultRateType;
					this.buy.exchiltype = detail.extraChildRateType;
					this.buy.exAdult = detail.extraAdultRate;
					this.buy.exChil = detail.extraChildRate;
					this.buy.paymentPolicies = this.hotel.paymentPolicies;
					this.test = this.$store.getters['buy/total'];
					const tempShopping = [...this.shopping];
					const tempBuy = { ...this.buy };
					for (let i = 0; i < tempShopping.length; i += 1) {
						if (tempShopping[i].idRoom === item.id && tempShopping[i].idplant === detail.id) {
							this.kt = 1;
							this.dem = i;
							break;
						} else {
							this.kt = 0;
						}
					}
					if (this.kt === 1) {
						tempShopping.splice(this.dem, 1, tempBuy);
					} else {
						tempShopping.push(tempBuy);
					}
					this.$store.commit(BuyMutationTypes.SET_BOOKINGS, tempShopping);
					this.shopping = this.$store.getters['buy/bookings'];
					this.totalShop = this.$store.getters['buy/total'];
					this.dismissCountDown = this.dismissSecs;
					this.$swal({
						title: this.$t('INFO_ALERT'),
						position: 'top-end',
						type: 'success',
						//text: 'Xem giỏ hàng',
						showConfirmButton: false,
						focusConfirm: false,
						confirmButtonText: 'Xem giỏ hàng',
						confirmButtonAriaLabel: 'Thumbs up, great!',
						timer: 1000,
					}).then(result => {
						if (result.value) {
							// this.$('#btnCart').click();
						}
					});
				} else {
					this.errodismissCountDown = this.dismissSecs;
				}
			} else if (selected > 0) {
				this.buy.taxIncluded = this.hotel.taxIncluded;
				this.buy.inHour = this.hotel.inHour;
				this.buy.outHour = this.hotel.outHour;
				this.buy.serviceTaxPercent = this.hotel.serviceTaxPercent;
				this.buy.valueAddedTaxPercent = this.hotel.valueAddedTaxPercent;
				this.buy.idHotel = this.hotel.id;
				this.buy.idRoom = item.id;
				this.buy.address = this.hotel.address;
				this.buy.nameHotel = this.hotel.names[0].title;
				this.buy.rankStar = this.hotel.rankStar;
				if (item.names[0] != null) {
					this.buy.nameRoom = item.names[0].title;
				} else this.buy.nameRoom = 'K dữ liệu';
				this.buy.childrenPermitted = item.childrenPermitted;
				this.buy.quantities = selected;
				this.buy.price = detail.price;
				this.buy.priceone = +detail.prommotionPrice / +selected;
				this.buy.priceUnitOne = +detail.price / +selected;
				this.buy.promotion = detail.prommotionPrice;
				this.buy.promotionTitle = detail.promotions;
				this.buy.idplant = detail.id;
				this.buy.checkindatebook = this.$moment(this.$store.getters['searchTemp/search'][1]).format(
					'YYYY-MM-DD',
				);
				this.buy.checkoutdatebook = this.$moment(this.$store.getters['searchTemp/search'][2]).format(
					'YYYY-MM-DD',
				);
				this.buy.adult = this.unitAdultsRoom.quantities;
				this.buy.children = this.unitRoom.quantities;
				this.buy.nameplant = detail.names;
				this.buy.desscription = this.hotel.descriptions;
				this.buy.currency = this.hotel.currency;
				this.buy.paymentPolicy = this.hotel.paymentPolicies;
				this.buy.cancelPolicy = this.hotel.cancellationPolicies;
				this.buy.childrenPolicy = this.hotel.childrenPolicy;
				this.buy.maxAdultsRoom = item.maxAdults;
				this.buy.maxGuests = item.maxGuests;
				this.buy.maxGuestsPlant = detail.guestsIncluded;
				this.buy.exadulttype = detail.extraAdultRateType;
				this.buy.exchiltype = detail.extraChildRateType;
				this.buy.exAdult = detail.extraAdultRate;
				this.buy.exChil = detail.extraChildRate;
				this.buy.paymentPolicies = this.hotel.paymentPolicies;
				this.test = this.$store.getters['buy/total'];
				const tempShopping = [...this.shopping];
				const tempBuy = { ...this.buy };
				for (let i = 0; i < tempShopping.length; i += 1) {
					if (tempShopping[i].idRoom === item.id && tempShopping[i].idplant === detail.id) {
						this.kt = 1;
						this.dem = i;
						break;
					} else {
						this.kt = 0;
					}
				}
				if (this.kt === 1) {
					tempShopping.splice(this.dem, 1, tempBuy);
				} else {
					tempShopping.push(tempBuy);
				}
				this.$store.commit(BuyMutationTypes.SET_BOOKINGS, tempShopping);
				this.shopping = this.$store.getters['buy/bookings'];
				this.totalShop = this.$store.getters['buy/total'];
				this.dismissCountDown = this.dismissSecs;
				this.$swal({
					title: this.$t('INFO_ALERT'),
					position: 'top-end',
					type: 'success',
					//text: 'Xem giỏ hàng',
					showConfirmButton: false,
					focusConfirm: false,
					confirmButtonText: 'Xem giỏ hàng',
					confirmButtonAriaLabel: 'Thumbs up, great!',
					timer: 1000,
				}).then(result => {
					if (result.value) {
					}
				});
			} else {
				this.errodismissCountDown = this.dismissSecs;
			}
		},
		//
		addPlant(room, plant) {
			this.sl = 0;
			const pl = {};
			pl.se = 1;
			pl.idPlant = plant.id;
			pl.idroom = room.id;
			plant.choose = 1;
			for (let i = 0; i < room.lstdisable.length; i += 1) {
				if (room.lstdisable[i].idPlant === plant.id && room.lstdisable[i].idroom === room.id) {
					this.ktra = 1;
					room.giatr = i;
					break;
				} else {
					this.ktra = 0;
				}
			}
			if (this.ktra === 1) {
				room.lstdisable[room.giatr].se += 1;
				plant.choose = room.lstdisable[room.giatr].se;
			} else {
				room.lstdisable.push(pl);
			}
			for (let i = 0; i < room.lstdisable.length; i += 1) {
				this.sl += +room.lstdisable[i].se;
			}
			if (this.sl >= room.roomQuantity) {
				plant.disable = 1;
			} else {
				plant.disable = 0;
			}
			room.soluong = +this.sl;

			for (let i = 0; i < room.lstdisable.length; i += 1) {
				if (room.lstdisable[i].idPlant === plant.id) {
					this.$gateway
						.post(`/v1/ta/changeQuantity`, {
							agentId: +this.agentId,
							checkinDate: this.$moment(this.searchTemp[1]).format('YYYY-MM-DD'),
							checkoutDate: this.$moment(this.searchTemp[2]).format('YYYY-MM-DD'),
							hotelId: this.searchTemp[6],
							planId: plant.id,
							quantity: room.lstdisable[i].se === 0 ? 1 : room.lstdisable[i].se,
							roomId: room.id,
							coupon: this.$store.getters['buy/coupon'],
						})
						.then(
							response => {
								const list = typeof response.data.value !== 'undefined' ? response.data.value : {};
								if (list !== '') {
									this.listplant.push(list);
									plant.price = list.price;
									plant.prommotionPrice = list.price;
									plant.promotions = list.promotions;
									for (let j = 0; j < list.promotions.length; j++) {
										plant.prommotionPrice += list.promotions[j].price;
									}
								}
							},
							error => {
								if (error.status) {
									this.showAlertLogout();
								}
							},
						);
				}
			}
		},
		diffPlant(room, plant) {
			this.sl = 0;
			for (let i = 0; i < room.lstdisable.length; i += 1) {
				if (room.lstdisable[i].idPlant === plant.id) {
					this.ktra = 1;
					room.giatr = i;
					break;
				} else {
					this.ktra = 0;
				}
			}
			if (this.ktra === 1) {
				if (room.lstdisable[room.giatr].se === 0) {
					room.lstdisable[room.giatr].se = 0;
				} else {
					room.lstdisable[room.giatr].se -= 1;
				}
				plant.choose = room.lstdisable[room.giatr].se;
			}
			for (let i = 0; i < room.lstdisable.length; i += 1) {
				this.sl += +room.lstdisable[i].se;
			}

			if (this.sl >= room.roomQuantity) {
				plant.disable = 1;
			} else {
				plant.disable = 0;
			}
			room.soluong = +this.sl;
			for (let i = 0; i < room.lstdisable.length; i += 1) {
				if (room.lstdisable[i].idPlant === plant.id) {
					this.$gateway
						.post(`/v1/ta/changeQuantity`, {
							agentId: +this.agentId,
							checkinDate: this.$moment(this.searchTemp[1]).format('YYYY-MM-DD'),
							checkoutDate: this.$moment(this.searchTemp[2]).format('YYYY-MM-DD'),
							hotelId: this.searchTemp[6],
							planId: plant.id,
							quantity: room.lstdisable[i].se === 0 ? 1 : room.lstdisable[i].se,
							roomId: room.id,
							coupon: this.$store.getters['buy/coupon'],
						})
						.then(response => {
							const list = typeof response.data.value !== 'undefined' ? response.data.value : {};
							if (list !== '') {
								this.listplant.push(list);
								plant.price = list.price;
								plant.prommotionPrice = list.price;
								plant.promotions = list.promotions;
								for (let j = 0; j < list.promotions.length; j++) {
									plant.prommotionPrice += list.promotions[j].price;
								}
							}
						});
				}
			}
		},
		changePlant(room, plant) {
			this.sl = 0;

			for (let i = 0; i < room.lstdisable.length; i += 1) {
				if (room.lstdisable[i].idPlant === plant.id) {
					this.ktra = 1;
					room.giatr = i;
					break;
				} else {
					this.ktra = 0;
				}
			}
			plant.choose = Math.floor(plant.choose / 1);
			if (this.ktra === 1) {
				if (plant.choose < 0) {
					room.lstdisable[room.giatr].se = 0;
					plant.choose = 0;
				} else {
					room.lstdisable[room.giatr].se = +plant.choose;
				}
			}
			for (let i = 0; i < room.lstdisable.length; i += 1) {
				this.sl += +room.lstdisable[i].se;
			}

			if (this.sl >= room.roomQuantity) {
				plant.disable = 1;
			} else {
				plant.disable = 0;
			}

			if (this.sl > room.roomQuantity || this.sl < 0) {
				room.lstdisable[room.giatr].se = 0;
				plant.choose = 0;
				this.sl = 0;
				for (let i = 0; i < room.lstdisable.length; i += 1) {
					this.sl += +room.lstdisable[i].se;
				}
			}

			room.soluong = +this.sl;

			for (let i = 0; i < room.lstdisable.length; i += 1) {
				if (room.lstdisable[i].idPlant === plant.id) {
					this.$gateway
						.post(`/v1/ta/changeQuantity`, {
							agentId: +this.agentId,
							checkinDate: this.$moment(this.searchTemp[1]).format('YYYY-MM-DD'),
							checkoutDate: this.$moment(this.searchTemp[2]).format('YYYY-MM-DD'),
							hotelId: this.searchTemp[6],
							planId: plant.id,
							quantity: room.lstdisable[i].se === 0 ? 1 : room.lstdisable[i].se,
							roomId: room.id,
							coupon: this.$store.getters['buy/coupon'],
						})
						.then(response => {
							const list = typeof response.data.value !== 'undefined' ? response.data.value : {};
							if (list !== '') {
								this.listplant.push(list);
								plant.price = list.price;
								plant.prommotionPrice = list.price;
								plant.promotions = list.promotions;
								for (let j = 0; j < list.promotions.length; j++) {
									if (list.promotions[j] !== null) {
										plant.prommotionPrice += list.promotions[j].price;
									}
								}
							}
						});
				}
			}
		},
		deleteShop(index, item) {
			for (let i = 0; i < this.items[0].length; i += 1) {
				if (item.idRoom === this.items[0][i].id) {
					this.items[0][i].disable += +item.quantities;
				}
			}
			let total = '0';
			this.$store.commit(BuyMutationTypes.SET_BOOKINGS, index);
			this.test = this.$store.getters['buy/total'];
			if (this.shopping.length === 0) {
				total = '0';
			} else if (item.promotion === 0) {
				total = +this.test - +item.price * +item.quantities;
			} else {
				total = +this.test - +item.promotion * item.quantities;
			}
			this.$store.commit(BuyMutationTypes.SET_TOTAL, total);
			this.totalShop = this.$store.getters['buy/total'];
		},
		formatArray(value) {
			const array = [];
			let i;
			for (i = 0; i <= value; i += 1) {
				array.push(i);
			}
			return array;
		},
		formatPrice(value) {
			if (this.$store.getters['user/getCurrentcy'] === 'VND') {
				const val = (value / 1).toFixed(0).replace('.', '.');
				return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}
			const val = (value / 1).toFixed(2).replace('.', '.');
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
		diffAdult() {
			if (this.unitAdults.quantities <= 0) {
				this.unitAdults.quantities = 0;
			} else this.unitAdults.quantities -= 1;
		},
		addAdult() {
			this.unitAdults.quantities += 1;
		},
		diffUnits() {
			if (this.unit.quantities <= 0) {
				this.unit.quantities = 0;
			} else {
				this.unit.quantities -= 1;
				this.counterChilds.splice(this.counterChilds, 1);
			}
		},
		addUnits() {
			// if (this.unit.quantities >= 10) {
			// 	this.unit.quantities = 10;
			// } else {
			this.unit.quantities += 1;
			this.counterChilds.push(0);
			// }
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
		// end tuanphansy
		// duc
		diffAdultRoom() {
			if (this.unitAdultsRoom.quantities <= 1) {
				this.unitAdultsRoom.quantities = 1;
			} else this.unitAdultsRoom.quantities--;
		},
		addAdultRoom() {
			this.unitAdultsRoom.quantities++;
		},
		// count units
		diffUnitsRoom() {
			if (this.unitRoom.quantities <= 0) {
				this.unitRoom.quantities = 0;
			} else {
				this.unitRoom.quantities--;
				this.counterChildsRoom.splice(this.counterChildsRoom, 1);
			}
		},
		addUnitsRoom() {
			this.unitRoom.quantities++;
			this.counterChildsRoom.push(0);
		},
		diffUnitsChildRoom(index) {
			if (this.counterChildsRoom[index] <= 0) {
				this.counterChildsRoom[index] = 0;
			} else {
				const temp = this.counterChildsRoom[index] - 1;
				this.counterChildsRoom.splice(index, 1, temp);
			}
		},
		addUnitsChildRoom(index) {
			if (this.counterChildsRoom[index] >= 12) {
				this.counterChildsRoom[index] = 12;
			} else {
				const temp = this.counterChildsRoom[index] + 1;
				this.counterChildsRoom.splice(index, 1, temp);
			}
		},
		checkavailability(checkinroom, checkoutroom, adult, children, cupon) {
			const adults = adult === '' ? 2 : adult;
			const child = children === '' ? 0 : children;
			if (checkinroom !== null && checkoutroom !== null) {
				this.$gateway
					.post(`/v1/ta/hotelDetail`, {
						agentId: this.$store.getters['user/id'],
						adults,
						checkinDate: this.$moment(checkinroom).format('YYYY-MM-DD'),
						checkoutDate: this.$moment(checkoutroom).format('YYYY-MM-DD'),
						child,
						coupon: cupon,
						hotelId: this.searchTemp[6],
						amenities: [],
						currency: this.$store.getters['user/getCurrentcy'],
						prices: this.$store.getters['buy/price'],
					})
					.then(
						response => {
							const listRes = typeof response.data.value !== 'undefined' ? response.data.value : {};
							if (listRes !== '' && listRes.rooms.length > 0) {
								const temp = [
									this.selected,
									checkinroom,
									checkoutroom,
									adults,
									child,
									this.counterChildsRoom,
									this.searchTemp[6],
									cupon,
								];
								const now = new Date();
								const a = this.$moment(checkinroom);
								const b = this.$moment(checkoutroom);
								const c = this.$moment(this.$store.getters['searchTemp/search'][1]);
								const d = this.$moment(this.$store.getters['searchTemp/search'][2]);
								this.ab1 = a.diff(now, 'days');
								this.cd1 = b.diff(now, 'days');
								this.ab2 = c.diff(now, 'days');
								this.cd2 = d.diff(now, 'days');
								if (
									this.ab1 !== this.ab2 ||
									this.cd1 !== this.cd2 ||
									adults !== this.$store.getters['searchTemp/search'][3] ||
									child !== this.$store.getters['searchTemp/search'][4]
								) {
									this.$store.commit(BuyMutationTypes.SET_TOTAL, 0);
									this.$store.commit(BuyMutationTypes.SET_BOOKINGS, []);
									this.$store.commit(SearchTempMutationTypes.SET_TEMP, temp);
									this.$store.commit(BuyMutationTypes.SET_COUPON, cupon);
								} else {
									this.$store.commit(SearchTempMutationTypes.SET_TEMP, temp);
									this.$store.commit(BuyMutationTypes.SET_COUPON, cupon);
								}
								window.location.reload(true);
							} else if (this.$store.getters.currentLanguage.code !== 'vi') {
								this.$swal({
									title: '<strong>Result not found !</strong>',
									type: 'warning',
									text:
										'There are no available rooms for the selected period. Search for available hotels in the same period',
									showConfirmButton: true,
									focusConfirm: false,
									confirmButtonText: 'Close',
									confirmButtonAriaLabel: 'Thumbs up, great!',
								}).then(result => {
									if (result.value) {
										window.location.reload(true);
									}
								});
							} else {
								this.$swal({
									title: '<strong>Không tìm thấy kết quả !</strong>',
									type: 'warning',
									text:
										'Không có phòng trống cho khoảng thời gian đã chọn. Tìm kiếm các khách sạn có sẵn trong cùng thời gian',
									showConfirmButton: true,
									focusConfirm: false,
									confirmButtonText: 'Đóng',
									confirmButtonAriaLabel: 'Thumbs up, great!',
								}).then(result => {
									if (result.value) {
										window.location.reload(true);
									}
								});
							}
						},
						error => {
							console.log('failed', error);
							if (error.status === 403) {
								this.showAlertLogout();
							}
						},
					);
			} else {
				this.errodate = true;
			}
			console.log('loine', this.errodate, checkinroom, checkoutroom);
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
		showmodal() {
			this.$refs.modalMap.show();
			console.log('show');
			this.$refs.myModalRef.show();
		},
		hideModal(modal) {
			console.log(modal);
			this.$root.$emit('bv::hide::modal', modal);
		},
		info(item, event) {
			this.modalMap.location = item.location;
			this.modalMap.zoom = 12;
			this.modalMap.name = item.names;
			this.markers.push({
				position: item.location,
			});
			this.$root.$emit('bv::show::modal', 'modalMap', event.target);
			console.log('item', item);
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
		// d
		viewDetail(row, event) {
			this.itemModal = row;
			this.$root.$emit('bv::show::modal', 'viewDetail', event.target);
		},
		tipMethod(maxAdults, maxChilden, guestsIncluded, extraAdultRate, extraChildRate, item) {
			if (this.$store.getters.currentLanguage.code !== 'vi') {
				if (item.extraAdultRateType === 1 && item.extraChildRateType === 1) {
					return `<table>
							<tr>
								<td style="text-align:left;"><b>Rate Applies To:</b></td>
								<td style="text-align:right;"><b>${guestsIncluded}</b></td>
							</tr>
							<tr>
								<td style="text-align:left;"><b>Extra Adults:</b></td>
								<td style="text-align:right;"><b>${extraAdultRate} %</b></td>
							</tr>
							<tr>
								<td style="text-align:left;"><b>Extra Children:</b></td>
								<td style="text-align:right;"><b>${extraChildRate} %</b></td>
							</tr>
						</table>`;
				}
				if (item.extraAdultRateType !== 1 && item.extraChildRateType !== 1) {
					return `<table>
								<tr>
									<td style="text-align:left;"><b>Rate Applies To:</b></td>
									<td style="text-align:right;"><b align='left'>${guestsIncluded}</b></td>
								</tr>
								<tr>
									<td style="text-align:left;"><b>Extra Adults:</b></td>
									<td style="text-align:right;"><b>${extraAdultRate * this.hotel.rate} ${
						this.$store.getters['user/getCurrentcy']
					}</b></td>
								</tr>
								<tr>
									<td style="text-align:left;"><b>Extra Children:</b></td>
									<td style="text-align:right;"><b>${extraChildRate * this.hotel.rate} ${
						this.$store.getters['user/getCurrentcy']
					}</b></td>
								</tr>
							</table>`;
				}
				if (item.extraAdultRateType === 1 && item.extraChildRateType !== 1) {
					return `<table>
								<tr>
									<td style="text-align:left;"><b>Rate Applies To:</b></td>
									<td style="text-align:right;"><b align='left'>${guestsIncluded}</b></td>
								</tr>
								<tr>
									<td style="text-align:left;"><b>Extra Adults:</b></td>
									<td style="text-align:right;"><b>${extraAdultRate * this.hotel.rate} ${
						this.$store.getters['user/getCurrentcy']
					}</b></td>
								</tr>
								<tr>
									<td style="text-align:left;"><b>Extra Children:</b></td>
									<td style="text-align:right;"><b>${extraChildRate * this.hotel.rate} ${
						this.$store.getters['user/getCurrentcy']
					}</b></td>
								</tr>
							</table>`;
				}
				if (item.extraAdultRateType !== 1 && item.extraChildRateType === 1) {
					return `<table>
								<tr>
									<td style="text-align:left;"><b>Rate Applies To:</b></td>
									<td style="text-align:right;"><b align='left'>${guestsIncluded}</b></td>
								</tr>
								<tr>
									<td style="text-align:left;"><b>Extra Adults:</b></td>
									<td style="text-align:right;"><b> ${extraAdultRate * this.hotel.rate} ${
						this.$store.getters['user/getCurrentcy']
					}</b></td>
								</tr>
								<tr>
									<td style="text-align:left;"><b>Extra Children:</b></td>
									<td style="text-align:right;"><b>${extraChildRate} %</b></td>
								</tr>
							</table>`;
				}
			} else {
				if (item.extraAdultRateType === 1 && item.extraChildRateType === 1) {
					return `<table>
								<tr>
									<td style="text-align:left;"><b>Tỷ lệ áp dụng cho:</b></td>
									<td style="text-align:right;"><b align='left'>${guestsIncluded}</b></td>
								</tr>
								<tr>
									<td style="text-align:left;"><b>Người lớn thêm:</b></td>
									<td style="text-align:right;"><b>${extraAdultRate} %</b></td>
								</tr>
								<tr>
									<td style="text-align:left;"><b>Trẻ em thêm:</b></td>
									<td style="text-align:right;"><b>${extraChildRate} %</b></td>
								</tr>
							</table>`;
				}
				if (item.extraAdultRateType !== 1 && item.extraChildRateType !== 1) {
					return `<table>
								<tr>
									<td style="text-align:left;"><b>Tỷ lệ áp dụng cho:</b></td>
									<td style="text-align:right;"><b align='left'>${guestsIncluded}</b></td>
								</tr>
								<tr>
									<td style="text-align:left;"><b>Người lớn thêm:</b></td>
									<td style="text-align:right;"><b>${extraAdultRate * this.hotel.rate} ${
						this.$store.getters['user/getCurrentcy']
					}</b></td>
								</tr>
								<tr>
									<td style="text-align:left;"><b>Trẻ em thêm:</b></td>
									<td style="text-align:right;"><b>${extraChildRate * this.hotel.rate} ${
						this.$store.getters['user/getCurrentcy']
					}</b></td>
								</tr>
							</table>`;
				}
				if (item.extraAdultRateType === 1 && item.extraChildRateType !== 1) {
					return `<table>
								<tr>
									<td style="text-align:left;"><b>Tỷ lệ áp dụng cho:</b></td>
									<td style="text-align:right;"><b align='left'>${guestsIncluded}</b></td>
								</tr>
								<tr>
									<td style="text-align:left;"><b>Người lớn thêm:</b></td>
									<td style="text-align:right;"><b>${extraAdultRate} %</b></td>
								</tr>
								<tr>
									<td style="text-align:left;"><b>Trẻ em thêm:</b></td>
									<td style="text-align:right;"><b>${extraChildRate * this.hotel.rate} ${
						this.$store.getters['user/getCurrentcy']
					}</b></td>
								</tr>
							</table>`;
				}
				if (item.extraAdultRateType !== 1 && item.extraChildRateType === 1) {
					return `<table>
					<tr>
						<td style="text-align:left;"><b>Tỷ lệ áp dụng cho:</b></td>
						<td style="text-align:right;"><b>${guestsIncluded}</b></td>
					</tr>
					<tr>
						<td style="text-align:left;"><b>Người lớn thêm:</b></td>
						<td style="text-align:right;"><b>${extraAdultRate * this.hotel.rate} ${
						this.$store.getters['user/getCurrentcy']
					}</b></td>
					</tr>
					<tr>
						<td style="text-align:left;"><b>Trẻ em thêm:</b></td>
						<td style="text-align:right;"><b>${extraChildRate} %</b></td>
					</tr>
				</table>`;
				}
			}
		},
		tipMethodview(e) {
			return `<b > ${e}</b>`;
		},
		bookNow(id) {
			this.shopping = this.$store.getters['buy/bookings'];
			if (this.shopping[0] == null) {
				const temp = [
					this.selected,
					this.checkin,
					this.checkOutdate,
					this.unitAdults.quantities,
					this.counterChilds.length,
					this.counterChilds,
					id,
				];
				this.$store.commit(SearchTempMutationTypes.SET_TEMP, temp);
				window.location.reload(true);
			} else if (id !== this.shopping[0].idHotel) {
				this.hotelidmodal.id = id;
				this.$root.$emit('bv::show::modal', 'select');
			} else {
				const temp = [
					this.selected,
					this.checkin,
					this.checkOutdate,
					this.unitAdults.quantities,
					this.counterChilds.length,
					this.counterChilds,
					id,
				];
				this.$store.commit(SearchTempMutationTypes.SET_TEMP, temp);
				window.location.reload(true);
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
				this.checkin,
				this.checkOutdate,
				this.unitAdults.quantities,
				this.unit.quantities,
				this.counterChilds,
				id.id,
				'',
			];
			this.$store.commit(SearchTempMutationTypes.SET_TEMP, temp);
			this.$store.commit(BuyMutationTypes.SET_HOTEL, {
				id,
			});
			window.location.reload(true);
		},
		clickDetailCart() {
			console.log('abbhihi');
			this.$root.$emit('bv::show::modal', 'detailCart');
		},
	},
};
