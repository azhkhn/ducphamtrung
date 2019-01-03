const toLower = text => text.toString().toLowerCase();

const searchByName = (items, term) => {
	if (term) {
		return items.filter(item => toLower(item.username).includes(toLower(term)));
	}

	return items;
};
import DatePicker from 'vue2-datepicker';
import Calendar from 'vue2-slot-calendar';
import DateRangePicker from 'vue2-daterange-picker';
import Datepicker from 'vuejs-datepicker';

export default {
	name: 'Rewwards',
	data() {
		return {
			search: null,
			searched: [],
			ListRewards: [],
			itemModal: {
				id: '',
				title: '',
			},
			itemEdit: {
				id: '',
				dicisionNo: '',
				effectiveDate: '',
				title: '',
				rewardAndDisciplineMethodId: '',
				amount: 0,
				percentReward: 0,
				signDate: '',
				signBy: '',
				desciption: '',
			},
			itemAdd: {
				id: '',
				dicisionNo: '',
				effectiveDate: '',
				title: '',
				rewardAndDisciplineMethodId: '',
				amount: 0,
				percentReward: 0,
				signDate: '',
				signBy: '',
				desciption: '',
			},
			titleModal: '',
		};
	},
	components: {
		DatePicker,
		Calendar,
		DateRangePicker,
		Datepicker,
	},
	methods: {
		searchOnTable() {
			this.searched = searchByName(this.ListRewards, this.search);
		},
		callApiGetAll() {
			this.ListRewards = [];
			this.$gateway.get(`/reward/get-all-rewards`).then(response => {
				const repons = response.data.value;
				if (repons !== null) {
					repons.forEach(element => {
						this.ListRewards.push(element);
					});
					this.searched = this.ListRewards;
				}
			});
		},
		Cancel(modal) {
			this.callApiGetAll();
			this.$root.$emit('bv::hide::modal', modal);
		},
		Deactive(itemModal) {
			this.$gateway
				.post(`/reward/delete`, {
					value: {
						id: itemModal.id,
					},
					hashed: 'string',
				})
				.then(response => {
					if (response.data.status === 'SUCCESS') {
						this.$root.$emit('bv::hide::modal', 'delete');
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
		edit(item) {
			this.titleModal = 'edit';
			this.itemEdit.id = item.id;
			this.itemEdit.dicisionNo = item.dicisionNo;
			this.itemEdit.effectiveDate = item.effectiveDate;
			this.itemEdit.title = item.title;
			this.itemEdit.rewardAndDisciplineMethodId = item.rewardAndDisciplineMethodId;
			this.itemEdit.amount = item.amount;
			this.itemEdit.percentReward = item.percentReward;
			this.itemEdit.signDate = item.signDate;
			this.itemEdit.signBy = item.signBy;
			this.itemEdit.desciption = item.desciption;
			this.$root.$emit('bv::show::modal', 'Edit');
		},
		ModalCreat() {
			this.$root.$emit('bv::show::modal', 'Creat');
		},
		modalSetting(item) {
			this.itemModal.id = item.id;
			this.itemModal.title = item.title;
			this.$root.$emit('bv::show::modal', 'delete');
		},
		EditMember() {
			if (this.itemEdit.title !== '' && this.itemEdit.amount !== '') {
				this.$gateway
					.post(`/reward/update`, {
						value: {
							id: this.itemEdit.id,
							dicisionNo: this.itemEdit.dicisionNo,
							effectiveDate: this.itemEdit.effectiveDate,
							title: this.itemEdit.title,
							rewardAndDisciplineMethodId: this.itemEdit.rewardAndDisciplineMethodId,
							amount: this.itemEdit.amount,
							percentReward: this.itemEdit.percentReward,
							signDate: this.itemEdit.signDate,
							signBy: this.itemEdit.signBy,
							desciption: this.itemEdit.desciption,
						},
						hashed: 'string',
					})
					.then(response => {
						const repons = response.data.value;
						if (response.data.status === 'SUCCESS') {
							this.$root.$emit('bv::hide::modal', 'Edit');
							this.ListRewards = [];
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
		CreatReward() {
			if (this.itemAdd.id !== '' && this.itemAdd.title !== '' && this.itemAdd.amount !== '') {
				this.$gateway
					.post(`/reward/create`, {
						value: {
							id: this.itemAdd.id,
							dicisionNo: this.itemAdd.dicisionNo,
							effectiveDate: this.itemAdd.effectiveDate,
							title: this.itemAdd.title,
							rewardAndDisciplineMethodId: this.itemAdd.rewardAndDisciplineMethodId,
							amount: this.itemAdd.amount,
							percentReward: this.itemAdd.percentReward,
							signDate: this.itemAdd.signDate,
							signBy: this.itemAdd.signBy,
							desciption: this.itemAdd.desciption,
						},
						hashed: 'string',
					})
					.then(response => {
						if (response.data.status === 'SUCCESS') {
							this.$root.$emit('bv::hide::modal', 'Creat');
							this.ListRewards = [];
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
	},
	created() {
		this.callApiGetAll();
	},
};
