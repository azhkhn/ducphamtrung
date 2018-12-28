// import Spinner from 'vue-simple-spinner';
import { SearchTempMutationTypes } from 'store/module/searchTemp';
import Spinner from 'vue-spinkit';
import VueSweetalert2 from 'vue-sweetalert2';
import { RememberMeMutationTypes } from 'store/module/rememberMe';
import { UserMutationTypes } from 'store/module/user';
import { BuyMutationTypes } from 'store/module/buy';

export default {
	name: 'AffiliateNetwork',
	props: ['filter'],
	data() {
		return {
			linkBar: [
				{
					text: this.$t('Hotel_div_ApplyForAccess'),
					href: '/b2b/hotelsofta',
				},
				{
					text: this.$t('Affiliate_Network'),
					href: '#',
				},
			],
			loading: false,
			counter: 5,
			itemDetail: [],
			agentId: 0,
			image: '~icons/{{row.item.deactive}}deactive.png',
			// test tuanphansy
			items: [],
			active: false,
			fields: [
				{ key: 'propertys', label: this.$t('Property_row_AffiliateNetwork'), class: 'Property' },
				{ key: 'types', label: this.$t('Type_row_AffiliateNetwork'), class: 'Type' },
				{ key: 'level', label: 'level', class: 'level' },
				{ key: 'locations', label: this.$t('Location_row_AffiliateNetwork'), class: 'Location' },
				{ key: 'statuss', label: this.$t('Status_row_AffiliateNetwork'), class: 'Status' },
				{ key: 'actions', label: this.$t('Actions_row_AffiliateNetwork'), class: 'Actions' },
			],
			currentPage: 1,
			perPage: 10,
			totalRows: 0,
			pageOptions: [5, 10, 15],
			sortBy: null,
			sortDesc: false,
			sortDirection: 'asc',
			filter: null,
			modalInfo: { title: '', content: '' },
			langcode: '',
			agentid: '',
			optionsDeactiveen: [
				{ text: 'Rates do not match contracted rates.', value: 'Rates do not match contracted rates.' },
				{ text: 'Low conmmision discount.', value: 'Low conmmision discount.' },
				{ text: 'Payment condition.', value: 'Payment condition.' },
			],
			optionsDeactivevi: [
				{ text: 'Giá không phù hợp với mức giá hợp đồng.', value: 'Giá không phù hợp với mức giá hợp đồng.' },
				{ text: 'Chiết khấu conmmision thấp.', value: 'Chiết khấu conmmision thấp.' },
				{ text: 'Điều kiện thanh toán.', value: 'Điều kiện thanh toán.' },
			],
			selectedDeactive: [],
			deactive: { name: '', hotelid: '', reason: '', level: 0, status: '' },
			lstActive: { name: '', hotelid: '', reason: '', status: '' },
			confirmed: { name: '', hotelid: '', level: 1, status: '', remark: '' },
			text: '',
			text1: '',
			text2: '',
			fill: [],
			tempApply: [],
			countItem: 0,
		};
	},
	mounted() {},
	created() {
		// if(this.$store.getters.currentLanguage.code==='vi')
		// {
		// 	this.optionsDeactive=[
		// 		{ text: 'Giá không phù hợp với mức giá hợp đồng.', value: 'Giá không phù hợp với mức giá hợp đồng.' },
		// 		{ text: 'Chiết khấu conmmision thấp.', value: 'Chiết khấu conmmision thấp.' },
		// 		{ text: 'Điều kiện thanh toán.', value: 'Điều kiện thanh toán.' },
		// 	]
		// }
		// else{
		// 	this.optionsDeactive=[
		// 		{ text: 'Rates do not match contracted rates.', value: 'Rates do not match contracted rates.' },
		// 		{ text: 'Low conmmision discount.', value: 'Low conmmision discount.' },
		// 		{ text: 'Payment condition.', value: 'Payment condition.' },
		// 	]
		// }
		this.agentcode = this.$store.getters['user/id'];
		this.callApiAffiliateNetwork();
		this.searchAffiNetwork();
		this.loading = true;
	},
	components: {
		// 'vue-simple-spinner': Spinner,
		Spinner,
		VueSweetalert2,
	},
	computed: {
		sortOptions() {
			// Create an options list from our fields
			return this.fields.filter(f => f.sortable).map(f => ({ text: f.label, value: f.key }));
		},
		loadPage() {
			this.langcode = this.$store.getters.currentLanguage.code;
			this.agentcode = this.$store.getters['user/id'];
			// const test = [this.$store.getters['user/id'], this.$store.getters.currentLanguage.code];

			// console.log('ok', test);
		},
	},
	methods: {
		tesst(e) {
			this.$root.$emit('bv::toggle::collapse', e);
		},
		browser(e) {
			window.location.href = e;
		},
		hideModal(modal) {
			console.log(modal);
			this.$root.$emit('bv::hide::modal', modal);
		},
		searchAffiNetwork() {
			this.$eventHub.$on('filter-changedAffiNetwork', e => {
				this.filter = e.filterAffiNetwork;
				const temp = [];
				if (this.filter.selected.length === 0 && this.filter.hotel === '') {
					this.callApiAffiliateNetwork();
				} else if (this.filter.selected.length === 0 && this.filter.hotel !== '') {
					this.tempApply.forEach(element => {
						element.affliateI18nModels.forEach(names => {
							if (names.langCode === this.$store.getters.currentLanguage.code) {
								const a = names.hotelName.toUpperCase();
								const b = this.filter.hotel.toUpperCase();
								if (a.includes(b) === true) {
									temp.push(element);
								}
							}
						});
					});
					this.items = temp;
					this.countItem = this.items.length;
				} else if (this.filter.hotel === '' && this.filter.selected.length !== 0) {
					this.tempApply.forEach(cc => {
						cc.affliateI18nModels.forEach(fc => {
							if (fc.langCode === this.$store.getters.currentLanguage.code) {
								const a = fc.country.toUpperCase();
								const b = this.filter.selected.toUpperCase();
								if (a.includes(b) === true) {
									temp.push(cc);
								}
							}
						});
					});
					this.items = temp;
				} else {
					this.tempApply.forEach(element => {
						element.affliateI18nModels.forEach(cc => {
							if (cc.langCode === this.$store.getters.currentLanguage.code) {
								const a = cc.country.toUpperCase();
								const b = this.filter.selected.toUpperCase();
								if (a.includes(b) === true) {
									const x = cc.hotelName.toUpperCase();
									const y = this.filter.hotel.toUpperCase();
									if (x.includes(y) === true) {
										temp.push(element);
									}
								}
							}
						});
					});
					this.items = temp;
					console.log('aaaaaa', temp);
				}
			});
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
		callApiAffiliateNetwork() {
			this.$gateway.get(`/v1/ta/get-all-affiliate`).then(
				response => {
					this.loading = true;
					const listRes =
						typeof response.data.value !== 'undefined' && Array.isArray(response.data.value)
							? response.data.value
							: [];
					const listTmp = [];
					if (listRes.length > 0) {
						for (let i = 0; i < listRes.length; i += 1) {
							// if (listRes[i].hotelAgentLevelResponses == null) {
							// 	break;
							// }
							const temp = {};
							// tao temp
							temp.active = listRes[i].active;
							temp.hotelid = listRes[i].hotelId;
							temp.rankStar = listRes[i].rankStar;
							temp.website = listRes[i].website;
							temp.yourlogResponse = listRes[i].yourlogResponse;
							temp.actionTA = listRes[i].actionAffiliate.actionTA;
							temp.actionTABtn = listRes[i].actionAffiliate.actionTABtn;
							temp.statusTABtn = listRes[i].actionAffiliate.statusTABtn;
							temp.statusTravel = listRes[i].actionAffiliate.statusTravel;
							temp.affliateI18nModels = listRes[i].affliateI18nModels;
							temp.typeI18nModels = listRes[i].typeI18nModels;
							temp.level = listRes[i].level;
							temp.showCollapse = false;
							listTmp.push(temp);
							// listTmp[i] = listRes[i];
						}
						const lst = [];
						for (let j = 0; j < listTmp.length; j += 1) {
							if (listTmp[j].actionTA !== null) {
								lst.push(listTmp[j]);
							}
						}
						this.items = lst;
						this.countItem = this.items.length;
						this.tempApply = this.items;
						this.loading = false;
					} else {
						this.loading = false;
					}
				},
				error => {
					console.log('failed', error);
					// this.errors.push(error);
					if (error.status === 403) {
						this.showAlertLogout();
					}
				},
			);
		},
		// deactive booking now
		deactiveConfirm(item) {
			this.selectedDeactive.forEach(element => {
				this.deactive.reason += element;
			});
			this.deactive.reason += `. ${this.text}`;
			// console.log('ductest:', this.deactive.reason);
			// update active
			this.$gateway
				.post(`/v1/ta/deactiveHotel`, {
					// agentId: +this.agentcode,
					hotelId: item,
					remark: this.deactive.reason,
					status: this.deactive.status,
				})
				.then(
					response => {
						if (response.data.responseCode === 0) {
							this.$root.$emit('bv::hide::modal', 'deactive');
							this.$swal({
								position: 'top-end',
								type: 'success',
								title: this.$t('Deactive_Success'),
								showConfirmButton: false,
								timer: 1500,
							}).then(() => {
								window.location.reload(true);
							});
						} else if (response.data.responseCode === 3) {
							this.$root.$emit('bv::hide::modal', 'deactive');
							this.$swal({
								position: 'top-end',
								type: 'error',
								title: response.data.value,
								showConfirmButton: false,
								timer: 2500,
							}).then(() => {
								// window.location.reload(true);
							});
						} else {
							this.$root.$emit('bv::hide::modal', 'deactive');
							this.$swal({
								position: 'top-end',
								type: 'error',
								title: this.$t('Deactive_Faild'),
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
						this.errors.push(error);
					},
				);

			this.hideModal('deactive');
		},
		activeConfirm(item, textRemark, statusTravel) {
			// update active
			this.$gateway
				.post(`/v1/ta/activeHotel`, {
					// agentId: +this.agentcode,
					hotelId: item,
					remark: textRemark,
					status: statusTravel,
				})
				.then(
					response => {
						if (response.data.responseCode === 0) {
							this.$root.$emit('bv::hide::modal', 'active');
							this.$swal({
								position: 'top-end',
								type: 'success',
								title: this.$t('Active_Success'),
								showConfirmButton: false,
								timer: 1500,
							}).then(() => {
								window.location.reload(true);
							});
						} else {
							this.$root.$emit('bv::hide::modal', 'active');
							this.$swal({
								position: 'top-end',
								type: 'error',
								title: this.$t('Active_Faild'),
								showConfirmButton: false,
								timer: 1500,
							});
						}
					},
					error => {
						console.log('failed', error);
						// this.errors.push(error);
						if (error.status === 403) {
							this.showAlertLogout();
						}
					},
				);
		},
		// modal confirm
		confirmedModal(item, button) {
			for (let i = 0; i < item.affliateI18nModels.length; i += 1) {
				if (item.affliateI18nModels[i].langCode === this.$store.getters.currentLanguage.code) {
					this.confirmed.name = item.affliateI18nModels[i].hotelName;
				}
			}
			this.confirmed.hotelid = item.hotelid;
			this.confirmed.level = item.level;
			this.confirmed.status = item.status;
			this.$root.$emit('bv::show::modal', 'confirmed', button);
		},
		confirm(hotelid) {
			console.log('hotelid', hotelid);
			this.$gateway
				.post(`/v1/ta/confirmAccess`, {
					// agentId: +this.agentcode,
					hotelId: hotelid.hotelid,
					// levelid: 1,
					// status: hotelid.status,
					// remark: hotelid.remark,
					// username: this.$store.getters['user/userName'],
				})
				.then(
					response => {
						if (response.data.responseCode === 0) {
							this.hideModal('confirmed');
							this.$swal({
								position: 'top-end',
								type: 'success',
								title: this.$t('Confirm_col_AffiliateNetwork_Success'),
								showConfirmButton: false,
								timer: 1500,
							}).then(() => {
								window.location.reload(true);
							});
						} else {
							this.hideModal('confirmed');
							this.$swal({
								position: 'top-end',
								type: 'error',
								title: this.$t('Confirm_col_AffiliateNetwork_Error'),
								showConfirmButton: false,
								timer: 1500,
							});
						}
					},
					error => {
						console.log('failed', error);
					},
				);
		},
		deactiveModal(item, button) {
			if (item.actionTA === 'DEACTIVE') {
				this.deactive.name = item.property;
				this.deactive.hotelid = item.hotelid;
				this.deactive.level = item.level;
				this.deactive.status = item.statusTravel;
				this.$root.$emit('bv::show::modal', 'deactive', button);
			} else {
				this.lstActive.hotelid = item.hotelid;
				this.lstActive.status = item.statusTravel;
				this.$root.$emit('bv::show::modal', 'active', button);
			}
		},
		// cancel request
		cancelModal(item, button) {
			this.confirmed.hotelid = item.hotelid;
			for (let i = 0; i < item.affliateI18nModels.length; i += 1) {
				if (item.affliateI18nModels[i].langCode === this.$store.getters.currentLanguage.code) {
					this.confirmed.name = item.affliateI18nModels[i].hotelName;
				}
			}
			// this.confirmed.status = item.status;
			this.$root.$emit('bv::show::modal', 'cancelModal', button);
		},
		btnCancel(hotelid) {
			// console.log('hoho', hotelid);
			this.$gateway
				.post(`/v1/ta/cancelApply`, {
					// agentId: +this.agentcode,
					hotelId: hotelid.hotelid,
					// levelid: 1,
					// status: hotelid.status,
					remark: this.text,
					// username: this.$store.getters['user/userName'],
				})
				.then(
					response => {
						if (response.data.responseCode === 0) {
							this.$root.$emit('bv::hide::modal', 'cancelModal');
							this.$swal({
								position: 'top-end',
								type: 'success',
								title: this.$t('Cancel_Request_Success'),
								showConfirmButton: false,
								timer: 1500,
							}).then(() => {
								window.location.reload(true);
							});
						} else {
							this.$root.$emit('bv::hide::modal', 'cancelModal');
							this.$swal({
								position: 'top-end',
								type: 'error',
								title: this.$t('Cancel_Request_Error'),
								showConfirmButton: false,
								timer: 1500,
							});
						}
					},
					error => {
						console.log('failed', error);
					},
				);
			// this.hideModal('confirmed');
		},
		// reject request
		rejectModal(item, button) {
			this.confirmed.hotelid = item.hotelid;
			// this.confirmed.level = item.level;
			// this.confirmed.status = item.status;
			this.$root.$emit('bv::show::modal', 'rejectModal', button);
		},
		btnReject(hotelid) {
			this.$gateway
				.post(`/v1/ta/rejectConfirm`, {
					// agentId: +this.agentcode,
					hotelId: hotelid.hotelid,
					remark: this.text2,
					// username: this.$store.getters['user/userName'],
				})
				.then(
					response => {
						if (response.data.responseCode === 0) {
							this.$root.$emit('bv::hide::modal', 'rejectModal');
							this.$swal({
								position: 'top-end',
								type: 'success',
								title: this.$t('Cancel_Request_Success'),
								showConfirmButton: false,
								timer: 1500,
							}).then(() => {
								window.location.reload(true);
							});
						} else {
							this.$root.$emit('bv::hide::modal', 'rejectModal');
							this.$swal({
								position: 'top-end',
								type: 'error',
								title: this.$t('Cancel_Request_Error'),
								showConfirmButton: false,
								timer: 1500,
							});
						}
					},
					error => {
						console.log('failed', error);
					},
				);
			// this.hideModal('confirmed');
		},
		info(item, index, button) {
			this.modalInfo.title = item.property;
			this.modalInfo.content = JSON.stringify(item, null, 2);
			this.$root.$emit('bv::show::modal', 'modalInfo', button);
			console.log(item.agentcode);
		},
		resetModal() {
			this.modalInfo.title = '';
			this.modalInfo.content = '';
		},
		onFiltered(filteredItems) {
			// Trigger pagination to update the number of buttons/pages due to filtering
			this.totalRows = filteredItems.length;
			this.currentPage = 1;
		},

		Bookonline(item) {
			// const passdatabook = {
			// 	idHotel: item.hotelid,
			// };
			const now = new Date();
			console.log();
			// this.temp = [this.selected, checkin, checkout, adults, child];
			// save search	this.$store.commit(SearchTempMutationTypes.SET_TEMP, temp);
			// let tempSearch = this.$store.getters['searchTemp/search'];
			this.$store.commit(SearchTempMutationTypes.SET_TEMP, [
				{ id: 3, langCode: 'vi', title: 'Hà nội' },
				this.$moment(now).format('YYYY-MM-DD'),
				this.$moment(now.setDate(now.getDate() + 1)).format('YYYY-MM-DD'),
				2,
				0,
				[],
				item.hotelid,
			]);
			this.$router.push({
				name: 'DetailSearch',
			});
		},
	},
};
