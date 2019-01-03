import { validationMixin } from 'vuelidate';
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators';
import DatePicker from 'vue2-datepicker';
import Calendar from 'vue2-slot-calendar';
import DateRangePicker from 'vue2-daterange-picker';
import Datepicker from 'vuejs-datepicker';

const toLower = text => text.toString().toLowerCase();
const searchByName = (items, term) => {
	if (term) {
		return items.filter(item => toLower(item.fullname).includes(toLower(term)));
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
			itemEdit: {
				id: '',
				fullname: '',
				birthday: '',
				gender: 0,
				currentAddress: '',
				wardId: 0,
				phone: '',
				email: '',
				educationLevel: 0,
				specializeId: '',
				languageLevel: 0,
				departmentId: '',
				positionId: '',
				dayInCompany: '',
				active: true,
			},
			itemAdd: {
				id: '',
				fullname: '',
				birthday: '',
				gender: 0,
				currentAddress: '',
				wardId: 0,
				phone: '',
				email: '',
				educationLevel: 0,
				specializeId: '',
				languageLevel: 0,
				departmentId: '',
				positionId: '',
				dayInCompany: '',
				thanhPho: '',
				quanHuyen: '',
				phuongXa: '',
				active: true,
			},
			itemModal: {
				fullname: '',
				id: '',
				departmentName: '',
			},
			modalInfo: {
				fullname: '',
				id: '',
			},
			previewImage: null,
			variantEditUserGentlemen: '',
			variantEditUserLady: '',
			variantEditUserAdmin: '',
			variantEditUserUser: '',
			list: [],
			ListDepartments: [],
			educationLevel: [
				{ value: 0, text: 'Cao đẳng' },
				{ value: 1, text: 'Đại học' },
				{ value: 2, text: 'Thạc sỹ' },
				{ value: 3, text: 'Tiến sỹ' },
				{ value: 4, text: 'Trung cấp' },
			],
			languageLevel: [
				{ value: 0, text: 'English' },
				{ value: 1, text: 'German' },
				{ value: 2, text: 'Japan' },
				{ value: 3, text: 'Chinese' },
				{ value: 4, text: 'Vietnamese' },
				{ value: 5, text: 'French' },
			],
			listthanhpho: [],
			// listquanhuyen: [],
			// listphuongxa: [],
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
	components: {
		DatePicker,
		Calendar,
		DateRangePicker,
		Datepicker,
	},
	computed: {
		listquanhuyen() {
			const arr = [];
			this.$gateway
				.post(`/location/get-district-by-province`, {
					value: {
						code: this.itemAdd.thanhPho,
					},
					hashed: 'string',
				})
				// eslint-disable-next-line consistent-return
				.then(response => {
					const repons = response.data.value;
					if (repons !== null) {
						repons.forEach(element => {
							arr.push(element);
						});
					}
				});
			return arr;
		},
		listphuongxa() {
			const arr = [];
			this.$gateway
				.post(`/location/get-ward-by-district`, {
					value: {
						code: this.itemAdd.quanHuyen,
					},
					hashed: 'string',
				})
				// eslint-disable-next-line consistent-return
				.then(response => {
					const repons = response.data.value;
					if (repons !== null) {
						repons.forEach(element => {
							arr.push(element);
						});
					}
				});
			return arr;
		},
	},
	methods: {
		callApilocation() {
			this.$gateway.get(`/location/get-all-provinces`).then(response => {
				const repons = response.data.value;
				if (repons !== null) {
					repons.forEach(element => {
						this.listthanhpho.push(element);
					});
				}
			});
		},
		creat() {
			this.$gateway
				.post(`/employee/create`, {
					value: {
						id: this.itemAdd.id,
						fullname: this.itemAdd.fullname,
						birthday: this.itemAdd.birthday,
						gender: this.itemAdd.gender,
						currentAddress: this.itemAdd.currentAddress,
						wardId: this.itemAdd.wardId,
						phone: this.itemAdd.phone,
						email: this.itemAdd.email,
						educationLevel: this.itemAdd.educationLevel,
						specializeId: this.itemAdd.specializeId,
						languageLevel: this.itemAdd.languageLevel,
						departmentId: this.itemAdd.departmentId,
						positionId: this.itemAdd.positionId,
						payrollDay: this.itemAdd.payrollDay,
						dayInCompany: this.itemAdd.dayInCompany,
						active: true,
					},
					hashed: 'string',
				})
				.then(response => {
					const repons = response.data.value;
					if (repons !== null) {
						this.ListDepartments = [];
						this.callApiGetAll();
						this.$swal({
							position: 'center',
							type: 'success',
							title: 'Thêm mới thành công thành công',
							showConfirmButton: false,
							timer: 1500,
						});
					}
				});
		},
		update() {
			this.$gateway
				.post(`/employee/update`, {
					value: {
						id: this.itemEdit.id,
						fullname: this.itemEdit.fullname,
						birthday: this.itemEdit.birthday,
						gender: this.itemEdit.gender,
						currentAddress: this.itemEdit.currentAddress,
						wardId: this.itemEdit.wardId,
						phone: this.itemEdit.phone,
						email: this.itemEdit.email,
						educationLevel: this.itemEdit.educationLevel,
						specializeId: this.itemEdit.specializeId,
						languageLevel: this.itemEdit.languageLevel,
						departmentId: this.itemEdit.departmentId,
						positionId: this.itemEdit.positionId,
						payrollDay: this.itemEdit.payrollDay,
						dayInCompany: this.itemEdit.dayInCompany,
						active: this.itemEdit.active,
					},
					hashed: 'string',
				})
				.then(response => {
					const repons = response.data.value;
					if (repons !== null) {
						this.ListDepartments = [];
						this.callApiGetAll();
						this.$swal({
							position: 'center',
							type: 'success',
							title: 'Cập nhật thành công',
							showConfirmButton: false,
							timer: 1500,
						});
					}
				});
		},
		callApiDepartment() {
			this.ListDepartments = [];
			this.$gateway.get(`/department/get-all-departments`).then(response => {
				const repons = response.data.value;
				if (repons !== null) {
					repons.forEach(element => {
						this.ListDepartments.push(element);
					});
				}
			});
		},
		callApiGetAll() {
			this.List = [];
			this.$gateway.get(`/employee/get-all-employees`).then(response => {
				const repons = response.data.value;
				if (repons !== null) {
					repons.forEach(element => {
						this.List.push(element);
					});
					this.searched = this.List;
				}
			});
		},
		confirmDelete() {
			this.$gateway
				.get(`/employee/delete`, {
					value: {
						id: this.itemModal.id,
					},
					hashed: 'string',
				})
				.then(response => {
					const repons = response.data.value;
					if (repons !== null) {
						this.$root.$emit('bv::hide::modal', 'setting');
						this.ListDepartments = [];
						this.callApiGetAll();
						this.$swal({
							position: 'center',
							type: 'success',
							title: 'Xóa thành công',
							showConfirmButton: false,
							timer: 1500,
						});
					}
				});
		},
		modalSetting(item) {
			this.itemModal.fullname = item.fullname;
			this.itemModal.id = item.id;
			this.itemModal.departmentName = item.departmentName;
			this.$root.$emit('bv::show::modal', 'setting');
		},
		uploadImage(e) {
			const image = e.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(image);
			// eslint-disable-next-line no-shadow
			reader.onload = e => {
				this.previewImage = e.target.result;
				console.log(this.previewImage);
			};
		},
		Cancel(modal) {
			this.$root.$emit('bv::hide::modal', modal);
		},
		AddUser() {
			this.callApilocation();
			this.itemAdd.id = '';
			this.itemAdd.fullname = '';
			this.itemAdd.birthday = '';
			this.itemAdd.gender = 0;
			this.itemAdd.currentAddress = '';
			this.itemAdd.wardId = 0;
			this.itemAdd.phone = '';
			this.itemAdd.email = '';
			this.itemAdd.educationLevel = 0;
			this.itemAdd.specializeId = '';
			this.itemAdd.languageLevel = 0;
			this.itemAdd.departmentId = '';
			this.itemAdd.positionId = '';
			this.itemAdd.dayInCompany = '';
			this.itemAdd.thanhPho = '';
			this.itemAdd.quanHuyen = '';
			this.itemAdd.phuongXa = '';
			this.itemAdd.active = true;
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
		genderAddUser(number) {
			this.itemAdd.gender = number;
			if (number === 1) {
				this.variantEditUserGentlemen = 'primary';
				this.variantEditUserLady = 'link';
			}
			if (number === 0) {
				this.variantEditUserGentlemen = 'link';
				this.variantEditUserLady = 'primary';
			}
		},
		genderEditUser(number) {
			this.itemEdit.gender = number;
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
			this.modalInfo.id = items.id;
			this.modalInfo.fullname = items.fullname;
			this.$root.$emit('bv::show::modal', 'info');
			this.selected = items;
			this.itemEdit = items;
			if (items.gender === 0) {
				this.variantEditUserGentlemen = 'link';
				this.variantEditUserLady = 'primary';
			} else {
				this.variantEditUserGentlemen = 'primary';
				this.variantEditUserLady = 'link';
			}
		},
		detail() {
			this.$root.$emit('bv::hide::modal', 'info');
		},
		chamcong() {
			const today = new Date();
			const now = new Date();
			now.setHours(now.getHours() + 8);
			console.log('time', now);
			this.$gateway
				.post(`/timekeeping/create`, {
					value: {
						employeeId: this.modalInfo.id,
						date: this.$moment(today.setDate(today.getDate())).format('DD-MM-YYYY'),
						timeIn: this.$moment(today.setDate(today.getDate())).format('HH:mm:ss'),
						timeOut: this.$moment(now).format('HH:mm:ss'),
					},
					hashed: 'string',
				})
				.then(response => {
					if (response.data.status === 'SUCCESS') {
						this.$root.$emit('bv::hide::modal', 'info');
						this.$swal({
							position: 'center',
							type: 'success',
							title: 'xin cảm ơn',
							showConfirmButton: false,
							timer: 1500,
						});
					} else {
						this.$root.$emit('bv::hide::modal', 'info');
						this.$swal({
							position: 'center',
							type: 'error',
							title: 'đã chấm công. Xin cảm ơn',
							showConfirmButton: false,
							timer: 1500,
						});
					}
				});
		},
		showModalStatus(item) {
			if (item.status === true) {
				this.active = false;
			} else {
				this.active = true;
			}
		},
		searchOnTable() {
			this.searched = searchByName(this.List, this.search);
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
		this.callApiGetAll();
		this.callApiDepartment();
	},
};
