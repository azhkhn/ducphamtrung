import { BuyMutationTypes } from 'store/module/buy';
import { RememberMeMutationTypes } from 'store/module/rememberMe';
import { UserMutationTypes } from 'store/module/user';
import { SearchTempMutationTypes } from 'store/module/searchTemp';
import getRouter from 'router';

export default {
	name: 'Dashboard',
	data() {
		return {
			user: this.$store.getters['rememberMe/rememberPassword'].fullName,
			menuVisible: false,
			showSidepanel: true,
			currentView: 'ApplyforAccess',
			expandNews: false,
			expandSingle: false,
			itemss: {
				currentPass: '',
				newPass: '',
				cfnewPass: '',
			},
			errorChangePassword: true,
			errorCfPassword: true,
			title: 'Home',
			them: '#2196f3',
		};
	},
	created() {
		// this.callApiDashBoard();
	},
	methods: {
		thems(th){
			this.them = th;
		},
		myinfo() {
			this.$store.commit(BuyMutationTypes.SET_CURRENT_DASHBOARD, 'Profile');
			if (window.location.pathname === '/b2b/dashbroad') {
				window.location.reload(true);
			}
			this.$router.push('dashbroad');
		},
		currentviewPage(component) {
			this.currentView = component;
			this.title = component;
		},
		modalChangePassword() {
			this.errorChangePassword = true;
			this.errorCfPassword = true;
			this.itemss.currentPass = '';
			this.itemss.newPass = '';
			this.itemss.cfnewPass = '';
			this.$root.$emit('bv::show::modal', 'modalChangePassword');
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
			getRouter().push('/login');
		},
		toggleMenu() {
			this.menuVisible = !this.menuVisible;
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

		formatPrice(value) {
			if (this.$store.getters['user/getCurrentcy'] === 'VND') {
				const val = (value / 1).toFixed(0).replace('.', '.');
				return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}
			const val = (value / 1).toFixed(2).replace('.', '.');
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
		change(view) {
			this.$store.commit(BuyMutationTypes.SET_CURRENT, view);
			this.$router.push('/b2b/hotelsofta');
		},
	},
};
