import { required, sameAs, minLength } from 'vuelidate/lib/validators';
import Vue from 'vue';
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);
export default {
	name: 'Test2',
	data() {
		return {
			form: {
				travelAgent: '',
				address: '',
				website: '',
				country: '',
				city: '',
				zipcode: '',
				name: '',
				mobileno: '',
				telephoneno: '',
				email: '',
				confimaddressemail: '',
				currency: '',
				designation: '',
				skypeid: '',
				business: '',
				username: '',

				copyTravel: '',
			},
			password: '',
			confirmpassword: '',
			show: true,
			lstCity: [
				{
					id: '9',
					name: '19',
				},
			],
			lstCountry: [],
			lstCurrency: [],
			lstDesignation: [],
			name: '',
		};
	},
	validations: {
		password: {
			required,
			minLength: minLength(6),
		},
		confirmpassword: {
			sameAsPassword: sameAs('password'),
		},
	},
	computed: {
		nameState() {
			return this.name.length > 2 ? true : false;
		},
	},
};
