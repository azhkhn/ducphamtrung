// import Spinner from 'vue-simple-spinner';
import Spinner from 'vue-spinkit';
import { BuyMutationTypes } from 'store/module/buy';
import { SearchTempMutationTypes } from 'store/module/searchTemp';
import { RememberMeMutationTypes } from 'store/module/rememberMe';
import { UserMutationTypes } from 'store/module/user';

export default {
	name: 'ApplyforAccess',
	props: ['filter'],
	data() {
		return {
			checkindate: new Date(),
			checkOutdate: new Date(this.$moment(this.checkindate).add(1, 'd')),
			linkBar: [
				{
					text: this.$t('Hotel_div_ApplyForAccess'),
					href: '/b2b/hotelsofta',
				},
				{
					text: this.$t('Apply_for_access'),
					href: '#',
				},
			],
			items: [],
			loading: false,
			fields: [
				{ key: 'property', label: 'Property', class: 'Property', self: 'center' },
				{ key: 'types', label: 'Type', class: 'Type' },
				{ key: 'locations', label: 'Location', class: 'Location' },
				{ key: 'actions', label: '', class: 'actions' },
			],
			currentPage: 1,
			perPage: 10,
			totalRows: 0,
			pageOptions: [5, 10, 15],
			sortBy: null,
			sortDesc: false,
			sortDirection: 'asc',
			filter: null,
			modalInfo: { title: '', hotelid: '' },
			langcode: '',
			agentid: '',
			tempApply: [],
			countItem: 0,

		};
	},
	components: {
		// 'vue-simple-spinner': Spinner,
		Spinner,
	},
	mounted() {},
	created() {
		this.loading = true;
		this.callApiApplyforAccess();
		this.searchApply();
	},
	beforeDestroy() {
		this.$el.mouseup(e => {
			const container = this.$('.testt');

			// if the target of the click isn't the container nor a descendant of the container
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				container.parent().removeClass('show');
			}
		});
	},
	computed: {
		sortOptions() {
			// Create an options list from our fields
			return this.fields.filter(f => f.sortable).map(f => ({ text: f.label, value: f.key }));
		},
		loadPage() {
			this.langcode = this.$store.getters.currentLanguage.code;
			console.log('ok lang', this.langcode);
			this.agentcode = this.$store.getters['user/id'];
			const test = [this.$store.getters['user/id'], this.$store.getters.currentLanguage.code];
			console.log('ok', test);
		},
	},
	methods: {
		browser(link) {
			window.open(link);
		},
		searchApply() {
			this.$eventHub.$on('filter-changed', e => {
				this.filter = e.filterApplyForAccess;

				const temp = [];
				if (this.filter.selected.length === 0 && this.filter.hotel === '') {
					this.callApiApplyforAccess();
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
					this.countItem = this.items.length;
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
					this.countItem = this.items.length;
				}
			});
		},
		callApiApplyforAccess() {
			this.$gateway
				.get(`/v1/ta/get-all-apply`, {
					// agentid: this.$store.getters['user/id'],
					// langcode: this.$store.getters.currentLanguage.code,
				})
				.then(
					response => {
						this.loading = true;
						// console.log('item mouted::', items);
						const listRes =
							typeof response.data.value !== 'undefined' && Array.isArray(response.data.value)
								? response.data.value
								: [];
						console.log('lst:', listRes);
						const listTmp = [];
						if (listRes.length > 0) {
							for (let i = 0; i < listRes.length; i += 1) {
								const temp = {};
								temp.hotelId = listRes[i].hotelId; //
								temp.affliateI18nModels = listRes[i].affliateI18nModels;
								temp.typeI18nModels = listRes[i].typeI18nModels;
								// temp.address = listRes[i].address;
								temp.agentId = listRes[i].agentId; //
								// temp.cities = listRes[i].cities;
								// temp.countries = listRes[i].countries;
								// temp.descriptions = listRes[i].descriptions;
								temp.enabled = listRes[i].hotelAgentRes.enabled; //
								// temp.hotelnames = listRes[i].hotelnames;
								temp.rankStar = listRes[i].rankStar; //
								// temp.typenames = listRes[i].typenames;
								temp.website = listRes[i].website; //
								// temp.yourLog = listRes[i].yourLog;
								temp.actionTA = listRes[i].hotelAgentRes.actionTA; //
								temp.statusTA = listRes[i].hotelAgentRes.statusTA; //
								listTmp.push(temp);
							}
							const lst = [];
							for (let j = 0; j < listTmp.length; j += 1) {
								if (
									listTmp[j].statusTA !== 'PENDING' &&
									listTmp[j].statusTA !== 'CONFIRM' &&
									listTmp[j].statusTA !== 'BOOKONLINE'
								) {
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
						if (error.status === 403) {
							this.showAlertLogout();
						}
					},
				);
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
		loadtbl(item) {
			this.$gateway
				.post(`/v1/ta/applyForAccess`, {
					// agentId: this.$store.getters['user/id'],
					hotelId: item,
					// username: this.$store.getters['user/userName'],
				})
				.then(
					response => {
						if (response.data.responseCode === 0) {
							this.$root.$emit('bv::hide::modal', 'deactive');
							this.$swal({
								position: 'top-end',
								type: 'success',
								title: this.$t('Apply_HotelOFTA_Success'),
								showConfirmButton: false,
								timer: 1500,
							}).then(() => {
								window.location.reload(true);
							});
						} else {
							this.$root.$emit('bv::hide::modal', 'deactive');
							this.$swal({
								position: 'top-end',
								type: 'error',
								title: this.$t('Apply_HotelOFTA_Error'),
								showConfirmButton: false,
								timer: 1500,
							});
						}
					},
					error => {
						console.log('failed', error);
						if (error.status) {
							this.showAlertLogout();
						}
						this.errors.push(error);
					},
				);
			this.$root.$emit('bv::hide::modal', 'modalInfo');
		},
		hideModal() {
			this.$root.$emit('bv::hide::modal', 'modalInfo');
		},
		info(item, index, button) {
			this.modalInfo.title = item.affliateI18nModels;
			this.modalInfo.hotelid = item.hotelId;

			this.$root.$emit('bv::show::modal', 'modalInfo', button);
			console.log(item.id);
		},
		resetModal() {
			this.modalInfo.title = '';
			this.modalInfo.content = '';
		},
		onFiltered(filteredItems) {
			// Trigger pagination to update the number of buttons/pages due to filtering
			this.totalRows = filteredItems.length;
			// if(filteredItems.length = 0){
			// 	this.currentPage = 1;
			// }
			this.currentPage = 1;
		},
		bookonline(item, city) {
			const temp = [city.cities, this.checkindate, this.checkOutdate, 2, 0, [], item, ''];
			this.$store.commit(SearchTempMutationTypes.SET_TEMP, temp);
			window.location.href = '/b2b/detailSearch';
		},
	},
};
