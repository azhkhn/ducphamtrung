// import axios from 'axios';

import Vue from 'vue';
import Switches from 'vue-switches';
import Vuelidate from 'vuelidate';
import VeeValidate from 'vee-validate';
import { RememberMeMutationTypes } from 'store/module/rememberMe';
import { UserMutationTypes } from 'store/module/user';
import { BuyMutationTypes } from 'store/module/buy';
import Spinner from 'vue-spinkit';
// import { VariableNames } from 'data/enum/configNames';
Vue.use(Vuelidate);
Vue.use(VeeValidate);
export default {
	name: 'Profile',
	data() {
		return {
			errorEditAgent: true,
			errorEditDetail: true,
			errorAlertTabEditDetail: false,
			errorAgent: true,
			errorAddUserAgent: true,
			enabled: false,
			changeStatusUserAgent: '',
			statusUserAgent: false,
			lstplace: [],
			placesLang: [],
			placesLangEN: [],
			fields: [
				// { key: 'username', label: this.$t('USERNAME_PROFILE') },
				// { key: 'fullName', label: this.$t('FULL_NAME_PROFILE') },
				// { key: 'mobile', label: this.$t('MOBILE_PROFILE') },
				// { key: 'createdDate', label: this.$t('CREATED_DATE_PROFILE') },
				// { key: 'updatedDate', label: this.$t('UPDATED_DATE_PROFILE') },
				// { key: 'role', label: this.$t('ACCESS_PROFILE') },
				// { key: 'status', label: this.$t('STATUS_PROFILE') },
				// { key: 'action', label: this.$t('ACTION_PROFILE') },
			],
			items: [],
			modalInfo: { title: '', hotelid: '' },
			itemDetail: {
				// agentId: 0,
				businessliscenceNo: '',
				// vi
				agencyName: '',
				addres: '',
				fullName: '',
				// en
				agencyNameEN: '',
				addresEN: '',
				fullNameEN: '',
				//
				email: '',
				mobileno: '',
				website: '',
				cityId: 0,
				countryId: 0,
				locId: 0,
				locations: '',
				country: '',
				city: '',
				zipcode: '',
				telephoneNo: '',
				currency: '',
				skype: '',
			},
			item2: {
				userName: '',
				email: '',
				password: '',
				cfpassword: '',
				fullname: '',
				mobile: '',
				designation: '',
			},
			item: {
				userName: '',
				fullName: '',
				mobile: '',
				createdDate: '',
				updateDate: '',
				role: 'ROLE_TRAVEL_AGENT_ADMIN',
				status: true,
				tittle: '',
				email: '',
				gender: 0,
				password: '',
				cfpassword: '',
				address: '',
				designation: '',
			},
			lstDesignation: [],
			// api locations
			lstCity: [],
			lstCountry: [],
			lstCityEN: [],
			lstCountryEN: [],
			locations: [],
			countries: [],
			cities: [],
			lstCurrency: [],
			lstRole: ['ROLE_TRAVEL_AGENT_ADMIN', 'ROLE_TRAVEL_AGENT_USER'],
			lstRoleUser: ['ROLE_TRAVEL_AGENT_USER'],
			index: '',
			listRes: {},
			listUpdateProfile: {},
			profile: {},
			updateProfile: {},
			userProfile: {},
			usernameAgent: '',
			roleAgent: '',
			getLishUserAgent: [],
			flag: true,
			patt: /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/,
			checkTelephone: true,
			variantAddUserAdmin: 'primary',
			variantAddUserUser: 'link',
			variantAddUserGentlemen: 'link',
			variantAddUserLady: 'primary',
			variantEditUserGentlemen: '',
			variantEditUserLady: '',
			variantEditUserAdmin: '',
			variantEditUserUser: '',
		};
	},
	computed: {
		filterbyCountry() {
			return this.lstCity.filter(loc => loc.parent === this.itemDetail.countryId);
		},
		filterbyCity() {
			return this.placesLang.filter(loc => loc.parent === this.itemDetail.cityId);
		},
		filterbyCountryEN() {
			return this.lstCityEN.filter(loc => loc.parent === this.itemDetail.countryId);
		},
		filterbyCityEN() {
			return this.placesLangEN.filter(loc => loc.parent === this.itemDetail.cityId);
		},
	},
	created() {
		if (this.$store.getters.currentLanguage.code === 'vi') {
			this.fields = [
				{ key: 'username', label: 'Tên tài khoản', class: 'username' },
				{ key: 'fullName', label: 'Tên đầy đủ', class: 'Fullname' },
				{ key: 'mobile', label: 'Điện thoại', class: 'mobile' },
				{ key: 'createdDate', label: 'Ngày tạo', class: 'createdDate' },
				{ key: 'updatedDate', label: 'Ngày cập nhật', class: 'updatedDate' },
				{ key: 'role', label: 'Quyền truy cập', class: 'role' },
				{ key: 'status', label: 'Trạng thái', class: 'status' },
				{ key: 'action', label: 'Hành động', class: 'action' },
			];
		} else {
			this.fields = [
				{ key: 'username', label: 'User name', class: 'username' },
				{ key: 'fullName', label: 'Full name', class: 'Fullname' },
				{ key: 'mobile', label: 'Mobile', class: 'mobile' },
				{ key: 'createdDate', label: 'Created date', class: 'createdDate' },
				{ key: 'updatedDate', label: 'Updated date', class: 'updatedDate' },
				{ key: 'role', label: 'Accessibility', class: 'role' },
				{ key: 'status', label: 'Status', class: 'status' },
				{ key: 'action', label: 'Action', class: 'action' },
			];
		}
		this.agentId = this.$store.getters['user/id'];
		this.usernameAgent = this.$store.getters['user/userName'];
		this.roleAgent = this.$store.getters['user/roles'];
		// this.profile.useragentResponse.agentId = this.$store.getters['user/id'];
		this.callApiProfile();
		this.callChildApi();
		this.flag = true;
	},
	components: {
		Switches,
		Spinner,
	},
	methods: {
		RoleAddUser(item, role) {
			this.item.role = role;
			if (role === 'ROLE_TRAVEL_AGENT_ADMIN') {
				this.variantAddUserAdmin = 'primary';
				this.variantAddUserUser = 'link';
			}
			if (role === 'ROLE_TRAVEL_AGENT_USER') {
				this.variantAddUserAdmin = 'link';
				this.variantAddUserUser = 'primary';
			}
		},
		RoleEditUser(item, role) {
			this.item.role = role;
			if (role === 'ROLE_TRAVEL_AGENT_ADMIN') {
				this.variantEditUserAdmin = 'primary';
				this.variantEditUserUser = 'link';
			}
			if (role === 'ROLE_TRAVEL_AGENT_USER') {
				this.variantEditUserAdmin = 'link';
				this.variantEditUserUser = 'primary';
			}
		},
		genderAddUser(number) {
			// this.item.gender = number;
			if (this.item.gender === 1) {
				this.variantAddUserGentlemen = 'primary';
				this.variantAddUserLady = 'link';
			}
			if (this.item.gender === 0) {
				this.variantAddUserGentlemen = 'link';
				this.variantAddUserLady = 'primary';
			}
		},
		genderEditUser(number) {
			this.item.gender = number;
			if (number === 1) {
				this.variantEditUserGentlemen = 'primary';
				this.variantEditUserLady = 'link';
			}
			if (number === 0) {
				this.variantEditUserGentlemen = 'link';
				this.variantEditUserLady = 'primary';
			}
		},
		validateEmail(email) {
			const at = email.lastIndexOf('@');
			if (at < 1 || at + 1 === email.length) return false;
			if (/(\.{2,})/.test(email)) return false;
			const local = email.substring(0, at);
			const domain = email.substring(at + 1);
			if (local.length < 1 || local.length > 64 || domain.length < 4 || domain.length > 255) return false;
			if (/(^\.|\.$)/.test(local) || /(^\.|\.$)/.test(domain)) return false;
			if (!/^"(.+)"$/.test(local)) {
				if (!/^[-a-zA-Z0-9!#$%*\/?|^{}`~&'+=_\.]*$/.test(local)) return false;
			}
			if (!/^[-a-zA-Z0-9\.]*$/.test(domain) || domain.indexOf('.') === -1) return false;

			return true;
		},
		format(value) {
			let str = value;
			str = str.toLowerCase();
			str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
			str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
			str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
			str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
			str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
			str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
			str = str.replace(/đ/g, 'd');
			str = str.replace(
				/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
				'',
			);
			str = str.replace(/\s+/g, '');
			str = str.trim();
			return str;
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
		callApiProfile() {
			this.$gateway
				.get(`/v1/ta/getProfile`)
				.then(
					response => {
						this.flag = true;
						if (response.data.responseCode === 0) {
							this.profile = response.data.value;
							this.flag = false;
						} else {
							console.log('failed');
							this.flag = false;
						}
						return this.$gateway.get(`/v1/ta/getUserAgent`);
					},
					error => {
						console.log('failed', error);
						if (error.status) {
							this.showAlertLogout();
						}
					},
				)
				.then(
					response => {
						this.flag = true;
						const listGetUserProfile =
							typeof response.data.value !== 'undefined' && Array.isArray(response.data.value)
								? response.data.value
								: [];
						this.items = [];
						if (listGetUserProfile.length > 0) {
							for (let i = 0; i < listGetUserProfile.length; i += 1) {
								const temp = {};
								temp.address = listGetUserProfile[i].address;
								temp.createdDate = listGetUserProfile[i].createdDate;
								temp.designation = listGetUserProfile[i].designation;
								temp.email = listGetUserProfile[i].email;
								temp.fullName = listGetUserProfile[i].fullName;
								temp.gender = listGetUserProfile[i].gender;
								temp.mobile = listGetUserProfile[i].mobile;
								temp.password = listGetUserProfile[i].password;
								// if (listGetUserProfile[i].role === 'ROLE_TRAVEL_AGENT_ADMIN') {
								// 	temp.role = 'Admin';
								// } else {
								// 	temp.role = 'User';
								// }
								temp.role = listGetUserProfile[i].role;
								temp.status = listGetUserProfile[i].status;
								temp.updatedDate = listGetUserProfile[i].updatedDate;
								temp.username = listGetUserProfile[i].username;
								this.items.push(temp);
							}
							if (this.roleAgent[0] === 'ROLE_TRAVEL_AGENT_USER') {
								this.getLishUserAgent = this.items.filter(loc => loc.username === this.usernameAgent);
							} else {
								this.getLishUserAgent = this.items;
							}
						}
						this.flag = false;
					},
					error => {
						console.log('failed', error);
					},
				);
		},
		// call api get Location and currency
		callChildApi() {
			// call api Location
			this.$gateway
				.post(`/v1/ta/getLocation`)
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
						// filter list city
						this.cities = this.locations.filter(loc => loc.locType === 1);
						// Vi
						this.cities.forEach(element => {
							const temp = {};
							element.i18ns.forEach(e => {
								if (e.langCode === 'vi') {
									temp.id = element.id;
									temp.langCode = e.langCode;
									temp.title = e.title;
									temp.parent = element.parent;
								}
							});
							this.lstCity.push(temp);
						});
						// EN
						this.cities.forEach(element => {
							const temp = {};
							element.i18ns.forEach(e => {
								if (e.langCode === 'en') {
									temp.id = element.id;
									temp.langCode = e.langCode;
									temp.title = e.title;
									temp.parent = element.parent;
								}
							});
							this.lstCityEN.push(temp);
						});
						// console.log('over night: ', this.lstCity);
						// filter list country
						this.countries = this.locations.filter(loc => loc.locType === 2 && loc.parent === 0);
						// Vi
						this.countries.forEach(element => {
							const temp = {};
							element.i18ns.forEach(e => {
								if (e.langCode === 'vi') {
									temp.id = element.id;
									temp.langCode = e.langCode;
									temp.title = e.title;
									temp.parent = element.parent;
								}
							});
							this.lstCountry.push(temp);
						});
						// EN
						this.countries.forEach(element => {
							const temp = {};
							element.i18ns.forEach(e => {
								if (e.langCode === 'en') {
									temp.id = element.id;
									temp.langCode = e.langCode;
									temp.title = e.title;
									temp.parent = element.parent;
								}
							});
							this.lstCountryEN.push(temp);
						});
						this.lstplace = this.locations.filter(loc => loc.locType === 0);
						// Vi
						this.lstplace.forEach(element => {
							const temp = {};
							element.i18ns.forEach(e => {
								if (e.langCode === 'vi') {
									temp.id = element.id;
									temp.langCode = e.langCode;
									temp.title = e.title;
									temp.parent = element.parent;
								}
							});
							this.placesLang.push(temp);
						});
						this.lstplace.forEach(element => {
							const temp = {};
							element.i18ns.forEach(e => {
								if (e.langCode === 'en') {
									temp.id = element.id;
									temp.langCode = e.langCode;
									temp.title = e.title;
									temp.parent = element.parent;
								}
							});
							this.placesLangEN.push(temp);
						});
						return this.$gateway.get(`/v1/ta/allCurrency`);
					},
					error => {
						console.log('failed', error);
					},
				)
				.then(
					response => {
						const listRes =
							typeof response.data.value !== 'undefined' && Array.isArray(response.data.value)
								? response.data.value
								: [];
						// console.log('vcl', listRes);
						const listTmp = [];
						if (listRes.length > 0) {
							for (let i = 0; i < listRes.length; i += 1) {
								// match data
								const temp = {};
								temp.code = listRes[i].code;
								// temp.returnCode = listRes[i].returnCode;
								temp.names = listRes[i].names;
								temp.title = listRes[i].title;
								temp.usedForPayment = listRes[i].usedForPayment;
								listTmp.push(temp);
							}
							this.lstCurrency = listTmp;
						}
					},
					error => {
						console.log('failed', error);
					},
				);
		},
		// end call api
		// add user agent
		added(item1) {
			// console.log(item);
			if (
				item1.userName === '' ||
				item1.password === '' ||
				item1.fullName === '' ||
				item1.email === '' ||
				item1.address === '' ||
				(item1.mobile.length > 11 && item1.mobile.length < 10) ||
				item1.cfpassword === '' ||
				item1.designation === '' ||
				this.phonenumber(item1.mobile) === false
			) {
				this.errorAgent = false;
				return;
			}
			if (item1.password !== item1.cfpassword) {
				console.log('vao');
				return;
			}
			this.$gateway
				.post(`/v1/ta/addUserAgent`, {
					// form
					// agentId: +this.agentId,
					username: item1.userName,
					// createdBy: this.$store.getters['user/userName'],
					designation: item1.designation,
					password: item1.password,
					fullname: item1.fullName,
					gender: +item1.gender,
					email: item1.email,
					address: item1.address,
					mobile: item1.mobile,
					// status: true,
					useragentType: item1.role,
				})
				.then(
					response => {
						if (response.data.responseCode === 0) {
							this.$root.$emit('bv::hide::modal', 'editUser');
							this.$root.$emit('bv::hide::modal', 'addUser');
							this.$swal({
								position: 'top-end',
								type: 'success',
								title: this.$t('ADD_USER_PROFILE_SUCCESS'),
								showConfirmButton: false,
								timer: 1500,
							}).then(() => {
								this.callApiProfile();
								// window.location.reload(true);
							});
						} else {
							this.$root.$emit('bv::hide::modal', 'editUser');
							this.$root.$emit('bv::hide::modal', 'addUser');
							this.$swal({
								position: 'top-end',
								type: 'error',
								title: response.data.value,
								showConfirmButton: false,
								timer: 1500,
							});
						}
					},
					error => {
						if (error.status === 400) {
							this.errorAddUserAgent = false;
						}
						console.log('test add user', error);
						// this.errors.push(error);
					},
				);
		},
		addUser(event) {
			this.errorAgent = true;
			this.item.tittle = this.$t('Add_User_PROFILE');
			this.$root.$emit('bv::show::modal', 'addUser', event.target);
		},

		actionStatus() {
			this.$gateway
				.post(`/v1/ta/changeStatus`, {
					username: this.changeStatusUserAgent,
				})
				.then(response => {
					if (response.data.responseCode === 0) {
						this.$root.$emit('bv::hide::modal', 'modalStatus');
						this.$swal({
							position: 'top-end',
							type: 'success',
							title: this.$t('ChangeStatus_Request_Success'),
							showConfirmButton: false,
							timer: 1500,
						}).then(() => {
							this.callApiProfile();
							// window.location.reload(true);
						});
					} else {
						this.$root.$emit('bv::hide::modal', 'modalStatus');
						this.$swal({
							position: 'top-end',
							type: 'error',
							title: this.$t('ChangeStatus_Request_Error'),
							showConfirmButton: false,
							timer: 1500,
						});
					}
				});
		},
		// delete user agent
		deleteUser(row, event) {
			this.item.agentId = row.agentId;
			this.item.username = row.username;
			this.$root.$emit('bv::show::modal', 'deleteUser', event.target);
		},
		deleted(item) {
			// this.items.splice(item, 1);
			this.$gateway
				.post(`/v1/ta/deleteUserAgent`, {
					// form
					// agentId: item.agentId,
					username: item.username,
				})
				.then(
					response => {
						if (response.data.responseCode === 0) {
							this.$root.$emit('bv::hide::modal', 'deleteUser');
							this.$swal({
								position: 'top-end',
								type: 'success',
								title: this.$t('DELETE_SUCCESS'),
								showConfirmButton: false,
								timer: 1500,
							}).then(() => {
								this.callApiProfile();
								// window.location.reload(true);
							});
						} else {
							this.$root.$emit('bv::hide::modal', 'deleteUser');
							this.$swal({
								position: 'top-end',
								type: 'error',
								title: this.$t('DELETE_FAILD'),
								showConfirmButton: false,
								timer: 1500,
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
		// edit user agent
		editUser(row, event) {
			console.log('aajaaj');
			this.errorAgent = true;
			this.item.tittle = this.$t('Edit_User_PROFILE');
			this.item.agentId = row.agentId;
			this.item.userName = row.username;
			this.item.password = row.password;
			this.item.fullName = row.fullName;
			this.item.gender = row.gender;
			if (row.gender === 1) {
				this.variantEditUserGentlemen = 'primary';
				this.variantEditUserLady = 'link';
			}
			if (row.gender === 0) {
				this.variantEditUserGentlemen = 'link';
				this.variantEditUserLady = 'primary';
			}
			this.item.email = row.email;
			this.item.address = row.address;
			this.item.mobile = row.mobile;
			this.item.status = row.status;
			this.item.role = row.role;
			if (row.role === 'Admin') {
				this.variantEditUserAdmin = 'primary';
				this.variantEditUserUser = 'link';
			}
			if (row.role === 'User') {
				this.variantEditUserAdmin = 'link';
				this.variantEditUserUser = 'primary';
			}
			this.item.designation = row.designation;
			this.$root.$emit('bv::show::modal', 'editUser', event.target);
		},
		editUserAgent(item) {
			const changeRole = [];
			changeRole.push(item.role);
			if (item.userName === this.$store.getters['user/userName']) {
				this.$store.commit(UserMutationTypes.SET_ROLE, changeRole);
			}
			if (
				item.password === '' ||
				item.fullName === '' ||
				this.validateEmail(item.email) === false ||
				item.address === '' ||
				// (item.mobile.length > 11 || item.mobile.length < 10) ||
				// item.mobile / 1 <= 0 ||
				item.designation === '' ||
				this.phonenumber(item.mobile) === false
			) {
				this.errorAgent = false;
			} else {
				this.$gateway
					.post(`/v1/ta/updateUserAgent`, {
						// form

						username: item.userName,
						password: item.password,
						fullname: item.fullName,
						gender: item.gender,
						// city: 'string',
						// country: 'string',
						designation: item.designation,
						email: item.email,
						address: item.address,
						mobile: item.mobile,
						status: item.status,
						updatedBy: this.$store.getters['user/userName'],
						useragentType: item.role,
					})
					.then(
						response => {
							if (response.data.responseCode === 0) {
								console.log('ahihihi1', response.data.value);
								this.$swal({
									position: 'top-end',
									type: 'success',
									title: this.$t('Update_Success'),
									showConfirmButton: false,
									timer: 1500,
								}).then(() => {
									this.callApiProfile();
									// window.location.reload(true);
								});

								// window.location.reload(true);
							} else {
								console.log('ahihihi2', response.data.value);
								this.$swal({
									position: 'top-end',
									type: 'error',
									title: response.data.value,
									showConfirmButton: false,
									timer: 1500,
								}).then(() => {
									// window.location.reload(true);
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
				this.$root.$emit('bv::hide::modal', 'editUser');
			}
		},
		// edit director Agent
		editDirectorAgent(event) {
			this.item2.userName = this.profile.useragentResponse.username;
			this.item2.email = this.profile.useragentResponse.email;
			this.item2.password = this.profile.useragentResponse.password;
			this.item2.fullname = this.profile.useragentResponse.fullname;
			this.item2.mobile = this.profile.useragentResponse.mobile;
			this.item2.designation = this.profile.useragentResponse.designation;
			this.$root.$emit('bv::show::modal', 'editProfile', event.target);
		},
		isNumber(evt) {
			evt = evt || window.event;
			const charCode = evt.which ? evt.which : evt.keyCode;
			if (charCode !== 43) {
				evt.preventDefault();
			} else {
				return true;
			}
		},
		phonenumber(inputtxt) {
			const phoneno = /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/;
			if (inputtxt.match(phoneno)) {
				this.checkTelephone = true;
				return true;
			}
			this.checkTelephone = false;
			return false;
		},
		confirmDirectorAgent(item2) {
			// this.phonenumber(item2.mobile);
			if (
				this.validateEmail(item2.email) === false ||
				this.item2.fullname === '' ||
				this.item2.designation === '' ||
				this.phonenumber(item2.mobile) === false
			) {
				this.errorEditAgent = false;
			} else {
				this.$gateway
					.post(`/v1/ta/updateUserProfile`, {
						// form
						agentId: +this.agentId,
						designation: item2.designation,
						langCode: this.$store.getters.currentLanguage.code,
						username: this.$store.getters['user/userName'],
						email: item2.email,
						password: this.profile.useragentResponse.password,
						fullname: item2.fullname,
						mobile: item2.mobile,
					})
					.then(
						response1 => {
							if (response1.data.responseCode === 0) {
								this.$root.$emit('bv::hide::modal', 'editProfile');
								this.$swal({
									position: 'top-end',
									type: 'success',
									title: this.$t('Update_Success'),
									showConfirmButton: false,
									timer: 1500,
								}).then(() => {
									this.$store.commit(RememberMeMutationTypes.SET_REMEMBER_FULLNAME, item2.fullname);
									this.callApiProfile();
								});
								// window.location.reload(true);
							} else {
								this.$root.$emit('bv::hide::modal', 'editProfile');
								this.$swal({
									position: 'top-end',
									type: 'error',
									title: response1.data.value,
									showConfirmButton: false,
									timer: 1500,
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
			}
		},
		// edit profile details this.$store.getters.currentLanguage.code
		detail() {
			this.itemDetail.agentId = this.profile.agentId;
			if (this.profile.modelI18nProfiles.length > 0) {
				for (let i = 0; i < this.profile.modelI18nProfiles.length; i += 1) {
					if (this.profile.modelI18nProfiles[i].langCode === 'vi') {
						this.itemDetail.agencyName = this.profile.modelI18nProfiles[i].hotelName;
						this.itemDetail.addres = this.profile.modelI18nProfiles[i].address;
						this.itemDetail.fullName = this.profile.modelI18nProfiles[i].fullName;
					} else if (this.profile.modelI18nProfiles[i].langCode === 'en') {
						this.itemDetail.agencyNameEN = this.profile.modelI18nProfiles[i].hotelName;
						this.itemDetail.addresEN = this.profile.modelI18nProfiles[i].address;
						this.itemDetail.fullNameEN = this.profile.modelI18nProfiles[i].fullName;
					}
				}
			} else {
				// vi
				this.itemDetail.agencyName = '';
				this.itemDetail.addres = '';
				this.itemDetail.fullName = '';
				this.itemDetail.agencyNameEN = '';
				this.itemDetail.addresEN = '';
				this.itemDetail.fullNameEN = '';
				// en
			}
			this.itemDetail.cityId = this.profile.cityId;
			this.itemDetail.countryId = this.profile.countryId;
			this.itemDetail.locId = this.profile.locId;
			this.itemDetail.email = this.profile.email;
			this.itemDetail.mobileno = this.profile.mobileno;
			this.itemDetail.website = this.profile.website;
			this.itemDetail.zipcode = this.profile.zipcode;
			this.itemDetail.telephoneNo = this.profile.telephoneNo;
			this.itemDetail.currency = this.profile.currency;
			this.itemDetail.skype = this.profile.skype;
			this.errorAlertTabEditDetail = false;
			this.$root.$emit('bv::show::modal', 'profileDetail');
		},
		editProfileDetail(item2) {
			if (
				this.itemDetail.agencyName === '' ||
				this.itemDetail.addres === '' ||
				this.itemDetail.agencyNameEN === '' ||
				this.itemDetail.addresEN === ''
			) {
				this.errorAlertTabEditDetail = true;
			}
			const detailsI18n = [];
			const objEditDetailVi = {};
			objEditDetailVi.agencyName = this.itemDetail.agencyName;
			objEditDetailVi.address = this.itemDetail.addres;
			objEditDetailVi.langCode = 'vi';
			const objEditDetailEn = {};
			objEditDetailEn.agencyName = this.itemDetail.agencyNameEN;
			objEditDetailEn.address = this.itemDetail.addresEN;
			objEditDetailEn.langCode = 'en';
			detailsI18n.push(objEditDetailVi);
			detailsI18n.push(objEditDetailEn);
			if (
				this.itemDetail.city === 0 ||
				this.itemDetail.country === 0 ||
				this.validateEmail(this.itemDetail.email) === false ||
				this.itemDetail.zipcode === '' ||
				this.itemDetail.mobileno === '' ||
				this.itemDetail.telephoneNo === '' ||
				this.itemDetail.currency === '' ||
				this.itemDetail.agencyName === '' ||
				this.itemDetail.addres === '' ||
				this.itemDetail.agencyNameEN === '' ||
				this.itemDetail.addresEN === '' ||
				this.phonenumber(this.itemDetail.mobileno) === false ||
				this.phonenumber(this.itemDetail.telephoneNo) === false
			) {
				this.errorEditDetail = false;
			} else {
				this.$gateway
					.post(`/v1/ta/updateProfile`, {
						// agentId: +item2.agentId,
						businessliscenceNo: '',
						currency: item2.currency,
						detailsI18nInfos: detailsI18n,
						locId: item2.locId,
						mobileno: item2.mobileno,
						skype: item2.skype,
						telephoneNo: item2.telephoneNo,
						website: item2.website,
						zipcode: item2.zipcode,
						email: item2.email,
					})
					.then(
						response => {
							if (response.data.responseCode === 0) {
								this.$root.$emit('bv::hide::modal', 'profileDetail');
								this.$swal({
									position: 'top-end',
									type: 'success',
									title: this.$t('Update_Success'),
									showConfirmButton: false,
									timer: 1500,
								}).then(() => {
									this.callApiProfile();
									// window.location.reload(true);
								});
								// window.location.reload(true);
							} else {
								// console.log('ahihihi2', response.data.value);
								this.$root.$emit('bv::hide::modal', 'profileDetail');
								this.$swal({
									position: 'top-end',
									type: 'error',
									title: response.data.value,
									showConfirmButton: false,
									timer: 1500,
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
			}
		},
		showModalStatus(row, status) {
			this.statusUserAgent = status;
			this.changeStatusUserAgent = row;
			this.$root.$emit('bv::show::modal', 'modalStatus');
		},
		// cacel delete

		hideModal(modal) {
			this.$root.$emit('bv::hide::modal', modal);
			this.callApiProfile();
		},
		// cancel change status
		hideModalChangeStatus(modal) {
			this.$root.$emit('bv::hide::modal', modal);
			this.callApiProfile();
		},

		tesst(event) {
			console.log('info');
			this.modalInfo.title = '1';
			// this.modalInfo.hotelid = JSON.stringify(item, null, 2);
			this.modalInfo.hotelid = '2';
			this.$root.$emit('bv::show::modal', 'modalInfo', event.target);
		},
		resetModal() {
			this.item.fullName = '';
			this.item.userName = '';
			this.item.email = '';
			this.item.password = '';
			this.item.cfpassword = '';
			this.item.status = false;
			this.item.gender = 0;
			this.item.mobile = '';
			this.item.role = 'ROLE_TRAVEL_AGENT_ADMIN';
			this.item.address = '';
			this.item.designation = '';
		},
		showModal() {
			this.$refs.myModalRef.show();
		},
	},
};
