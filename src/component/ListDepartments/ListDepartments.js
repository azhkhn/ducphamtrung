import sha from 'sha.js';
import VueSweetalert2 from 'vue-sweetalert2';

const toLower = text => text.toString().toLowerCase();

const searchByName = (items, term) => {
	if (term) {
		return items.filter(item => toLower(item.name).includes(toLower(term)));
	}

	return items;
};
export default {
	name: 'ListDepartments',
	data() {
		return {
			search: null,
			currentPage: 1,
			perPage: 1,
			totalRows: 0,
			searched: [],
			ListDepartments: [],
			item: {
				Id: '',
				Name: '',
				Sdt: '',
				status: true,
			},
			itemEdit: {
				Id: '',
				Name: '',
				Sdt: '',
				status: true,
			},
			itemModal: {
				name: '',
				id: '',
			},
		};
	},
	components: {
		sha,
		VueSweetalert2,
	},
	methods: {
		searchOnTable() {
			this.searched = searchByName(this.ListDepartments, this.search);
		},
		callApiGetAll() {
			this.ListDepartments = [];
			this.$gateway.get(`/department/get-all-departments`).then(response => {
				const repons = response.data.value;
				if (repons !== null) {
					repons.forEach(element => {
						this.ListDepartments.push(element);
					});
					this.searched = this.ListDepartments;
					this.totalRows = this.ListDepartments.length;
				}
			});
		},
		ModalCreat() {
			this.item.Id = '';
			this.item.Name = '';
			this.item.Sdt = '';
			this.item.status = true;
			this.$root.$emit('bv::show::modal', 'Creat');
		},
		phonenumber(inputtxt) {
			const phoneno = /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/;
			if (inputtxt.match(phoneno)) {
				// this.checkTelephone = true;
				return true;
			}
			// this.checkTelephone = false;
			return false;
		},
		creat() {
			if (this.item.Id !== '' && this.item.Name !== '' && this.phonenumber(this.item.Sdt) === true) {
				this.$gateway
					.post(`/department/create`, {
						value: {
							id: this.item.Id,
							phoneNumber: this.item.Sdt,
							name: this.item.Name,
							active: true,
						},
						hashed: 'string',
					})
					.then(response => {
						const repons = response.data.value;
						if (response.data.status === 'SUCCESS') {
							this.$root.$emit('bv::hide::modal', 'Creat');
							this.callApiGetAll();
							this.$swal({
								position: 'center',
								type: 'success',
								title: 'Thêm mới thành công',
								showConfirmButton: false,
								timer: 1500,
							});
						}
					});
			}
		},
		edit(item) {
			this.itemEdit.Id = item.id;
			this.itemEdit.Name = item.name;
			this.itemEdit.Sdt = item.phoneNumber;
			this.itemEdit.status = item.active;
			this.$root.$emit('bv::show::modal', 'Edit');
		},
		EditDepartment() {
			if (this.itemEdit.Id !== '' && this.itemEdit.Name !== '' && this.phonenumber(this.itemEdit.Sdt) === true) {
				this.$gateway
					.post(`/department/update`, {
						value: {
							id: this.itemEdit.Id,
							phoneNumber: this.itemEdit.Sdt,
							name: this.itemEdit.Name,
							active: this.itemEdit.status,
						},
						hashed: 'string',
					})
					.then(response => {
						const repons = response.data.value;
						if (response.data.status === 'SUCCESS') {
							this.$root.$emit('bv::hide::modal', 'Edit');
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
			}
		},
		modalSetting(item) {
			this.itemModal.name = item.name;
			this.itemModal.id = item.id;
			this.$root.$emit('bv::show::modal', 'Delete');
		},
		Delete(item) {
			this.$gateway
				.post(`/department/delete`, {
					value: {
						id: item.id,
					},
					hashed: 'string',
				})
				.then(response => {
					const repons = response.data.value;
					if (response.data.status === 'SUCCESS') {
						this.$root.$emit('bv::hide::modal', 'Delete');
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
		Cancel(modal) {
			this.$root.$emit('bv::hide::modal', modal);
		},
	},
	computed: {},
	created() {
		this.callApiGetAll();
	},
};
