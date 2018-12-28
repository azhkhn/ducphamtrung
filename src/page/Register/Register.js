import getRouter from 'router';
import axios from 'axios';
// import { required, sameAs, minLength } from 'vuelidate/lib/validators';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VeeValidate from 'vee-validate';
// import { CONFIG_MANAGER } from 'data/Injectables';
// import { VariableNames } from 'data/enum/configNames';

Vue.use(Vuelidate);
Vue.use(VeeValidate);
export default {
	name: 'Register',
	data() {
		return {
			active: 'first',
			first: false,
			second: false,
			third: false,
			secondStepError: null,

			checked: '',
			showModal: false,
			form: {
				copyTravel: '',
				emailadress: '',
				travelAgent: '',
				address: '',
				website: '',
				country: '',
				city: '',
				locationID: '',
				zipcode: '',
				name: '',
				mobileno: '',
				telephoneno: '',
				email: '',
				confimaddressemail: '',
				business: '',
				username: '',
				skypeid: '',
				designation: '',
				currency: '',
			},
			file: [],
			password: '',
			confirmpassword: '',
			show: true,
			// list city
			cities: [],
			lstCity: [],
			// list country
			countries: [],
			getCurrency: [],
			lstCountry: [],
			locationType: [],
			lstLocation: [],
			lstCurrency: [],
			lstDesignation: [],
			dismissSecs: 5,
			dismissCountDown: 0,
			showDismissibleAlert: false,
			test: '',
			locations: [],
			filterLocations: [],
		};
	},
	computed: {
		filterbyCountry() {
			return this.lstCity.filter(loc => loc.parent === this.form.country);
		},
		filterbyCity() {
			return this.lstLocation.filter(loc => loc.parent === this.form.city);
		},
	},
	created() {
		// const configManager = getValue(CONFIG_MANAGER);
		this.test = `${this.$root.$versionRoot}uploadFile/`;
		this.callApiRegister();
	},

	methods: {
		setDone(id, index) {
			this[id] = true;

			if (index) {
				this.active = index;
			}
		},
		setDone2(id, index) {
			this[id] = true;

			this.secondStepError = null;

			if (index) {
				this.active = index;
			}
		},
		setBack(id, index) {
			this[id] = true;

			this.secondStepError = null;

			if (index) {
				this.active = index;
			}
			if (
				// eslint-disable-next-line no-undef
				errors.has('travelAgent') ||
				form.travelAgent === '' ||
				errors.has('business') ||
				form.business === '' ||
				errors.has('telephoneno') ||
				form.telephoneno === '' ||
				errors.has('emailAgent') ||
				form.email === '' ||
				errors.has('country') ||
				form.country === '' ||
				errors.has('city') ||
				form.city === '' ||
				errors.has('location') ||
				form.locationID === '' ||
				errors.has('address') ||
				form.address === '' ||
				errors.has('zipcode') ||
				form.zipcode === '' ||
				errors.has('currency') ||
				form.currency === ''
			// eslint-disable-next-line no-empty
			) {
			}
		},
		setBack1(id, index) {
			this[id] = true;

			// this.secondStepError = null;

			if (index) {
				this.active = index;
			}
			if (
				this.errors.has('travelAgent') ||
				this.form.travelAgent === '' ||
				this.errors.has('business') ||
				this.form.business === '' ||
				this.errors.has('telephoneno') ||
				this.form.telephoneno === '' ||
				this.errors.has('emailAgent') ||
				this.form.email === '' ||
				this.errors.has('country') ||
				this.form.country === '' ||
				this.errors.has('city') ||
				this.form.city === '' ||
				this.errors.has('location') ||
				this.form.locationID === '' ||
				this.errors.has('address') ||
				this.form.address === '' ||
				this.errors.has('zipcode') ||
				this.form.zipcode === '' ||
				this.errors.has('currency') ||
				this.form.currency === ''
			) {
				this.secondStepError = 'This is an error!';
			}
		},
		setBack2(id, index) {
			this[id] = true;

			this.thircondStepError = null;

			if (index) {
				this.active = index;
			}
			if (
				this.errors.has('username') ||
				this.form.username === '' ||
				this.errors.has('password') ||
				this.form.password === '' ||
				this.errors.has('confirmpassword') ||
				this.confirmpassword === ''
			) {
				this.thircondStepError = 'This is an error!';
			}
		},
		routerLogin() {
			getRouter().push('/login');
		},
		callApiRegister() {
			// call api Location
			axios
				.post(`/api/v1/ta/getLocation`)
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
						// this.cities = this.locations.filter(loc => loc.locType === 1);
						// this.cities.forEach(element => {
						// 	for (let i = 0; i < element.i18ns.length; i += 1) {
						// 		const temp = {};
						// 		temp.id = element.id;
						// 		temp.langCode = element.i18ns[i].langCode;
						// 		temp.title = element.i18ns[i].title;
						// 		this.lstCity.push(temp);
						// 	}
						// });
						// filter list city
						this.cities = this.locations.filter(loc => loc.locType === 1);
						this.cities.forEach(element => {
							const temp = {};
							element.i18ns.forEach(e => {
								if (e.langCode === this.$store.getters.currentLanguage.code) {
									temp.id = element.id;
									temp.langCode = e.langCode;
									temp.parent = element.parent;
									temp.title = e.title;
								}
							});
							this.lstCity.push(temp);
						});
						// filter list country
						this.countries = this.locations.filter(loc => loc.locType === 2 && loc.parent === 0);
						this.countries.forEach(element => {
							const temp = {};
							element.i18ns.forEach(e => {
								if (e.langCode === this.$store.getters.currentLanguage.code) {
									temp.id = element.id;
									temp.langCode = e.langCode;
									temp.parent = element.parent;
									temp.title = e.title;
								}
							});
							this.lstCountry.push(temp);
						});
						// filter list location
						this.locationType = this.locations.filter(loc => loc.locType === 0);
						this.locationType.forEach(element => {
							const temp = {};
							element.i18ns.forEach(e => {
								if (e.langCode === this.$store.getters.currentLanguage.code) {
									temp.id = element.id;
									temp.langCode = e.langCode;
									temp.parent = element.parent;
									temp.title = e.title;
								}
							});
							this.lstLocation.push(temp);
						});

						return axios.get(`/api/v1/ta/allCurrency`);
					},
					error => {
						console.log('failed', error);
					},
				)
				.then(response => {
					const listRes =
						typeof response.data.value !== 'undefined' && Array.isArray(response.data.value)
							? response.data.value
							: [];
					const listTmp = [];
					if (listRes.length > 0) {
						for (let i = 0; i < listRes.length; i += 1) {
							// match data
							const temp = {};
							temp.code = listRes[i].code;
							temp.symbol = listRes[i].symbol;
							temp.usedForPayment = listRes[i].usedForPayment;
							temp.names = listRes[i].currencyI18nModels;
							listTmp.push(temp);
						}
						this.getCurrency = listTmp;
						this.getCurrency.forEach(element => {
							for (let i = 0; i < element.names.length; i += 1) {
								const temp = {};
								temp.code = element.code;
								if (element.names[i].langCode === this.$store.getters.currentLanguage.code) {
									temp.langCode = element.names[i].langCode;
									temp.title = element.names[i].title;
									this.lstCurrency.push(temp);
								}
							}
						});
					}
				});
		},
		submitFile() {
			const formData = new FormData();
			// for( var i = 0; i < this.copyTravel.length; i++ ){
			// 	let file = this.copyTravel[i];

			// 	formData.append('files[' + i + ']', file);
			//   }
			formData.append('filesTest', this.copyTravel);
			// console.log('formData:', formData);
			// console.log('test:', this.copyTravel);

			axios
				.post('/static/uploadFile/', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
				.then(() => {
					console.log('SUCCESS!!');
				})
				.catch(() => {
					console.log('FAILURE!!');
				});
		},
		countDownChanged(dismissCountDown) {
			this.dismissCountDown = dismissCountDown;
		},
		showAlert() {
			this.dismissCountDown = this.dismissSecs;
		},
		handleFilesUpload() {
			this.copyTravel = this.$refs.filesTest.files[0];
		},
		updateFile(file) {
			this.file = file;
		},
		previewFiles() {
			this.files = this.$refs.myFiles.files;
		},
		// Register() {
		// 	axios.post('/api/users/signinTA', this.form).then(
		// 		response => {
		// 			console.log(response.data);
		// 			getRouter().push('/');
		// 		},
		// 		error => {
		// 			console.log('failed', error);
		// 			this.errors.push(error);
		// 		},
		// 	);
		// },
		// showModal() {
		// 	this.$refs.myModalRef.show();
		// },
		// hideModal() {
		// 	this.$refs.myModalRef.hide();
		// },
		openModal() {
			this.showModal = true;
		},
		// getErrorMessage(e) {
		// 	if (e.ModelState) {
		// 		for (const idx in e.ModelState) {
		// 			return e.ModelState[idx][0];
		// 		}
		// 	}
		// 	return e.Message;
		// },
		onSubmit(evt) {
			evt.preventDefault();
			// alert(JSON.stringify(this.form));
		},
		onReset(evt) {
			evt.preventDefault();
			/* Reset our form values */
			this.form.travelAgent = '';
			this.form.address = '';
			this.form.website = '';
			this.form.country = '';
			this.form.city = '';
			this.form.zipcode = '';
			this.form.name = '';
			this.form.mobileno = '';
			this.form.locationID = '';
			this.form.telephoneno = '';
			this.form.email = '';
			this.form.confimaddressemail = '';
			this.form.currency = '';
			this.form.designation = '';
			this.form.skypeid = '';
			this.form.business = '';
			this.form.username = '';
			this.form.password = '';
			this.form.confirmpassword = '';
			this.form.copyTravel = '';
			/* Trick to reset/clear native browser form validation state */
			this.show = false;
			this.$nextTick(() => {
				this.show = true;
			});
		},
		validateBeforeSubmit(evt) {
			evt.preventDefault();
			const formData = new FormData();
			const file = this.files;
			formData.append('copyTravel', file);
			// append string
			// formData.append('foo', 'bar');

			// append Blob/File object
			// formData.append('pic', fileInput, 'mypic.jpg');
			this.$validator
				.validateAll()
				.then(response => {
					// Validation success if response === true
					if (response === true) {
						this.$loading.startLoading('registering user');
						axios
							.post('/api/v1/ta/register', {
								// formData,
								// travelagentname: this.form.travelAgent,
								address: this.form.address,
								businessLicenceNo: this.form.business,
								designation: this.form.designation,
								// cityId: this.form.city,
								// countryId: this.form.country,
								email: this.form.email,
								fullName: this.form.name,
								langCode: this.$store.getters.currentLanguage.code,
								locId: this.form.locationID,
								mobileNo: this.form.mobileno,
								password: this.form.password,
								prefCurrency: this.form.currency,
								skype: this.form.skypeid,
								taLicenceLink: '',
								telephoneNo: this.form.telephoneno,
								travelagencyName: this.form.travelAgent,
								username: this.form.username,
								website: this.form.website,
								zipCode: this.form.zipcode,
							})
							.then(
								response1 => {
									const a = response1.data.value.substring(0, response1.data.value.length);
									const b = 'Đăng kí thành công';
									if (a.length === b.length) {
										this.$swal({
											position: 'top-end',
											type: 'success',
											title: this.$t('REGISTER_SUCCESS'),
											showConfirmButton: false,
											timer: 3000,
										}).then(() => {
											getRouter().push('/login');
										});
									} else {
										this.$swal({
											position: 'top-end',
											type: 'error',
											title: this.$t('REGISTER_ERROR'),
											showConfirmButton: false,
											timer: 3000,
										});
									}
								},
								error => {
									console.log(error);
									this.showDismissibleAlert = false;
									this.errors.add('email', error.data);
								},
							)
							.finally(() => {
								this.$loading.endLoading('registering user');
							});
					}
				})
				.catch(e => {
					// Catch errors
					console.log(e);
				});
		},
	},
};
