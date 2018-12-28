import { events } from 'vue-i18n-manager';
import getRouter from 'router';
import { UserMutationTypes } from 'store/module/user';
// import { getValue } from 'util/injector';
// import { GATEWAY } from 'data/Injectables';
import Vue from 'vue';
import { SearchTempMutationTypes } from 'store/module/searchTemp';
import { RememberMeMutationTypes } from 'store/module/rememberMe';
import { BuyMutationTypes } from 'store/module/buy';
import Vuelidate from 'vuelidate';
import VeeValidate from 'vee-validate';
import NavBarLeft from 'component/NavBarLeft';

Vue.use(Vuelidate);
Vue.use(VeeValidate);

const menu = [
	{
		menu_name: 'reception',
		menu_link: '/reception',
		menu_permission: ['RECEPTION'],
		sub_menus: [
			{
				menu_name: 'quick_checkin',
				menu_link: '/quick_checkin',
				menu_permission: ['QUICK_CHECKIN'],
			},
			{
				menu_name: 'admin_checkin',
				menu_link: '/admin_checkin',
				menu_permission: ['ADMIN'],
			},
		],
	},
	{
		menu_name: 'FAQ',
		menu_link: '/test2',
		menu_permission: ['ALL'],
	},
];

function pad(num, size) {
	let s = `${num}`;
	while (s.length < size) s = `0${s}`;
	return s;
}
for (let i = 0; i < menu.length; i += 1) {
	const idx = pad(i, 3);
	if (menu[i].sub_menus) {
		for (let j = 0; j < menu[i].sub_menus.length; j += 1) {
			const subidx = pad(j, 3);
			menu[i].sub_menus[j].id = `${idx}-${subidx}`;
		}
	}
	menu[i].id = idx;
}

