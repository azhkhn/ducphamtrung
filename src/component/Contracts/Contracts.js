const toLower = text => text.toString().toLowerCase();

const searchByName = (items, term) => {
	if (term) {
		return items.filter(item => toLower(item.name).includes(toLower(term)));
	}

	return items;
};
export default {
	name: 'Contracts',
	data() {
		return {
			search: null,
			searched: [],
			ListContract: [],
			itemModal: {
				name: '',
				id: '',
			},
			itemEdit: {
				id: '',
				name: '',
				note: '',
				contractTypeId: '',
				time: 0,
				active: true,
				salaryFactor: 0,
			},
			itemAdd: {
				id: '',
				name: '',
				note: '',
				contractTypeId: '',
				time: 0,
				active: true,
				salaryFactor: 0,
			},
		};
	},
	methods: {
		searchOnTable() {
			this.searched = searchByName(this.ListContract, this.search);
		},
		ModalCreat() {
			this.itemAdd.id = '';
			this.itemAdd.name = '';
			this.itemAdd.note = '';
			this.itemAdd.contractTypeId = '';
			this.itemAdd.time = '';
			this.itemAdd.active = true;
			this.itemAdd.salaryFactor = 0;
			this.$root.$emit('bv::show::modal', 'Creat');
		},
		CreatContract() {
			if (
				this.itemAdd.id !== '' &&
				this.itemAdd.name !== '' &&
				this.itemAdd.time !== '' &&
				this.itemAdd.salaryFactor / 1 >= 0 &&
				this.itemAdd.contractTypeId !== ''
			) {
				this.$gateway
					.post(`/contract/create`, {
						value: {
							id: this.itemEdit.id,
							name: this.itemEdit.name,
							note: this.itemEdit.note,
							contractTypeId: this.itemEdit.contractTypeId,
							time: this.itemEdit.time,
							active: this.itemEdit.active,
							salaryFactor: this.itemEdit.salaryFactor,
						},
						hashed: 'string',
					})
					.then(response => {
						if (response.data.status === 'SUCCESS') {
							this.$root.$emit('bv::hide::modal', 'Creat');
							this.ListContract = [];
							this.callApigetAll();
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
		callApigetAll() {
			this.ListContract = [];
			this.$gateway.get(`/contract/get-all-contracts`).then(response => {
				const repons = response.data.value;
				if (repons !== null) {
					repons.forEach(element => {
						this.ListContract.push(element);
					});
					this.searched = this.ListContract;
				}
			});
		},
		modalSetting(item) {
			this.itemModal.name = item.name;
			this.itemModal.id = item.id;
			this.$root.$emit('bv::show::modal', 'Delete');
		},
		Delete(item) {
			this.$gateway
				.post(`/contract/delete`, {
					value: {
						id: item.id,
					},
					hashed: 'string',
				})
				.then(response => {
					const repons = response.data.value;
					if (response.data.status === 'SUCCESS') {
						this.$root.$emit('bv::hide::modal', 'Delete');
						this.ListContract = [];
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
		edit(item) {
			this.itemEdit.id = item.id;
			this.itemEdit.name = item.name;
			this.itemEdit.note = item.note;
			this.itemEdit.contractTypeId = item.contractTypeId;
			this.itemEdit.time = item.time;
			this.itemEdit.active = item.active;
			this.itemEdit.salaryFactor = item.salaryFactor;
			this.$root.$emit('bv::show::modal', 'Edit');
		},
		EditContract() {
			if (this.itemEdit.name !== '' && this.itemEdit.time !== '' && this.itemEdit.salaryFactor / 1 >= 0) {
				this.$gateway
					.post(`/contract/update`, {
						value: {
							id: this.itemEdit.id,
							name: this.itemEdit.name,
							note: this.itemEdit.note,
							contractTypeId: this.itemEdit.contractTypeId,
							time: this.itemEdit.time,
							active: this.itemEdit.active,
							salaryFactor: this.itemEdit.salaryFactor,
						},
						hashed: 'string',
					})
					.then(response => {
						const repons = response.data.value;
						if (response.data.status === 'SUCCESS') {
							this.$root.$emit('bv::hide::modal', 'Edit');
							this.ListContract = [];
							this.callApigetAll();
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
	},
	created() {
		this.callApigetAll();
	},
};
