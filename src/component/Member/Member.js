const toLower = text => text.toString().toLowerCase();

const searchByName = (items, term) => {
	if (term) {
		return items.filter(item => toLower(item.username).includes(toLower(term)));
	}

	return items;
};
export default {
	name: 'Member',
	data() {
		return {
			search: null,
			searched: [],
			ListMember: [],
			itemModal: {
				username: '',
			},
			itemEdit: {
				username: '',
				fullname: '',
				phoneNumber: '',
				email: '',
				note: '',
				active: true,
			},
			itemAdd: {
				username: '',
				fullname: '',
				phoneNumber: '',
				email: '',
				note: '',
				type: true,
				password: '',
				confirmPassword: '',
			},
		};
	},
	methods: {
		searchOnTable() {
			this.searched = searchByName(this.ListMember, this.search);
		},
		ModalCreat() {
			this.$root.$emit('bv::show::modal', 'Creat');
		},
		callApiGetAll() {
			this.ListMember = [];
			this.$gateway.get(`/member/get-all-members`).then(response => {
				const repons = response.data.value;
				if (repons !== null) {
					repons.forEach(element => {
						this.ListMember.push(element);
					});
					this.searched = this.ListMember;
				}
			});
		},
		showModalStatus(item) {
			if (item.active === false) {
				this.itemModal.username = item.username;
				this.$root.$emit('bv::show::modal', 'Deactive');
			}
		},
		Cancel(modal) {
			this.callApiGetAll();
			this.$root.$emit('bv::hide::modal', modal);
		},
		Deactive(itemModal) {
			this.$gateway
				.post(`/member/deactive`, {
					value: {
						username: itemModal.username,
					},
					hashed: 'string',
				})
				.then(response => {
					if (response.data.status === 'SUCCESS') {
						this.$root.$emit('bv::hide::modal', 'Deactive');
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
		edit(item) {
			this.itemEdit.username = item.username;
			this.itemEdit.fullname = item.fullname;
			this.itemEdit.email = item.email;
			this.itemEdit.phoneNumber = item.phone;
			this.itemEdit.note = item.note;
			this.itemEdit.active = item.active;
			this.$root.$emit('bv::show::modal', 'Edit');
		},
		CreatUser() {
			if (
				this.itemAdd.username !== '' &&
				this.itemAdd.fullname !== '' &&
				this.phonenumber(this.itemAdd.phoneNumber) === true &&
				this.itemAdd.email !== ''
			) {
				this.$gateway
					.post(`/member/create`, {
						value: {
							username: this.itemAdd.username,
							phone: this.itemAdd.phoneNumber,
							password: this.itemAdd.password,
							confirmPassword: this.itemAdd.confirmPassword,
							email: this.itemAdd.email,
							fullname: this.itemAdd.fullname,
							note: this.itemAdd.note,
							type: 0,
						},
						hashed: 'string',
					})
					.then(response => {
						const repons = response.data.value;
						if (response.data.status === 'SUCCESS') {
							this.$root.$emit('bv::hide::modal', 'Creat');
							this.ListDepartments = [];
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
		EditMember() {
			if (
				this.itemEdit.username !== '' &&
				this.itemEdit.fullname !== '' &&
				this.phonenumber(this.itemEdit.phoneNumber) === true &&
				this.itemEdit.email !== ''
			) {
				this.$gateway
					.post(`/member/update`, {
						value: {
							username: this.itemEdit.username,
							phoneNumber: this.itemEdit.phoneNumber,
							email: this.itemEdit.email,
							fullname: this.itemEdit.fullname,
							note: this.itemEdit.note,
							active: true,
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
		phonenumber(inputtxt) {
			const phoneno = /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/;
			if (inputtxt.match(phoneno)) {
				// this.checkTelephone = true;
				return true;
			}
			// this.checkTelephone = false;
			return false;
		},
	},
	created() {
		this.callApiGetAll();
	},
};