export default {
	name: 'PageHeaderBlue',
	data() {
		return {

			totalShop: 0,
			searchTemp: [],
			plans: [],
			rooms: [],
			menu: this.calculateMenu(),
			breadCrumb: this.getBreadCrumb(this.$store.getters['user/menu']),
			user: this.$store.getters['rememberMe/rememberPassword'].fullName,
			itemss: {
				currentPass: '',
				newPass: '',
				cfnewPass: '',
			},
			items: [],
			tableBooking: [
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
					label: 'Cancel',
					class: 'cancellation',
				},
			],
			errorChangePassword: true,
			errorCfPassword: true,
			rateall: [],
			rate: '',
			rootlink: '',
			avaisearch: 'active',
			hotel: '',
			booking: '',
			report: '',
		};
	},
	computed: {
		link() {
			if (this.$route.path === '/b2b/hotelsofta') {
				return false;
			}
			return true;
		},
	},

	created() {
		this.rateall = this.$store.getters['user/rateAll'];
		this.searchTemp = this.$store.getters['searchTemp/search'];
		this.shopping = this.$store.getters['buy/bookings'];
		this.items = this.shopping;
		this.$eventHub.$on('role-changed', () => {
			this.menu = this.calculateMenu();
		});
		this.$eventHub.$on('path-changed', path => {
			this.breadCrumb = this.getBreadCrumb(this.$store.getters['user/menu'], path);
		});
		const accessToken = this.$store.getters['user/accessToken'];
		if (!accessToken) {
			const router = getRouter();
			if (!router.history.current.meta.isAnonymous) router.push('/login');
		}
		if (this.$store.getters['user/menu'] === '/b2b/avaiSearch') {
			this.avaisearch = 'active';
		} else {
			this.avaisearch = '';
		}
		if (this.$store.getters['user/menu'] === '/b2b/hotelsofta') {
			this.hotel = 'active';
		} else {
			this.hotel = '';
		}
		if (this.$store.getters['user/menu'] === '/b2b/reservationSearch') {
			this.booking = 'active';
		} else {
			this.booking = '';
		}
		if (this.$store.getters['user/menu'] === '/b2b/chartDashBoard') {
			this.report = 'active';
		} else {
			this.report = '';
		}
	},
	methods: {

		tipMethodview(e) {
			return `<b > ${e}</b>`;
		},
		myinfo() {
			this.$store.commit(BuyMutationTypes.SET_CURRENT_DASHBOARD, 'Profile');
			if (window.location.pathname === '/b2b/dashbroad') {
				window.location.reload(true);
			}
			this.$router.push('dashbroad');
		},
		showCartEmpty() {
			this.$swal({
				position: 'center',
				// type: 'success',
				title: 'Your Shopping Cart is empty !',
				html: '<hr>',
				showCancelButton: false,
				showLoaderOnConfirm: true,
				confirmButtonText: 'Continue Shopping',
				// cancelButtonText: 'No, cancel!',
				// timer: 1500
			}).then(result => {
				if (result.value) {
					getRouter().push('/b2b/avaiSearch');
				}
			});
		},
		cart() {
			this.totalShop = 0;
			this.shopping = this.$store.getters['buy/bookings'];
			this.items = this.shopping;
			for (let i = 0; i < this.$store.getters['user/rate'].length; i += 1) {
				if (
					this.$store.getters['user/rate'][i].fromCode === this.shopping[0].currency &&
					this.$store.getters['user/getCurrentcy'] === this.$store.getters['user/rate'][i].toCode
				) {
					this.items.rate = this.$store.getters['user/rate'][i].rate;
					break;
				}
			}
			for (let i = 0; i < this.shopping.length; i += 1) {
				if (this.shopping[i].promotion !== 0) {
					this.totalShop += +this.shopping[i].promotion;
				} else {
					this.totalShop += +this.shopping[i].price;
				}
			}
			this.$root.$emit('bv::show::modal', 'detailCart');
		},
		deleteShop(item) {
			for (let i = 0; i < this.shopping.length; i += 1) {
				if (this.shopping[i].idRoom === item.idRoom && this.shopping[i].idplant === item.idplant) {
					this.$store.commit(BuyMutationTypes.SET_BOOKINGS, i);
				}
			}
			this.totalShop = 0;
			for (let i = 0; i < this.shopping.length; i += 1) {
				if (this.shopping[i].promotion !== 0) {
					this.totalShop += +this.shopping[i].promotion;
				} else {
					this.totalShop += +this.shopping[i].price;
				}
			}
			if (getRouter().history.current.fullPath === '/b2b/payment') {
				if (this.$store.getters['buy/bookings'].length === 0) {
					this.$router.push('/b2b/DetailSearch');
					this.$root.$emit('bv::hide::modal', 'detailCart');
				}
				window.location.reload(true);
			}
			if (this.$store.getters['buy/bookings'].length === 0) {
				this.$root.$emit('bv::hide::modal', 'detailCart');
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
		AVAILABILITY() {
			this.$router.push('/b2b/AvaiSearch');
		},
		hotels() {
			this.$router.push('/b2b/hotelsofta');
		},
		ReservationSearch() {
			this.$router.push('/b2b/reservationSearch');
		},
		ChartDashBoard(m) {
			this.$store.commit(UserMutationTypes.SET_CURRENT_MENU, m);
			this.$router.push('/b2b/chartDashBoard');
		},
		// end duc
		translateBC(bc) {
			if (bc) {
				for (let idx = 0; idx < bc.length; idx += 1) {
					bc[idx].text = this.$t(bc[idx].name);
				}
			}
			return bc;
		},
		getBreadCrumb(m, path) {
			if (path == null) {
				const router = getRouter();
				path = router.history.current.path;
			}
			if (!m || path !== m.menu_link) {
				//
				const pm = this.calculateMenu();
				for (let idx = 0; idx < pm.length; idx += 1) {
					if (pm[idx].menu_link === path) return this.getBreadCrumb(pm[idx], path);
					if (pm[idx].sub_menus) {
						for (let idx2 = 0; idx2 < pm[idx].sub_menus.length; idx2 += 1) {
							if (pm[idx].sub_menus[idx2].menu_link === path)
								return this.getBreadCrumb(pm[idx].sub_menus[idx2], path);
						}
					}
				}
				return [
					{
						name: 'home',
						href: '/',
					},
				];
			}
			if (!m.id)
				return [
					{
						name: 'home',
						href: '/',
					},
				];
			const menuIds = m.id.split('-');
			const mm = menu.filter(item => item.id === menuIds[0]);
			if (mm.length > 0) {
				if (mm[0].sub_menus && menuIds.length === 2) {
					const smm = mm[0].sub_menus.filter(item => item.id === menuIds[1]);
					if (smm.length > 0)
						return [
							{
								name: 'home',
								href: '/',
							},
							{
								name: mm[0].menu_name,
								href: mm[0].menu_link,
							},
							{
								name: smm[0].menu_name,
								href: smm[0].menu_link,
							},
						];
				}

				return [
					{
						name: 'home',
						href: '/',
					},
					{
						name: mm[0].menu_name,
						href: mm[0].menu_link,
					},
				];
			}
			return [
				{
					name: 'home',
					href: '/',
				},
			];
		},
		menuClick(m) {
			this.$store.commit(UserMutationTypes.SET_CURRENT_MENU, m);
		},
		calculateMenu() {
			const roles = this.$store.getters['user/roles'];
			const permissionMenu = [];

			for (let idx = 0; idx < menu.length; idx += 1) {
				const m = menu[idx];
				if (m.sub_menus) {
					const mm = {};
					mm.menu_name = m.menu_name;
					mm.sub_menus = [];
					for (let idx2 = 0; idx2 < m.sub_menus.length; idx2 += 1) {
						if (
							m.sub_menus[idx2].menu_permission.filter(item => item === 'ALL' || roles.includes(item))
								.length > 0
						) {
							mm.sub_menus.push(m.sub_menus[idx2]);
						}
					}
					if (mm.sub_menus.length > 0) permissionMenu.push(mm);
				} else if (m.menu_permission.filter(item => item === 'ALL' || roles.includes(item)).length > 0) {
					permissionMenu.push(m);
				}
			}
			return permissionMenu;
		},
		currentMoney() {
			return this.$store.getters['user/currentcy'];
		},
		currentLanguage() {
			if (this.$store.getters.currentLanguage.code === 'en')
				return '<img class="m-0 p-0" style="border-radius: 0px;" src="data:image/png;base64,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" width="20px" height="20px"/> ENG';
			return '<img class="m-0 p-0"  style="border-radius: 0px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2000px-Flag_of_Vietnam.svg.png" width="20px" height="20px"/> VN';
		},
		isCurrentLanguage(code) {
			return this.$store.getters.currentLanguage.code === code;
		},
		isCurrentMoney(currency) {
			return this.$store.getters['user/getCurrentcy'] === currency;
		},
		changeLanguage(code) {
			this.$store.dispatch(events.SET_LANGUAGE, code);
			this.$store.commit(UserMutationTypes.SET_LANGCODE, code);
			window.location.reload(true);
		},
		changeMoney(code) {
			this.$store.commit(UserMutationTypes.SET_CURRENTCY, code);
			this.rate = code;
			window.location.reload(true);
		},
		modalChangePassword() {
			this.errorChangePassword = true;
			this.errorCfPassword = true;
			this.itemss.currentPass = '';
			this.itemss.newPass = '';
			this.itemss.cfnewPass = '';
			this.$root.$emit('bv::show::modal', 'modalChangePassword');
		},
		cfchangePassword(e) {
			if (this.itemss.currentPass === '' && this.itemss.newPass === '' && this.itemss.cfnewPass === '') {
				this.errorChangePassword = false;
			} else if (this.itemss.newPass.length < 8) {
				this.errorChangePassword = false;
			} else if (this.itemss.newPass !== this.itemss.cfnewPass) {
				this.errorChangePassword = true;
				this.errorCfPassword = false;
			} else {
				this.$gateway
					.post(`/v1/ta/changePasswordTravelAgent`, {
						agentId: this.$store.getters['user/id'],
						username: this.$store.getters['user/userName'],
						confirmNewPassword: e.cfnewPass,
						newpassWord: e.newPass,
						password: e.currentPass,
					})
					.then(response => {
						if (response.data.responseCode === 0) {
							this.$swal({
								position: 'top-end',
								type: 'success',
								title: this.$t('ChangPassword_Success'),
								showConfirmButton: false,
								timer: 1500,
							}).then(() => {
								this.$store.commit(UserMutationTypes.SET_USER_INFO, null);
								this.$store.commit(SearchTempMutationTypes.SET_TEMP, []);
								this.$store.commit(BuyMutationTypes.SET_TOTAL, 0);
								this.$store.commit(BuyMutationTypes.SET_BOOKINGS, []);
								this.$store.commit(BuyMutationTypes.SET_CURRENT, 'ApplyforAccess');
								this.$store.commit(SearchTempMutationTypes.SET_SEEN, []);
								getRouter().push('/login');
							});
						} else {
							this.$swal({
								position: 'top-end',
								type: 'error',
								title: this.$t('ChangPassword_Error'),
								showConfirmButton: false,
								timer: 1500,
							}).then(() => {
								window.location.reload(true);
							});
						}
					});
				this.$root.$emit('bv::hide::modal', 'modalChangePassword');
			}
		},
		hideModal() {
			this.$root.$emit('bv::hide::modal', 'modalChangePassword');
		},
		onHidden() {
			this.$refs.btnShow.$el.focus();
		},
		signOut() {
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
			this.menu = this.calculateMenu();
			getRouter().push('/login');
		},
		clickBookRoom() {
			if (getRouter().history.current.fullPath !== '/b2b/payment') {
				this.plans = [];
				this.rooms = [];
				const arr = [];
				for (let i = 0; i < this.shopping.length; i += 1) {
					const temp = {};
					temp.id = this.shopping[i].idRoom;
					const temp2 = {};
					temp2.id = this.shopping[i].idplant;
					temp2.quantity = +this.shopping[i].quantities;
					temp.plans = [];
					temp.plans = temp2;
					this.plans.push(temp);
				}
				if (this.plans.length > 1) {
					for (let i = 0; i < this.plans.length; i += 1) {
						arr.push(this.plans[i].id);
					}
					const a = arr.filter((i, e) => arr.indexOf(i) === e);
					for (let i = 0; i < a.length; i += 1) {
						const temp = {};
						temp.id = a[i];
						temp.plans = [];
						this.rooms.push(temp);
					}
					this.rooms.forEach(r => {
						this.plans.forEach(e => {
							if (r.id === e.id) {
								const tmp = {};
								tmp.plans = e.plans;
								r.plans.push(tmp);
							}
						});
					});
				} else {
					for (let index = 0; index < this.plans.length; index += 1) {
						const temp = {};
						temp.id = this.plans[index].id;
						temp.plans = [];
						temp.plans.push(this.plans[index].plans);
						this.rooms.push(temp);
					}
				}
				this.$root.$emit('bv::hide::modal', 'detailCart');
				this.$gateway
					.post(`/v1/ta/lockPlan`, {
						checkinDate: this.$moment(this.$store.getters['searchTemp/search'][1]).format('YYYY-MM-DD'),
						checkoutDate: this.$moment(this.$store.getters['searchTemp/search'][2]).format('YYYY-MM-DD'),
						rooms: this.rooms,
					})
					.then(response => {
						if (response.data.responseCode === 0) {
							getRouter().push('/b2b/payment');
						} else {
							this.$swal({
								type: 'error',
								title: 'Oops...',
								text: 'Something went wrong!',
							}).then(result => {
								if (result.value) {
									this.$store.commit(BuyMutationTypes.SET_BOOKINGS, []);
									window.location.reload(true);
								}
							});
						}
					})
					.catch(error => console.log(error));
			} else {
				this.$root.$emit('bv::hide::modal', 'detailCart');
			}
		},
		clickDetailSearch() {
			if (getRouter().history.current.fullPath === '/b2b/payment') {
				getRouter().push('/b2b/detailSearch');
			}
			this.$root.$emit('bv::hide::modal', 'detailCart');
		},
		Dashboard(name) {
			// this.$router.push({
			// 	name: 'DashBroad',
			// 	params: {
			// 		view: name,
			// 	},
			// });

			this.$store.commit(BuyMutationTypes.SET_CURRENT_DASHBOARD, 'Dashboard');
			if (window.location.pathname === '/b2b/dashbroad') {
				window.location.reload(true);
			}
			this.$router.push('dashbroad');
		},
	},
};
