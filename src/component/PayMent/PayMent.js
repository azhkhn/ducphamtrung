// import axios from 'axios';
import { BuyMutationTypes } from 'store/module/buy';
import getRouter from 'router';
import sha from 'sha.js';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VeeValidate from 'vee-validate';
import Spinner from 'vue-spinkit';
import Multiselect from 'vue-multiselect';
// import 'vue-material/dist/theme/default.css';
import { UserMutationTypes } from 'store/module/user';
import { RememberMeMutationTypes } from 'store/module/rememberMe';

Vue.use(Vuelidate);
Vue.use(VeeValidate);

const COUNTDOWN_TIMER = {
	WORK: 'work',
	REST: 'rest',
};
const TIMER = {
	STARTED: 'started',
	PAUSED: 'paused',
	STOPPED: 'stopped',
};
const WORKING_TIME_LENGTH_IN_MINUTES = 10; // Set thời gian mỗi lần làm việc
const RESTING_TIME_LENGTH_IN_MINUTES = 0; // Set thời gian mỗi lần nghỉ

export default {
	name: 'Payment',
	data() {
		return {
			active: false,
			value: '',
			showSnackbar: false,
			position: 'center',
			showDismissibleAlert: false,
			showCollapse: false,
			minute: WORKING_TIME_LENGTH_IN_MINUTES,
			second: 0,
			countdownTimer: COUNTDOWN_TIMER.WORK,
			timer: TIMER.STOPPED,

			currentView: 'ApplyforAccess',
			linkPayment: '',
			filterAd: '',
			filterCl: '',
			sum: 4,
			service: [],

			selectedAdults: [],
			selectedChildren: [],
			inputBooking: {
				contactName: '',
				email: '',
				phoneNumber: '',
				nationality: '',
			},
			itemModal: {
				// paymentPolicy: '',
				// cancelPolicy: '',
				// childrenPolicy: {},
				// inHour: '',
				// outHour: '',
			},
			baged: 0,
			caged: 0,
			inHour: '',
			outHour: '',
			lstAdults: [],
			lstChildren: [],
			hotel: {},
			shopping: {},
			totalShop: {},
			sumservice: [],
			sumpriceservice: 0,
			kt: 0,
			ktsl: 0,
			ktsl2: 0,
			demsl: 0,
			dem: 0,
			lstpl: [],
			ktime: 0,
			extraAd: 0,
			extraChil: 0,
			// tuan phan sy
			subTotal: 0,
			taxTotal: 0,
			Total: 0,
			totalNight: 0,

			// duc
			selectedATM: null,
			optionsATM: [],
			optionCheckATM: [],
			min: 0,
			paymenttoday: 0,
			check: 1,
			paymenttype: 0,
			retailprice: 0,
			sumpromotion: 0,
			pricecreat: 0,
			subTotalEX: 0,
			data: {},
			getway: [],
			line1: [],
			slAd: 0,
			slCh: 0,
			shoppingPlan: [],
			status: '',
			lstplant: [],
			ktt: 0,
			demm: 0,
			Otherrequests: '',
			Earlychecking: false,
			Nonsmokingroom: false,
			Hightfloor: false,
			paymentcheck: '3',
			flag: 1,
			exchangeRate: 0,
			payableAmount: 0,
			selectRequestt: '',
			lstCountry: [],
			lstCountryEN: [],
			OtherRequest: false,
			showCollapse1: false,
		};
	},
	components: {
		sha,
		Spinner,
		Multiselect,
	},
	destroyed() {
		this.$gateway.post(`/v1/ta/unlockPlan`);
		console.log('destroyed');
		this.countdownTimer = COUNTDOWN_TIMER.REST;
		this.minute = -1;
	},
	// Shopping: [],
	computed: {
		title() {
			return this.countdownTimer === COUNTDOWN_TIMER.WORK ? 'Làm việc thôi!' : 'Nghỉ ngơi tí đi!';
		},
		min() {
			if (this.minute < 10) {
				return `0${this.minute}`;
			}
			return this.minute;
		},
		sec() {
			if (this.second < 10) {
				return `0${this.second}`;
			}
			return this.second;
		},
	},
	mounted() {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0;
		this.checkBooking();
		this.totalAmount();
		this.callChildApi();
		this.$gateway
			.post(`/v1/ta/getService`, {
				hotelId: this.shopping[0].idHotel,
				checkinDate: this.shopping[0].checkindatebook,
				checkoutDate: this.shopping[0].checkoutdatebook,
			})
			.then(
				response => {
					if (response.data.services.length > 0) {
						for (let i = 0; i < response.data.services.length; i++) {
							const temp = {};
							temp.idservice = response.data.services[i].id;
							temp.image = response.data.services[i].imgUrl;
							temp.price = response.data.services[i].rate;
							temp.name = response.data.services[i].names;
							temp.amount = response.data.services[i].maxQuantity;
							this.service.push(temp);
						}
					}
					return this.$gateway.post(`/v1/ta/getGateway?hotelId=${this.shopping[0].idHotel}`);
				},
				error => {
					console.log('failed', error);
					if (error.status) {
						this.showAlertLogout();
					}
				},
			)
			.then(
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
	created() {
		// eslint-disable-next-line no-underscore-dangle
		this._tick();
		// eslint-disable-next-line no-underscore-dangle
		this.interval = setInterval(this._tick, 1000);
		if (this.$store.getters['buy/bookings'].length === 0) {
			this.$router.push('/b2b/DetailSearch');
		}
		this.baged = this.$store.getters['buy/bookings'][0].childrenPolicy.baged;
		this.caged = this.$store.getters['buy/bookings'][0].childrenPolicy.caged;
		this.inHour = this.$store.getters['buy/bookings'][0].inHour;
		this.outHour = this.$store.getters['buy/bookings'][0].outHour;
		const now = new Date();
		this.hotel = this.$store.getters['buy/hotel'];
		this.shopping = this.$store.getters['buy/bookings'];
		for (let i = 0; i < this.$store.getters['user/rate'].length; i++) {
			if (
				this.$store.getters['user/rate'][i].fromCode === this.shopping[0].currency &&
				this.$store.getters['user/getCurrentcy'] === this.$store.getters['user/rate'][i].toCode
			) {
				this.exchangeRate = this.$store.getters['user/rate'][i].rate;
				break;
			}
		}
		const temp = [];
		for (let i = 0; i < this.$store.getters['buy/bookings'].length; i += 1) {
			for (let j = 0; j < this.$store.getters['buy/bookings'][i].quantities; j += 1) {
				const ob = Object.assign({}, { ...this.$store.getters['buy/bookings'][i] });
				temp.push(ob);
			}
		}
		for (let i = 0; i < temp.length; i += 1) {
			temp[i].identify = i;
		}
		this.shoppingPlan = [...temp];
		this.totalShop = this.$store.getters['buy/total'];
		this.ktime = now.setDate(now.getDate() + 1) - this.shopping[0].checkindatebook;
		const a = this.$moment(this.shopping[0].checkindatebook);
		const b = this.$moment(this.shopping[0].checkoutdatebook);
		this.totalNight = b.diff(a, 'days');
		this.ktime = a.diff(now, 'days') === -1 ? 0 : a.diff(now, 'days');
		for (let j = 0; j < this.shopping.length; j += 1) {
			this.retailprice += +this.shopping[j].price;
			this.sumpromotion += +this.shopping[j].promotion;
			this.pricecreat += this.shopping[j].promotion;
		}
		this.totalAmount();
		for (let aa = 0; aa < this.shoppingPlan.length; aa += 1) {
			// const lstt = {};
			this.shoppingPlan[aa].lineType = 0;
			for (let i = 0; i < this.shoppingPlan[aa].nameplant.length; i += 1) {
				if (this.$store.getters.currentLanguage.code === this.shoppingPlan[aa].nameplant[i].langCode) {
					this.shoppingPlan[aa].title = this.shoppingPlan[aa].nameplant[i].title;
				}
			}
			for (let j = 0; j < this.shoppingPlan[aa].desscription.length; j += 1) {
				if (this.$store.getters.currentLanguage.code === this.shoppingPlan[aa].desscription[j].langCode) {
					this.shoppingPlan[aa].description = this.shoppingPlan[aa].desscription[j].title;
				}
			}
			this.shoppingPlan[aa].nights = this.totalNight === 0 ? 1 : this.totalNight;
			this.shoppingPlan[aa].quantity = 1;
			this.shoppingPlan[aa].unitPrice = +this.shoppingPlan[aa].priceUnitOne;
			this.shoppingPlan[aa].adults = 2;
			this.shoppingPlan[aa].children = 0;
			this.shoppingPlan[aa].guestName = null;
			this.shoppingPlan[aa].specialRequest = null;
			this.shoppingPlan[aa].extraAdult = 0;
			this.shoppingPlan[aa].extraAdultPrice = 0;
			this.shoppingPlan[aa].extraChildren = 0;
			this.shoppingPlan[aa].extraChilrenPrice = 0;
			this.shoppingPlan[aa].lineTotal = +this.shoppingPlan[aa].priceUnitOne;
			this.shoppingPlan[aa].roomId = this.shoppingPlan[aa].idRoom;
			this.shoppingPlan[aa].planId = this.shoppingPlan[aa].idplant;
		}
		// done
		if (this.$store.getters['buy/bookings'][0].paymentPolicies.length === 0) {
			this.paymenttoday = 0;
			this.paymentcheck = '3';
		} else if (this.$store.getters['buy/bookings'][0].paymentPolicies[0] !== null) {
			this.paymenttoday = this.$store.getters['buy/bookings'][0].paymentPolicies[0].amount;
			this.paymenttype = this.$store.getters['buy/bookings'][0].paymentPolicies[0].depositType;
			if (this.paymenttoday === 0) {
				this.paymentcheck = '3';
			} else {
				this.paymentcheck = '1';
			}
		} else {
			this.paymenttoday = 0;
			this.paymentcheck = '2';
		}
	},
	methods: {
		changeRoom() {
			this.$gateway.post(`/v1/ta/unlockPlan`);
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
		ShowCollapse(e) {
			if (e === true) {
				this.showCollapse1 = true;
			} else {
				this.showCollapse1 = false;
			}
		},
		checkBooking() {
			if (this.$store.getters['buy/bookings'] === []) {
				this.$router.push('/b2b/DetailSearch');
			}
		},
		onConfirm() {
			document.body.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0;
		},
		onCancel() {
			document.body.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0;
		},
		callChildApi() {
			// call api Location
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
					this.countries = this.locations.filter(loc => loc.locType === 2 && loc.parent === 0);
					for (let i = 0; i < this.countries.length; i++) {
						const temp = {};
						temp.id = this.countries[i].id;
						for (let j = 0; j < this.countries[i].i18ns.length; j++) {
							if (this.countries[i].i18ns[j].langCode === 'en') {
								temp.title = this.countries[i].i18ns[j].title;
							}
						}
						this.lstCountry.push(temp);
					}
					console.log('quoc gia', this.lstCountry);
				},
				error => {
					console.log('failed', error);
				},
			);
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
		formatPrice(value) {
			if (this.$store.getters['user/getCurrentcy'] === 'VND') {
				const val = (value / 1).toFixed(0).replace('.', '.');
				return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}
			const val = (value / 1).toFixed(2).replace('.', '.');
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
		start() {
			this._tick();
			this.interval = setInterval(this._tick, 1000); // Đếm ngược từ 1000ms
		},
		_tick() {
			if (this.second !== 0) {
				this.second--;
				return;
			}
			if (this.minute !== 0 && this.minute > -1) {
				this.minute--;
				this.second = 59;
				return;
			}
			if (this.minute === 0) {
				clearInterval(this.interval);
				if (this.$store.getters.currentLanguage.code !== 'vi') {
					this.$swal({
						title: '<strong>Your booking has expired</strong>',
						type: 'warning',
						text:
							'More than 10 minutes have elapsed since you selected the hotel rooms to your booking. The services are deleted once this time has elapsed in order to ensure their availability and avoid price changes',
						showConfirmButton: true,
						focusConfirm: false,
						confirmButtonText: 'Close',
						confirmButtonAriaLabel: 'Thumbs up, great!',
					}).then(result => {
						if (result.value) {
							this.$store.commit(BuyMutationTypes.SET_TOTAL, 0);
							this.$store.commit(BuyMutationTypes.SET_BOOKINGS, []);
							getRouter().push('/b2b/detailSearch');
						} else {
							this.$store.commit(BuyMutationTypes.SET_TOTAL, 0);
							this.$store.commit(BuyMutationTypes.SET_BOOKINGS, []);
							getRouter().push('/b2b/detailSearch');
						}
					});
				} else {
					this.$swal({
						title: '<strong>Đặt phòng của bạn đã hết hạn</strong>',
						type: 'warning',
						text:
							'Đã hơn 10 phút kể từ khi bạn chọn phòng khách sạn cho đặt phòng của mình. Các dịch vụ sẽ bị xóa khi thời gian này đã trôi qua để đảm bảo tính khả dụng của chúng và tránh thay đổi giá',
						showConfirmButton: true,
						focusConfirm: false,
						confirmButtonText: 'Đóng',
						confirmButtonAriaLabel: 'Thumbs up, great!',
					}).then(result => {
						if (result.value) {
							this.$store.commit(BuyMutationTypes.SET_TOTAL, 0);
							this.$store.commit(BuyMutationTypes.SET_BOOKINGS, []);
							getRouter().push('/b2b/detailSearch');
						} else {
							this.$store.commit(BuyMutationTypes.SET_TOTAL, 0);
							this.$store.commit(BuyMutationTypes.SET_BOOKINGS, []);
							getRouter().push('/b2b/detailSearch');
						}
					});
				}
			}
		},
		checkcheck(idplant, idroom) {
			const ls = {};
			ls.idplant = idplant;
			ls.idroom = idroom;
			ls.sumAdultPl = 0;
			ls.sumChidrenPl = 0;
			ls.sumpriceAd = 0;
			ls.sumpriceCh = 0;
			ls.slAdult = 0;
			ls.slChil = 0;
			ls.sumprice = 0;
			for (let a = 0; a < this.lstpl.length; a += 1) {
				if (idplant === this.lstpl[a].id && idroom === this.lstpl[a].idroom) {
					ls.slAdult += +this.lstpl[a].slAdult;
					ls.slChil += +this.lstpl[a].slChil;
					ls.sumAdultPl += +this.lstpl[a].slexadult;
					ls.sumChidrenPl += +this.lstpl[a].slexchildren;
					ls.sumpriceAd += +this.lstpl[a].exAdult;
					ls.sumpriceCh += +this.lstpl[a].exChil;
					ls.sumprice = +ls.sumpriceAd + +ls.sumpriceCh;
				}
			}
			for (let i = 0; i < this.lstplant.length; i += 1) {
				if (this.lstplant[i].idplant === idplant && this.lstplant[i].idroom === idroom) {
					this.ktt = 1;
					this.demm = i;
					break;
				} else {
					this.ktt = 0;
				}
			}
			if (this.ktt === 1) {
				this.lstplant.splice(this.demm, 1, ls);
			} else {
				this.lstplant.push(ls);
			}
			console.log('lstplant:', this.lstplant);
		},
		disable() {
			for (let t = 0; t < this.shoppingPlan.length; t += 1) {
				this.shoppingPlan[t].sumslroom = 0;
				for (let tt = 0; tt < this.lstpl.length; tt += 1) {
					if (
						this.lstpl[tt].idroom === this.shoppingPlan[t].idRoom &&
						this.lstpl[tt].id === this.shoppingPlan[t].idplant &&
						this.lstpl[tt].identify === this.shoppingPlan[t].identify
					) {
						this.shoppingPlan[t].sumslroom += +this.lstpl[tt].slAdult + +this.lstpl[tt].slChil;
					}
					console.log('dmdmdmd:', this.shoppingPlan[t].sumslroom);
				}
				this.shoppingPlan[t].disable = +this.shoppingPlan[t].maxGuests - +this.shoppingPlan[t].sumslroom;
				console.log('dissssssss:', this.shoppingPlan[t].disable);
			}
		},
		tesst(e) {
			this.$root.$emit('bv::toggle::collapse', e);
		},
		totalAmount() {
			this.subTotal = +this.pricecreat + +this.subTotalEX + +this.sumpriceservice;
			if (this.shopping[0].taxIncluded === false) {
				this.taxTotal =
					this.subTotal * (this.shopping[0].serviceTaxPercent / 100) +
					(this.subTotal + this.subTotal * (this.shopping[0].serviceTaxPercent / 100)) *
						this.shopping[0].valueAddedTaxPercent /
						100;
			} else {
				this.taxTotal = 0;
			}
			this.Total = this.subTotal + this.taxTotal;
			if (this.Total === 0) {
				this.paymentcheck = '3';
			}
		},
		viewAgree(event) {
			this.itemModal = this.$store.getters['buy/bookings'][0];
			this.$root.$emit('bv::show::modal', 'agree');
		},
		hideModal(modal) {
			console.log(modal);
			this.$root.$emit('bv::hide::modal', modal);
		},
		Accept() {
			this.status = 'accepted';
			this.hideModal('agree');
		},
		formatArray(value) {
			const array = [];
			let i;
			for (i = 0; i <= value; i += 1) {
				array.push(i);
			}
			return array;
		},
		formatArray1(value) {
			const array = [];
			let i;
			for (i = 0; i <= value; i += 1) {
				array.push(i);
			}
			return array;
		},
		choose(e, item) {
			this.sumpriceservice = 0;
			const sv = {};

			sv.id = item.idservice;
			sv.price = +item.price;
			sv.total = e * item.price;

			// đóng gói

			sv.lineType = 2;
			for (let i = 0; i < item.name.length; i += 1) {
				if (this.$store.getters.currentLanguage.code === item.name[i].langCode) {
					sv.title = item.name[i].title;
				}
			}

			sv.description = null;
			sv.nights = this.totalNight;
			sv.quantity = e;
			sv.unitPrice = +item.price;
			sv.lineTotal = e * item.price;
			//

			for (let a = 0; a < this.sumservice.length; a += 1) {
				if (this.sumservice[a].id === item.idservice) {
					this.kt = 1;
					this.dem = a;
					break;
				} else {
					this.kt = 0;
				}
			}
			if (this.kt === 1) {
				this.sumservice.splice(this.dem, 1, sv);
			} else {
				this.sumservice.push(sv);
				// this.line1.push(lsv);
			}
			console.log('sumservice', this.sumservice);
			for (let i = 0; i < this.sumservice.length; i += 1) {
				this.sumpriceservice += +this.sumservice[i].lineTotal;
			}

			this.totalAmount();
		},

		// không được xóa vì có thể dùng lại

		// selectAdults(e, item, index) {
		// 	this.subTotalEX = 0;
		// 	const pl = {};
		// 	pl.identify = item.identify;
		// 	pl.id = item.idplant;
		// 	pl.idroom = item.idRoom;
		// 	pl.name = item.nameplant;
		// 	pl.slAdult = +e;
		// 	pl.slChil = typeof this.selectedChildren[index] === 'undefined' ? 0 : +this.selectedChildren[index];
		// 	pl.exAdult = 0;
		// 	pl.exChil = 0;
		// 	pl.index = index;
		// 	pl.quantity = 1;
		// 	pl.unitPrice = item.price;
		// 	pl.slexadult = 0;
		// 	pl.slexchildren = 0;
		// 	console.log('disable:', item.disable);
		// 	if (typeof pl.slChil === 'undefined') {
		// 		pl.summ = pl.slAdult;
		// 	} else {
		// 		pl.summ = +pl.slAdult + +pl.slChil;
		// 	}
		// 	// thieu dieu kien tinh theo gia tien
		// 	if (pl.summ > item.maxGuestsPlant) {
		// 		if (e > item.maxGuestsPlant) {
		// 			if (item.exadulttype === 1) {
		// 				pl.exAdult = +(+e - +item.maxGuestsPlant) * (+item.exAdult / 100) * +item.price;
		// 				pl.slexadult = +(+e - +item.maxGuestsPlant);
		// 			} else {
		// 				pl.exAdult = +(+e - +item.maxGuestsPlant) * +item.exAdult;
		// 				pl.slexadult = +(+e - +item.maxGuestsPlant);
		// 			}
		// 			if (item.exchiltype === 1) {
		// 				pl.exChil = +pl.slChil * +(item.exChil / 100) * +item.price;
		// 				pl.slexchildren = +pl.slChil;
		// 			} else {
		// 				pl.exChil = +pl.slChil * +item.exChil;
		// 				pl.slexchildren = +pl.slChil;
		// 			}
		// 		} else if (item.exchiltype === 1) {
		// 			pl.exChil = +(+pl.summ - +item.maxGuestsPlant) * (+item.exChil / 100) * +item.price;
		// 			pl.slexchildren = +(+pl.summ - +item.maxGuestsPlant);
		// 		} else {
		// 			pl.exChil = +(+pl.summ - +item.maxGuestsPlant) * +item.exChil;
		// 			pl.slexchildren = +(+pl.summ - +item.maxGuestsPlant);
		// 		}
		// 	}
		// 	pl.lineTotal = +item.price + +pl.exChil + +pl.exAdult;
		// 	for (let a = 0; a < this.lstpl.length; a += 1) {
		// 		if (item.idplant === this.lstpl[a].id && item.idRoom === this.lstpl[a].idroom) {
		// 			pl.sumAdultPl += +this.lstpl[a].slexadult;
		// 			pl.sumChidrenPl += +this.lstpl[a].slexchildren;
		// 			pl.sumpriceAd += +this.lstpl[a].exAdult;
		// 			pl.sumpriceCh += +this.lstpl[a].exChil;
		// 		}
		// 		if (
		// 			this.lstpl[a].id === item.idplant &&
		// 			this.lstpl[a].identify === item.identify &&
		// 			this.lstpl[a].idroom === item.idRoom
		// 		) {
		// 			this.ktsl2 = 1;
		// 			this.demsl = a;
		// 			// pl.exChil=this.lstpl[a].exChil;
		// 			console.log('dung');
		// 			break;
		// 		} else {
		// 			this.ktsl2 = 0;
		// 		}
		// 	}
		// 	if (this.ktsl2 === 1) {
		// 		this.lstpl.splice(this.demsl, 1, pl);
		// 	} else {
		// 		this.lstpl.push(pl);
		// 	}
		// 	console.log('lstpl adults', this.lstpl);
		// 	this.slAd = 0;
		// 	this.slCh = 0;
		// 	for (let i = 0; i < this.lstpl.length; i += 1) {
		// 		this.slAd += +this.lstpl[i].slAdult;
		// 		this.slCh += +this.lstpl[i].slChil;
		// 		this.subTotalEX += +this.lstpl[i].exChil + +this.lstpl[i].exAdult;
		// 	}
		// 	console.log('item.idplant', item.idplant);
		// 	console.log('item.identify', item.identify);
		// 	console.log('item.idRoom', item.idRoom);
		// 	console.log('this:', this);
		// 	this.disable();
		// 	this.totalAmount();
		// 	this.checkcheck(item.idplant, item.idRoom);
		// 	// đóng gói
		// },
		addPlantAdult(item, index) {
			console.log('sadsàdsfđfdsfdsdsf');
			this.subTotalEX = 0;
			const pl = {};
			pl.identify = item.identify;
			pl.id = item.idplant;
			pl.idroom = item.idRoom;
			pl.name = item.nameplant;
			pl.slAdult = 1;
			pl.slChil = 0;

			for (let a = 0; a < this.lstpl.length; a += 1) {
				if (
					this.lstpl[a].id === item.idplant &&
					this.lstpl[a].identify === item.identify &&
					this.lstpl[a].idroom === item.idRoom
				) {
					pl.slChil += this.lstpl[a].slChil;
					pl.slAdult += this.lstpl[a].slAdult;
				}
			}

			// pl.slChil = typeof this.selectedChildren[index] === 'undefined' ? 0 : +this.selectedChildren[index];
			pl.exAdult = 0;
			pl.exChil = 0;
			pl.index = index;
			pl.quantity = 1;
			pl.unitPrice = item.priceUnitOne;
			pl.slexadult = 0;
			pl.slexchildren = 0;
			console.log('disable:', item.disable);
			if (typeof pl.slChil === 'undefined') {
				pl.summ = pl.slAdult;
			} else {
				pl.summ = +pl.slAdult + +pl.slChil;
			}
			// thieu dieu kien tinh theo gia tien
			if (pl.summ > item.maxGuestsPlant) {
				if (pl.slAdult > item.maxGuestsPlant) {
					if (item.exadulttype === 1) {
						pl.exAdult = +(+pl.slAdult - +item.maxGuestsPlant) * (+item.exAdult / 100) * +item.priceUnitOne;
						pl.slexadult = +(+pl.slAdult - +item.maxGuestsPlant);
					} else {
						pl.exAdult = +(+pl.slAdult - +item.maxGuestsPlant) * +item.exAdult;
						pl.slexadult = +(+pl.slAdult - +item.maxGuestsPlant);
					}
					if (item.exchiltype === 1) {
						pl.exChil = +pl.slChil * +(item.exChil / 100) * +item.priceUnitOne;
						pl.slexchildren = +pl.slChil;
					} else {
						pl.exChil = +pl.slChil * +item.exChil;
						pl.slexchildren = +pl.slChil;
					}
				} else if (item.exchiltype === 1) {
					pl.exChil = +(+pl.summ - +item.maxGuestsPlant) * (+item.exChil / 100) * +item.priceUnitOne;
					pl.slexchildren = +(+pl.summ - +item.maxGuestsPlant);
				} else {
					pl.exChil = +(+pl.summ - +item.maxGuestsPlant) * +item.exChil;
					pl.slexchildren = +(+pl.summ - +item.maxGuestsPlant);
				}
			} else {
				pl.exAdult = 0;
				pl.slexadult = 0;
				pl.exChil = 0;
				pl.slexchildren = 0;
			}
			pl.lineTotal = +item.priceone + +pl.exChil + +pl.exAdult;
			for (let a = 0; a < this.lstpl.length; a += 1) {
				if (item.idplant === this.lstpl[a].id && item.idRoom === this.lstpl[a].idroom) {
					pl.sumAdultPl += +this.lstpl[a].slexadult;
					pl.sumChidrenPl += +this.lstpl[a].slexchildren;
					pl.sumpriceAd += +this.lstpl[a].exAdult;
					pl.sumpriceCh += +this.lstpl[a].exChil;
				} else {
					pl.sumAdultPl = +pl.slexadult;
					pl.sumChidrenPl = +pl.slexchildren;
					pl.sumpriceAd = +pl.exAdult;
					pl.sumpriceCh = +pl.exChil;
				}
				if (
					this.lstpl[a].id === item.idplant &&
					this.lstpl[a].identify === item.identify &&
					this.lstpl[a].idroom === item.idRoom
				) {
					this.ktsl2 = 1;
					this.demsl = a;
					// pl.exChil=this.lstpl[a].exChil;
					console.log('dung');
					break;
				} else {
					this.ktsl2 = 0;
				}
			}
			if (this.ktsl2 === 1) {
				this.lstpl.splice(this.demsl, 1, pl);
			} else {
				this.lstpl.push(pl);
			}
			this.slAd = 0;
			this.slCh = 0;
			for (let i = 0; i < this.lstpl.length; i += 1) {
				this.slAd += +this.lstpl[i].slAdult;
				this.slCh += +this.lstpl[i].slChil;
				this.subTotalEX += +this.lstpl[i].exChil + +this.lstpl[i].exAdult;
			}
			this.disable();
			this.totalAmount();
			this.checkcheck(item.idplant, item.idRoom);
			item.sl = pl.slAdult;
		},
		diffPlantAdult(item, index) {
			this.subTotalEX = 0;
			const pl = {};
			pl.identify = item.identify;
			pl.id = item.idplant;
			pl.idroom = item.idRoom;
			pl.name = item.nameplant;
			pl.slAdult = -1;
			pl.slChil = 0;

			for (let a = 0; a < this.lstpl.length; a += 1) {
				if (
					this.lstpl[a].id === item.idplant &&
					this.lstpl[a].identify === item.identify &&
					this.lstpl[a].idroom === item.idRoom
				) {
					pl.slChil += this.lstpl[a].slChil;
					pl.slAdult += this.lstpl[a].slAdult;
				}
			}
			if (pl.slAdult === 0) {
				pl.slAdult = 1;
			}
			pl.exAdult = 0;
			pl.exChil = 0;
			pl.index = index;
			pl.quantity = 1;
			pl.unitPrice = item.priceUnitOne;
			pl.slexadult = 0;
			pl.slexchildren = 0;
			console.log('disable:', item.disable);
			if (typeof pl.slChil === 'undefined') {
				pl.summ = pl.slAdult;
			} else {
				pl.summ = +pl.slAdult + +pl.slChil;
			}
			// thieu dieu kien tinh theo gia tien
			if (pl.summ > item.maxGuestsPlant) {
				if (pl.slAdult > item.maxGuestsPlant) {
					if (item.exadulttype === 1) {
						pl.exAdult = +(+pl.slAdult - +item.maxGuestsPlant) * (+item.exAdult / 100) * +item.priceUnitOne;
						pl.slexadult = +(+pl.slAdult - +item.maxGuestsPlant);
					} else {
						pl.exAdult = +(+pl.slAdult - +item.maxGuestsPlant) * +item.exAdult;
						pl.slexadult = +(+pl.slAdult - +item.maxGuestsPlant);
					}
					if (item.exchiltype === 1) {
						pl.exChil = +pl.slChil * +(item.exChil / 100) * +item.priceUnitOne;
						pl.slexchildren = +pl.slChil;
					} else {
						pl.exChil = +pl.slChil * +item.exChil;
						pl.slexchildren = +pl.slChil;
					}
				} else if (item.exchiltype === 1) {
					pl.exChil = +(+pl.summ - +item.maxGuestsPlant) * (+item.exChil / 100) * +item.priceUnitOne;
					pl.slexchildren = +(+pl.summ - +item.maxGuestsPlant);
				} else {
					pl.exChil = +(+pl.summ - +item.maxGuestsPlant) * +item.exChil;
					pl.slexchildren = +(+pl.summ - +item.maxGuestsPlant);
				}
			} else {
				pl.exAdult = 0;
				pl.slexadult = 0;
				pl.exChil = 0;
				pl.slexchildren = 0;
			}
			pl.lineTotal = +item.priceone + +pl.exChil + +pl.exAdult;
			for (let a = 0; a < this.lstpl.length; a += 1) {
				if (item.idplant === this.lstpl[a].id && item.idRoom === this.lstpl[a].idroom) {
					pl.sumAdultPl += +this.lstpl[a].slexadult;
					pl.sumChidrenPl += +this.lstpl[a].slexchildren;
					pl.sumpriceAd += +this.lstpl[a].exAdult;
					pl.sumpriceCh += +this.lstpl[a].exChil;
				} else {
					pl.sumAdultPl = +pl.slexadult;
					pl.sumChidrenPl = +pl.slexchildren;
					pl.sumpriceAd = +pl.exAdult;
					pl.sumpriceCh = +pl.exChil;
				}
				if (
					this.lstpl[a].id === item.idplant &&
					this.lstpl[a].identify === item.identify &&
					this.lstpl[a].idroom === item.idRoom
				) {
					this.ktsl2 = 1;
					this.demsl = a;
					// pl.exChil=this.lstpl[a].exChil;
					console.log('dung');
					break;
				} else {
					this.ktsl2 = 0;
				}
			}
			if (this.ktsl2 === 1) {
				this.lstpl.splice(this.demsl, 1, pl);
			} else {
				this.lstpl.push(pl);
			}
			this.slAd = 0;
			this.slCh = 0;
			for (let i = 0; i < this.lstpl.length; i += 1) {
				this.slAd += +this.lstpl[i].slAdult;
				this.slCh += +this.lstpl[i].slChil;
				this.subTotalEX += +this.lstpl[i].exChil + +this.lstpl[i].exAdult;
			}
			this.disable();
			this.totalAmount();
			this.checkcheck(item.idplant, item.idRoom);
			item.sl = pl.slAdult;
		},
		// không được xóa vì có thể dùng lại
		// selectChildren(e1, item1, index) {
		// 	console.log('bo tay', this.selectedAdults[index]);
		// 	this.subTotalEX = 0;
		// 	const pl = {};
		// 	pl.identify = item1.identify;
		// 	pl.id = item1.idplant;
		// 	pl.idroom = item1.idRoom;
		// 	pl.name = item1.nameplant;
		// 	pl.slAdult = typeof this.selectedAdults[index] === 'undefined' ? 0 : +this.selectedAdults[index];
		// 	pl.slChil = +e1;
		// 	pl.exAdult = 0;
		// 	pl.exChil = 0;
		// 	pl.index = index;
		// 	pl.quantity = 1;
		// 	pl.unitPrice = item1.price;
		// 	pl.summ = 0;
		// 	pl.slexadult = 0;
		// 	pl.slexchildren = 0;
		// 	pl.sumAdultPl = 0;
		// 	pl.sumChidrenPl = 0;
		// 	pl.sumpriceAd = 0;
		// 	pl.sumpriceCh = 0;
		// 	console.log('disable:', item1.disable);
		// 	if (typeof pl.slAdult === 'undefined') {
		// 		pl.summ = pl.slChil;
		// 		console.log('sum1', pl.summ);
		// 	} else {
		// 		pl.summ = +pl.slAdult + +e1;
		// 		console.log('sum2', pl.summ);
		// 		console.log('sum3', this.selectedAdults[index]);
		// 		console.log('sum', e1);
		// 	}
		// 	console.log('sum', pl.summ);
		// 	if (pl.summ > item1.maxGuestsPlant) {
		// 		if (pl.slAdult > item1.maxGuestsPlant) {
		// 			console.log('item1.selectedAdults > item1.maxGuestsPlant');
		// 			if (item1.exadulttype === 1) {
		// 				pl.exAdult = +(+pl.slAdult - +item1.maxGuestsPlant) * (+item1.exAdult / 100) * +item1.price;
		// 				pl.slexadult = +(+pl.slAdult - +item1.maxGuestsPlant);
		// 				console.log('item1.exadulttype===1', pl.exAdult);
		// 			} else {
		// 				pl.exAdult = +(+pl.slAdult - +item1.maxGuestsPlant) * +item1.exAdult;
		// 				pl.slexadult = +(+pl.slAdult - +item1.maxGuestsPlant);
		// 				console.log('else item1.exadulttype===1', pl.exAdult);
		// 			}
		// 			if (item1.exchiltype === 1) {
		// 				pl.exChil = +e1 * (+item1.exChil / 100) * +item1.price;
		// 				pl.slexchildren = +e1;
		// 			} else {
		// 				pl.exChil = +e1 * +item1.exChil;
		// 				pl.slexchildren = +e1;
		// 			}
		// 		} else if (item1.exchiltype === 1) {
		// 			pl.exChil = +(+pl.summ - +item1.maxGuestsPlant) * (+item1.exChil / 100) * +item1.price;
		// 			pl.slexchildren = +(+pl.summ - +item1.maxGuestsPlant);
		// 		} else {
		// 			pl.exChil = +(+pl.summ - +item1.maxGuestsPlant) * +item1.exChil;
		// 			pl.slexchildren = +(+pl.summ - +item1.maxGuestsPlant);
		// 		}
		// 	}
		// 	console.log('pl.exAdult', pl.exAdult);
		// 	pl.lineTotal = +item1.price + +pl.exChil + +pl.exAdult;

		// 	for (let a = 0; a < this.lstpl.length; a += 1) {
		// 		if (
		// 			this.lstpl[a].id === item1.idplant &&
		// 			this.lstpl[a].identify === item1.identify &&
		// 			this.lstpl[a].idroom === item1.idRoom
		// 		) {
		// 			this.ktsl = 1;
		// 			this.demsl = a;
		// 			// pl.exAdult=this.lstpl[a].exAdult;
		// 			console.log('yess');
		// 			break;
		// 		} else {
		// 			this.ktsl = 0;
		// 		}
		// 	}
		// 	if (this.ktsl === 1) {
		// 		this.lstpl.splice(this.demsl, 1, pl);
		// 	} else {
		// 		this.lstpl.push(pl);
		// 	}
		// 	console.log('lstpl', this.lstpl);
		// 	this.slAd = 0;
		// 	this.slCh = 0;
		// 	for (let i = 0; i < this.lstpl.length; i += 1) {
		// 		this.slAd += +this.lstpl[i].slAdult;
		// 		this.slCh += +this.lstpl[i].slChil;
		// 		this.subTotalEX += +this.lstpl[i].exChil + +this.lstpl[i].exAdult;
		// 	}
		// 	this.disable();
		// 	this.totalAmount();
		// 	this.checkcheck(item1.idplant, item1.idRoom);
		// 	// thay the shoppingplant
		// },
		addPlantChild(item, index) {
			console.log('sadsàdsfđfdsfdsdsf');
			this.subTotalEX = 0;
			const pl = {};
			pl.identify = item.identify;
			pl.id = item.idplant;
			pl.idroom = item.idRoom;
			pl.name = item.nameplant;
			pl.slAdult = 0;
			pl.slChil = 1;

			for (let a = 0; a < this.lstpl.length; a += 1) {
				if (
					this.lstpl[a].id === item.idplant &&
					this.lstpl[a].identify === item.identify &&
					this.lstpl[a].idroom === item.idRoom
				) {
					pl.slChil += this.lstpl[a].slChil;
					pl.slAdult += this.lstpl[a].slAdult;
				}
			}

			pl.exAdult = 0;
			pl.exChil = 0;
			pl.index = index;
			pl.quantity = 1;
			pl.unitPrice = item.priceUnitOne;
			pl.slexadult = 0;
			pl.slexchildren = 0;
			console.log('disable:', item.disable);
			if (typeof pl.slChil === 'undefined') {
				pl.summ = pl.slAdult;
			} else {
				pl.summ = +pl.slAdult + +pl.slChil;
			}
			// thieu dieu kien tinh theo gia tien
			if (pl.summ > item.maxGuestsPlant) {
				if (pl.slAdult > item.maxGuestsPlant) {
					if (item.exadulttype === 1) {
						pl.exAdult = +(+pl.slAdult - +item.maxGuestsPlant) * (+item.exAdult / 100) * +item.priceUnitOne;
						pl.slexadult = +(+pl.slAdult - +item.maxGuestsPlant);
					} else {
						pl.exAdult = +(+pl.slAdult - +item.maxGuestsPlant) * +item.exAdult;
						pl.slexadult = +(+pl.slAdult - +item.maxGuestsPlant);
					}
					if (item.exchiltype === 1) {
						pl.exChil = +pl.slChil * +(item.exChil / 100) * +item.priceUnitOne;
						pl.slexchildren = +pl.slChil;
					} else {
						pl.exChil = +pl.slChil * +item.exChil;
						pl.slexchildren = +pl.slChil;
					}
				} else if (item.exchiltype === 1) {
					pl.exChil = +(+pl.summ - +item.maxGuestsPlant) * (+item.exChil / 100) * +item.priceUnitOne;
					pl.slexchildren = +(+pl.summ - +item.maxGuestsPlant);
				} else {
					pl.exChil = +(+pl.summ - +item.maxGuestsPlant) * +item.exChil;
					pl.slexchildren = +(+pl.summ - +item.maxGuestsPlant);
				}
			} else {
				pl.exAdult = 0;
				pl.slexadult = 0;
				pl.exChil = 0;
				pl.slexchildren = 0;
			}
			pl.lineTotal = +item.priceone + +pl.exChil + +pl.exAdult;
			for (let a = 0; a < this.lstpl.length; a += 1) {
				if (item.idplant === this.lstpl[a].id && item.idRoom === this.lstpl[a].idroom) {
					pl.sumAdultPl += +this.lstpl[a].slexadult;
					pl.sumChidrenPl += +this.lstpl[a].slexchildren;
					pl.sumpriceAd += +this.lstpl[a].exAdult;
					pl.sumpriceCh += +this.lstpl[a].exChil;
				} else {
					pl.sumAdultPl = +pl.slexadult;
					pl.sumChidrenPl = +pl.slexchildren;
					pl.sumpriceAd = +pl.exAdult;
					pl.sumpriceCh = +pl.exChil;
				}
				if (
					this.lstpl[a].id === item.idplant &&
					this.lstpl[a].identify === item.identify &&
					this.lstpl[a].idroom === item.idRoom
				) {
					this.ktsl2 = 1;
					this.demsl = a;
					// pl.exChil=this.lstpl[a].exChil;
					console.log('dung');
					break;
				} else {
					this.ktsl2 = 0;
				}
			}
			if (this.ktsl2 === 1) {
				this.lstpl.splice(this.demsl, 1, pl);
			} else {
				this.lstpl.push(pl);
			}
			console.log('lstpl adults', this.lstpl);
			this.slAd = 0;
			this.slCh = 0;
			for (let i = 0; i < this.lstpl.length; i += 1) {
				this.slAd += +this.lstpl[i].slAdult;
				this.slCh += +this.lstpl[i].slChil;
				this.subTotalEX += +this.lstpl[i].exChil + +this.lstpl[i].exAdult;
			}

			this.disable();
			this.totalAmount();
			this.checkcheck(item.idplant, item.idRoom);
			item.slC = pl.slChil;
		},
		diffPlantChild(item, index) {
			console.log('sadsàdsfđfdsfdsdsf');
			this.subTotalEX = 0;
			const pl = {};
			pl.identify = item.identify;
			pl.id = item.idplant;
			pl.idroom = item.idRoom;
			pl.name = item.nameplant;
			pl.slAdult = 0;
			pl.slChil = -1;

			for (let a = 0; a < this.lstpl.length; a += 1) {
				if (
					this.lstpl[a].id === item.idplant &&
					this.lstpl[a].identify === item.identify &&
					this.lstpl[a].idroom === item.idRoom
				) {
					pl.slChil += this.lstpl[a].slChil;
					pl.slAdult += this.lstpl[a].slAdult;
				}
			}

			pl.exAdult = 0;
			pl.exChil = 0;
			pl.index = index;
			pl.quantity = 1;
			pl.unitPrice = item.priceUnitOne;
			pl.slexadult = 0;
			pl.slexchildren = 0;
			console.log('disable:', item.disable);
			if (typeof pl.slChil === 'undefined') {
				pl.summ = pl.slAdult;
			} else {
				pl.summ = +pl.slAdult + +pl.slChil;
			}
			// thieu dieu kien tinh theo gia tien
			if (pl.summ > item.maxGuestsPlant) {
				if (pl.slAdult > item.maxGuestsPlant) {
					if (item.exadulttype === 1) {
						pl.exAdult = +(+pl.slAdult - +item.maxGuestsPlant) * (+item.exAdult / 100) * +item.priceUnitOne;
						pl.slexadult = +(+pl.slAdult - +item.maxGuestsPlant);
					} else {
						pl.exAdult = +(+pl.slAdult - +item.maxGuestsPlant) * +item.exAdult;
						pl.slexadult = +(+pl.slAdult - +item.maxGuestsPlant);
					}
					if (item.exchiltype === 1) {
						pl.exChil = +pl.slChil * +(item.exChil / 100) * +item.priceUnitOne;
						pl.slexchildren = +pl.slChil;
					} else {
						pl.exChil = +pl.slChil * +item.exChil;
						pl.slexchildren = +pl.slChil;
					}
				} else if (item.exchiltype === 1) {
					pl.exChil = +(+pl.summ - +item.maxGuestsPlant) * (+item.exChil / 100) * +item.priceUnitOne;
					pl.slexchildren = +(+pl.summ - +item.maxGuestsPlant);
				} else {
					pl.exChil = +(+pl.summ - +item.maxGuestsPlant) * +item.exChil;
					pl.slexchildren = +(+pl.summ - +item.maxGuestsPlant);
				}
			} else {
				pl.exAdult = 0;
				pl.slexadult = 0;
				pl.exChil = 0;
				pl.slexchildren = 0;
			}
			pl.lineTotal = +item.priceone + +pl.exChil + +pl.exAdult;
			for (let a = 0; a < this.lstpl.length; a += 1) {
				if (item.idplant === this.lstpl[a].id && item.idRoom === this.lstpl[a].idroom) {
					pl.sumAdultPl += +this.lstpl[a].slexadult;
					pl.sumChidrenPl += +this.lstpl[a].slexchildren;
					pl.sumpriceAd += +this.lstpl[a].exAdult;
					pl.sumpriceCh += +this.lstpl[a].exChil;
				} else {
					pl.sumAdultPl = +pl.slexadult;
					pl.sumChidrenPl = +pl.slexchildren;
					pl.sumpriceAd = +pl.exAdult;
					pl.sumpriceCh = +pl.exChil;
				}
				if (
					this.lstpl[a].id === item.idplant &&
					this.lstpl[a].identify === item.identify &&
					this.lstpl[a].idroom === item.idRoom
				) {
					this.ktsl2 = 1;
					this.demsl = a;
					break;
				} else {
					this.ktsl2 = 0;
				}
			}
			if (this.ktsl2 === 1) {
				this.lstpl.splice(this.demsl, 1, pl);
			} else {
				this.lstpl.push(pl);
			}
			this.slAd = 0;
			this.slCh = 0;
			for (let i = 0; i < this.lstpl.length; i += 1) {
				this.slAd += +this.lstpl[i].slAdult;
				this.slCh += +this.lstpl[i].slChil;
				this.subTotalEX += +this.lstpl[i].exChil + +this.lstpl[i].exAdult;
			}
			this.disable();
			this.totalAmount();
			this.checkcheck(item.idplant, item.idRoom);
			item.slC = pl.slChil;
		},
		// sleted request
		selectRequest(e, item) {
			// const re = e;
			for (let i = 0; i < this.shoppingPlan.length; i += 1) {
				if (this.shoppingPlan[i].identify === item.identify) {
					this.shoppingPlan[i].specialRequest = e;
				}
			}
		},
		guestDetails(e, item) {
			// const ges = e;
			for (let i = 0; i < this.shoppingPlan.length; i += 1) {
				if (this.shoppingPlan[i].identify === item.identify) {
					this.shoppingPlan[i].guestName = e;
					console.log('inden', this.shoppingPlan[i].guestName);
				}
			}
			console.log('lstplgess', e);
		},
		Confirm() {
			if (this.$store.getters['buy/bookings'].length !== 0) {
				this.$validator
					.validateAll()
					.then(response => {
						if (response === true) {
							this.flag = 3;
							for (let a = 0; a < this.sumservice.length; a += 1) {
								const lsv = {};
								lsv.lineType = 2;
								lsv.title = this.sumservice[a].title;
								lsv.description = null;
								lsv.nights = this.sumservice[a].nights;
								lsv.quantity = this.sumservice[a].quantity;
								lsv.unitPrice = this.sumservice[a].unitPrice;
								lsv.lineTotal = this.sumservice[a].lineTotal;
								lsv.roomId = 0;
								lsv.planId = 0;
								lsv.adults = 0;
								lsv.children = 0;
								lsv.guestName = 0;
								lsv.specialRequest = 0;
								lsv.extraAdult = 0;
								lsv.extraAdultPrice = 0;
								lsv.extraChildren = 0;
								lsv.extraChilrenPrice = 0;
								this.line1.push(lsv);
							}
							for (let du = 0; du < this.lstpl.length; du += 1) {
								for (let ma = 0; ma < this.shoppingPlan.length; ma += 1) {
									if (this.shoppingPlan[ma].identify === this.lstpl[du].identify) {
										this.shoppingPlan[ma].extraAdult = this.lstpl[du].slexadult;
										this.shoppingPlan[ma].extraAdultPrice = this.lstpl[du].exAdult;
										this.shoppingPlan[ma].extraChildren = this.lstpl[du].slexchildren;
										this.shoppingPlan[ma].extraChilrenPrice = this.lstpl[du].exChil;
										this.shoppingPlan[ma].lineTotal = this.lstpl[du].lineTotal;
										this.shoppingPlan[ma].adults = this.lstpl[du].slAdult;
										this.shoppingPlan[ma].children = this.lstpl[du].slChil;
									}
								}
							}
							for (let k = 0; k < this.shoppingPlan.length; k += 1) {
								const ob = {};

								ob.lineType = 0;
								for (let i = 0; i < this.shoppingPlan[k].nameplant.length; i++) {
									if (
										this.$store.getters.currentLanguage.code ===
										this.shoppingPlan[k].nameplant[i].langCode
									) {
										ob.title = this.shoppingPlan[k].nameplant[i].title;
									}
								}

								ob.description = this.shoppingPlan[k].description;

								ob.nights = this.shoppingPlan[k].nights;

								ob.quantity = 1;

								ob.unitPrice = this.shoppingPlan[k].unitPrice;

								ob.adults = this.shoppingPlan[k].adults;
								ob.children = this.shoppingPlan[k].children;
								ob.guestName = this.shoppingPlan[k].guestName;
								ob.specialRequest = this.shoppingPlan[k].specialRequest;
								ob.extraAdult = this.shoppingPlan[k].extraAdult;
								ob.extraAdultPrice = this.shoppingPlan[k].extraAdultPrice;
								ob.extraChildren = this.shoppingPlan[k].extraChildren;
								ob.extraChildrenPrice = this.shoppingPlan[k].extraChilrenPrice;
								ob.lineTotal = this.shoppingPlan[k].lineTotal;
								ob.roomId = this.shoppingPlan[k].roomId;
								ob.planId = this.shoppingPlan[k].planId;
								this.line1.push(ob);
							}
							for (let t = 0; t < this.$store.getters['buy/bookings'].length; t += 1) {
								//
								for (let p = 0; p < this.$store.getters['buy/bookings'][t].promotionTitle.length; p++) {
									const po = {};
									po.lineType = 1;
									if (this.$store.getters['buy/bookings'][t].promotionTitle[p] !== null) {
										for (
											let pp = 0;
											pp < this.$store.getters['buy/bookings'][t].promotionTitle[p].names.length;
											pp++
										) {
											if (
												this.$store.getters.currentLanguage.code ===
												this.$store.getters['buy/bookings'][t].promotionTitle[p].names[pp]
													.langCode
											) {
												po.title = this.$store.getters['buy/bookings'][t].promotionTitle[
													p
												].names[pp].title;
											}
										}
										po.description = '';
										po.nights = 0;
										po.quantity = 1;
										po.unitPrice = this.$store.getters['buy/bookings'][t].promotionTitle[p].price;
										po.adults = 0;
										po.children = 0;
										po.guestName = 0;
										po.specialRequest = 0;
										po.extraAdult = 0;
										po.extraAdultPrice = 0;
										po.extraChildren = 0;
										po.extraChildrenPrice = 0;
										po.lineTotal = this.$store.getters['buy/bookings'][t].promotionTitle[p].price;
										po.roomId = this.$store.getters['buy/bookings'][t].idRoom;
										po.planId = this.$store.getters['buy/bookings'][t].idplant;
										this.line1.push(po);
									}
								}
							}

							console.log('data', this.line1);
							this.$gateway.post(`/v1/ta/generateKeygen`).then(
								response2 => {
									this.flag = 3;
									const list =
										typeof response2.data.value !== 'undefined' ? response2.data.value : {};
									if (list !== '') {
										this.data = list.key;
									}
									if (this.paymentcheck === '1') {
										if (this.paymenttype === 1) {
											this.payableAmount = this.paymenttoday / 100 * this.Total;
										} else {
											this.payableAmount = this.paymenttoday;
										}
									}
									if (this.paymentcheck === '2') {
										this.payableAmount = this.Total;
									}
									if (this.paymentcheck === '3') {
										this.payableAmount = 0;
									}
									const dataPass = {
										langCode: this.$store.getters.currentLanguage.code,
										accepted: true,
										hotelId: this.shopping[0].idHotel,
										agentId: this.$store.getters['user/id'],
										username: this.$store.getters['user/userName'],
										checkIn: this.shopping[0].checkindatebook,
										checkOut: this.shopping[0].checkoutdatebook,
										nights: this.totalNight,
										adults: this.shopping[0].adult,
										children: this.shopping[0].children,
										cusName: this.inputBooking.contactName,
										cusEmail: this.inputBooking.email,
										cusPhone: this.inputBooking.phoneNumber,
										cusCountry: this.inputBooking.nationality,
										currency: this.shopping[0].currency,
										earlyCheckin: this.Earlychecking,
										highFloor: this.Hightfloor,
										noSmokingRoom: this.Nonsmokingroom,
										payableAmount: this.payableAmount,
										gatewayId: this.selectedATM,
										returnLink: `http://${window.location.host}/b2b/paymentdetail`,
										//  'http://localhost:8080/b2b/viewbooking'  this.$router.path("/b2b/viewbooking")
										description: this.shopping[0].description,
										notes: this.Otherrequests,
										subTotal: this.subTotal,
										totalTaxes: this.taxTotal,
										totalCost: this.Total,
										lines: this.line1,
									};
									console.log('book', dataPass);
									// hash pass
									const shajs = require('sha.js');
									const hash = JSON.stringify(dataPass);
									console.log(
										'shit',
										shajs('sha256')
											.update(hash.concat(this.data))
											.digest('hex'),
									);
									// chuoi
									const signature = shajs('sha256')
										.update(hash.concat(this.data))
										.digest('hex');
									// const hashData = {
									// 	signature,
									// 	value: dataPass,
									// };

									// console.log('line', hashData);
									return this.$gateway
										.post(`/v1/ta/confirmBooking`, {
											signature,
											value: dataPass,
										})
										.then(
											response1 => {
												this.flag = 3;
												if (response1.data.responseCode === 1) {
													this.swal({
														position: 'center',
														type: 'success',
														title: 'Your work has been saved',
														showConfirmButton: false,
														timer: 1500,
													});
													this.flag = 2;
												}
												if (response1.data.responseCode === 0) {
													this.value = response1.data.value;
													if (typeof this.value === 'string') {
														window.location.reload(true);
														window.location.href = this.value;
														this.flag = 2;
													} else {
														this.$store.commit(BuyMutationTypes.SET_PAYMENT, this.value);
														getRouter().push('/b2b/paymentdetail');
														this.flag = 2;
													}
												}
												if (response1.data.responseCode === 2) {
													console.log('ahihihi3', response1.data.message);
												}
												if (response1.data.responseCode === 3) {
													this.flag = 2;
													this.$swal({
														title: '',
														type: 'warning',
														html: response1.data.value,
														showCloseButton: false,
														showCancelButton: false,
														showConfirmButton: true,
														focusConfirm: false,
														confirmButtonText: 'Trang chủ',
														confirmButtonAriaLabel: 'Thumbs up, great!',
														cancelButtonText: 'Đóng',
														cancelButtonAriaLabel: 'Thumbs up, great!',
														cancelButtonColor: '#d33',
													}).then(() => {
														this.$router.push('avaiSearch');
														window.location.reload(true);
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
								},
								error => {
									console.log('failed', error);
								},
							);
							this.$store.commit(BuyMutationTypes.SET_TOTAL, 0);
							this.$store.commit(BuyMutationTypes.SET_BOOKINGS, []);
						} else {
							console.log('ducccday');
							this.active = true;
							// this.showDismissibleAlert = true;
							// alert(this.$t('ERROR_CONFIRM'));
						}
					})
					.catch(e => {
						this.flag = 2;
						console.log('duccc', e);
					});
			}
		},
		hidealert() {
			this.showDismissibleAlert = false;
		},
		cancel() {
			this.$store.commit(BuyMutationTypes.SET_TOTAL, 0);
			this.$store.commit(BuyMutationTypes.SET_BOOKINGS, []);
			this.$router.push('/b2b/detailSearch');
			this.$gateway.post(`/v1/ta/unlockPlan`);
		},
	},
};
