import Vue from 'vue';
import { UserMutationTypes } from 'store/module/user';
import getRouter from 'router';
import axios from 'axios';
import Vuelidate from 'vuelidate';
import VeeValidate from 'vee-validate';
import Spinner from 'vue-spinkit';
import { RememberMeMutationTypes } from 'store/module/rememberMe';
import VueRecaptcha from 'vue-recaptcha';
import VueCookies from 'vue-cookies';
import { validationMixin } from 'vuelidate';
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators';

Vue.use(VueCookies);
Vue.use(Vuelidate);
Vue.use(VeeValidate);

export default {
	mixins: [validationMixin],
	data() {
		return {
			// form: {
			// 	username: '',
			// 	password: '',
			// 	agentId: '',
			// },
			form: {
				password: null,
				email: null,
			},
			userSaved: false,
			sending: false,
			lastUser: null,
			show: true,
			cloud: '../static/6.png',
			checked: true,
			nameShow: 'eye-slash',
			checkshow: false,
			passwordField: 'password',
			faill: 0,
			flag: false,
			SaveUser: null,
			emailforgot: '',
			captchaResponse: '',
			datacaptcha: false,
			DataCaptcha: '',
			loginForm: {
				recaptchaVerified: false,
				pleaseTickRecaptchaMessage: '',
			},
			active: false,
			emailnotfount: false,
		};
	},
	components: {
		Spinner,
		VueRecaptcha,
	},
	validations: {
		form: {
			password: {
				required,
			},
			email: {
				required,
				email,
			},
		},
	},
	created() {
		const accessToken = this.$store.getters['user/accessToken'];
		if (accessToken) {
			const router = getRouter();
			if (!router.history.current.meta.isAnonymous) {
				this.$store.commit(UserMutationTypes.SET_CURRENT_MENU, 'b2b/dashboard');
				router.push('b2b/dashboard');
			}
		}
		// this.flag = true;
	},
	mounted() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	},
	computed: {
		heightWindow() {
			return `${window.innerHeight}px`;
		},
	},
	methods: {
		// eslint-disable-next-line consistent-return
		getValidationClass(fieldName) {
			const field = this.$v.form[fieldName];

			if (field) {
				return {
					'md-invalid': field.$invalid && field.$dirty,
				};
			}
		},
		clearForm() {
			this.$v.$reset();
			this.form.password = null;
			this.form.email = null;
		},
		saveUser() {
			this.sending = true;

			// Instead of this timeout, here you can call your API
			window.setTimeout(() => {
				this.lastUser = `${this.form.firstName} ${this.form.lastName}`;
				this.userSaved = true;
				this.sending = false;
				this.clearForm();
			}, 1500);
		},
		validateUser() {
			this.$v.$touch();

			if (!this.$v.$invalid) {
				this.saveUser();
			}
		},
		register() {
			getRouter().push('/outside/register');
		},
		// eslint-disable-next-line no-dupe-keys
		validateUser() {
			this.$v.$touch();

			if (!this.$v.$invalid) {
				this.saveUser();
			}
		},
		markRecaptchaAsVerified(response) {
			this.loginForm.pleaseTickRecaptchaMessage = '';
			this.loginForm.recaptchaVerified = true;
		},
		// eslint-disable-next-line consistent-return
		checkIfRecaptchaVerified() {
			if (!this.loginForm.recaptchaVerified) {
				this.loginForm.pleaseTickRecaptchaMessage = 'Please tick recaptcha.';
				return true;
			}
			this.$gateway.post(`/v1/ta/forgetPassword`, { email: this.emailforgot }).then(response => {
				const repons = response.data.responseCode;
				if (repons === 0) {
					this.active = true;
					this.$root.$emit('bv::hide::modal', 'forgotpass');
				} else {
					this.emailnotfount = true;
					this.$root.$emit('bv::hide::modal', 'forgotpass');
				}
			});
		},
		onConfirm() {
			this.emailnotfount = false;
		},
		onCancel() {
			document.body.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0;
			this.emailforgot = '';
		},
		resetRecaptcha() {
			this.$refs.recaptcha.reset();
		},
		forgotpass() {
			this.$root.$emit('bv::show::modal', 'forgotpass');
		},
		cancel() {
			this.emailforgot = '';
			this.$root.$emit('bv::hide::modal', 'forgotpass');
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
			str = str.replace(/\s+/g, '');
			str = str.trim();
			return str;
		},
		ckeck() {
			this.faill = 0;
		},
		Login() {
			this.$validator
				.validateAll()
				.then(response1 => {
					if (response1 === true) {
						axios
							.post('/api/auth/login', {
								value: {
									username: this.form.email,
									password: this.form.password,
								},
								hashed: 'string',
							})
							.then(
								response => {
									this.flag = true;
									if (response.data.status === 'SUCCESS') {
										this.$store.commit(UserMutationTypes.SET_USER_INFO, response.data.value.token);
										this.$store.commit(UserMutationTypes.SET_ROLE, response.data.value.user.role);
										getRouter().push('/b2b/dashboard');
										// if (response.data.responseCode !== 0) {
										// 	this.faill = 1;
										// } else {
										// 	// this.$store.commit(
										// 	// 	UserMutationTypes.SET_CURRENTCY,
										// 	// 	response.data.value.currency,
										// 	// );

										// this.$store.commit(UserMutationTypes.SET_USER_ID, +this.form.agentId);
										this.$store.commit(
											RememberMeMutationTypes.SET_REMEMBER_FULLNAME,
											response.data.value.user.name,
										);
										// 	//this.$store.commit(UserMutationTypes.SET_CURRENT_MENU, '/b2b/avaiSearch');
										// 	getRouter().push('/b2b/dashboard');
										// }
									} else {
										this.emailnotfount = true;
									}
									this.flag = false;
								},
								error => {
									this.errors.add(error.data);
								},
							);
					}
				})
				.catch(e => {
					console.log(e);
				});
		},
		onSubmit(evt) {
			evt.preventDefault();
			alert(JSON.stringify(this.form));
		},
		onReset(evt) {
			evt.preventDefault();
			this.form.email = '';
			this.form.name = '';
			this.form.food = null;
			this.form.checked = [];
			this.show = false;
			this.$nextTick(() => {
				this.show = true;
			});
		},
		ShowPassWord() {
			this.passwordField = this.passwordField === 'password' ? 'text' : 'password';
			this.nameShow = this.nameShow === 'eye-slash' ? 'eye' : 'eye-slash';
		},
	},
};
