import { validationMixin } from 'vuelidate';
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators';

const toLower = text => text.toString().toLowerCase();
const searchByName = (items, term) => {
	if (term) {
		return items.filter(item => toLower(item.name).includes(toLower(term)));
	}

	return items;
};
export default {
	name: 'HRRecords',
	mixins: [validationMixin],
	data() {
		return {
			single: null,
			singleAdd: null,
			status: true,
			value: null,
			active: false,
			options: [10, 20, 30],
			search: null,
			searched: [],
			selected: [],
			formEdit: {
				firstName: null,
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
			itemAdd: {
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
			itemModal: {
				name: '',
				title: '',
			},
			previewImage: null,
			variantEditUserGentlemen: '',
			variantEditUserLady: '',
			variantEditUserAdmin: '',
			variantEditUserUser: '',
			users: [
				{
					id: 1,
					name: 'Shawna Dubbin',
					email: 'sdubbin0@geocities.com',
					gender: 'Male',
					title: 'Assistant Media Planner',
					status: true,
				},
				{
					id: 2,
					name: 'Odette Demageard',
					email: 'odemageard1@spotify.com',
					gender: 'Female',
					title: 'Account Coordinator',
					status: true,
				},
				{
					id: 3,
					name: 'Vera Taleworth',
					email: 'vtaleworth2@google.ca',
					gender: 'Male',
					title: 'Community Outreach Specialist',
					status: false,
				},
				{
					id: 4,
					name: 'Lonnie Izkovitz',
					email: 'lizkovitz3@youtu.be',
					gender: 'Female',
					title: 'Operator',
					status: true,
				},
				{
					id: 5,
					name: 'Thatcher Stave',
					email: 'tstave4@reference.com',
					gender: 'Male',
					title: 'Software Test Engineer III',
					status: false,
				},
				{
					id: 6,
					name: 'Karim Chipping',
					email: 'kchipping5@scribd.com',
					gender: 'Female',
					title: 'Safety Technician II',
					status: true,
				},
				{
					id: 7,
					name: 'Helge Holyard',
					email: 'hholyard6@howstuffworks.com',
					gender: 'Female',
					title: 'Internal Auditor',
					status: false,
				},
				{
					id: 8,
					name: 'Rod Titterton',
					email: 'rtitterton7@nydailynews.com',
					gender: 'Male',
					title: 'Technical Writer',
					status: false,
				},
				{
					id: 9,
					name: 'Gawen Applewhite',
					email: 'gapplewhite8@reverbnation.com',
					gender: 'Female',
					title: 'GIS Technical Architect',
					status: true,
				},
				{
					id: 10,
					name: 'Nero Mulgrew',
					email: 'nmulgrew9@plala.or.jp',
					gender: 'Female',
					title: 'Staff Scientist',
					status: true,
				},
				{
					id: 11,
					name: 'Cybill Rimington',
					email: 'crimingtona@usnews.com',
					gender: 'Female',
					title: 'Assistant Professor',
					status: false,
				},
				{
					id: 12,
					name: 'Maureene Eggleson',
					email: 'megglesonb@elpais.com',
					gender: 'Male',
					title: 'Recruiting Manager',
					status: false,
				},
				{
					id: 13,
					name: 'Cortney Caulket',
					email: 'ccaulketc@cbsnews.com',
					gender: 'Male',
					title: 'Safety Technician IV',
					status: true,
				},
				{
					id: 14,
					name: 'Selig Swynfen',
					email: 'sswynfend@cpanel.net',
					gender: 'Female',
					title: 'Environmental Specialist',
					status: true,
				},
				{
					id: 15,
					name: 'Ingar Raggles',
					email: 'iragglese@cbc.ca',
					gender: 'Female',
					title: 'VP Sales',
					status: true,
				},
				{
					id: 16,
					name: 'Karmen Mines',
					email: 'kminesf@topsy.com',
					gender: 'Male',
					title: 'Administrative Officer',
					status: true,
				},
				{
					id: 17,
					name: 'Salome Judron',
					email: 'sjudrong@jigsy.com',
					gender: 'Male',
					title: 'Staff Scientist',
					status: true,
				},
				{
					id: 18,
					name: 'Clarinda Marieton',
					email: 'cmarietonh@theatlantic.com',
					gender: 'Male',
					title: 'Paralegal',
					status: true,
				},
				{
					id: 19,
					name: 'Paxon Lotterington',
					email: 'plotteringtoni@netvibes.com',
					gender: 'Female',
					title: 'Marketing Assistant',
					status: true,
				},
				{
					id: 20,
					name: 'Maura Thoms',
					email: 'mthomsj@webeden.co.uk',
					gender: 'Male',
					title: 'Actuary',
					status: false,
				},
			],
		};
	},
	computed: {},
	methods: {
		modalSetting(item) {
			this.itemModal.name = item.name;
			this.itemModal.title = item.title;
			this.$root.$emit('bv::show::modal', 'setting');
		},
		uploadImage(e) {
			const image = e.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(image);
			reader.onload = e => {
				this.previewImage = e.target.result;
				console.log(this.previewImage);
			};
		},
		Cancel(modal) {
			this.$root.$emit('bv::hide::modal', modal);
		},
		AddUser() {
			this.$root.$emit('bv::show::modal', 'addUer');
		},
		resetModal() {
			this.itemAdd.fullName = '';
			this.itemAdd.userName = '';
			this.itemAdd.email = '';
			this.itemAdd.password = '';
			this.itemAdd.cfpassword = '';
			this.itemAdd.status = false;
			this.itemAdd.gender = 0;
			this.itemAdd.mobile = '';
			this.itemAdd.role = 'ROLE_TRAVEL_AGENT_ADMIN';
			this.itemAdd.address = '';
			this.itemAdd.designation = '';
		},
		// eslint-disable-next-line no-shadow
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
		genderEditUser(number) {
			//this.item.gender = number;
			if (number === 1) {
				this.variantEditUserGentlemen = 'primary';
				this.variantEditUserLady = 'link';
			}
			if (number === 0) {
				this.variantEditUserGentlemen = 'link';
				this.variantEditUserLady = 'primary';
			}
		},
		// eslint-disable-next-line consistent-return
		getValidationClass(fieldName) {
			const field = this.$v.formEdit[fieldName];

			if (field) {
				return {
					'md-invalid': field.$invalid && field.$dirty,
				};
			}
		},
		validateUser() {
			this.$v.$touch();
		},
		onSelect(items) {
			this.selected = items;
		},
		showModalStatus(item) {
			if (item.status === true) {
				this.active = false;
			} else {
				this.active = true;
			}
		},
		searchOnTable() {
			this.searched = searchByName(this.users, this.search);
		},
		onConfirm() {
			this.active = false;
			this.value = 'Agreed';
		},
		onCancel() {
			this.active = false;
			this.value = 'Disagreed';
			this.status = true;
		},
	},
	created() {
		this.searched = this.users;
	},
};
