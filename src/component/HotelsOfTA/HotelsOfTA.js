// import axios from 'axios';
import DatePicker from 'vue2-datepicker';
import Calendar from 'vue2-slot-calendar';
import DateRangePicker from 'vue2-daterange-picker';
import Datepicker from 'vuejs-datepicker';
import { en, vi } from 'vuejs-datepicker/dist/locale';

export default {
	name: 'HotelsOfTA',

	data() {
		return {
			en: en,
			vi: vi,

			value: '',
			// rangeStatus: 1,
			// rangeStatus1: 2,
			// clear: false,
			currentView: 'ApplyforAccess',
			// disabled: [],
			// getBus: {},
			filter: {
				filterApplyForAccess: {
					hotel: '',
					selected: '',
				},
				filterAffiNetwork: {
					hotel: '',
					selected: '',
				},
				filterReserSearch: {
					hotel: '',
					fromDate: '',
					toDate: '',
					selectedSearch: '',
					selectedStatus: '',
					bookingCode: '',
				},
			},
			startDate: '2017-09-05',
			endDate: '2017-09-15',
			fromDate: '',
			toDate: '',
			state: {},
			state1: {},
			errorDate: 0,
			selected: [],
			hotel: '',
			selected1: [],
			hotel1: '',
			hotel2: '',
			lstCountry: [],
			temp: '',
			countries: [],
			locations: [],
			selectedSearch: '',
			selectedStatus: '',
			bookingCode: '',
			searchBy: [
				{
					key: '',
					value: '--- none ---',
				},
				{
					key: 'BOOKINGCODE',
					value: 'BOOKING CODE',
				},
				{
					key: 'BOOKINGDATE',
					value: 'BOOKING DATE',
				},
				{
					key: 'CHECKINDATE',
					value: 'CHECK IN DATE',
				},
				{
					key: 'CHECKOUTDATE',
					value: 'CHECK OUT DATE',
				},
			],
			bookingStatus: [
				{
					key: '',
					value: '--- none ---',
				},
				{
					key: 'CANCEL',
					value: 'CANCEL',
				},
				{
					key: 'AWAIT_PAYMENT',
					value: 'AWAIT PAYMENT',
				},
				{
					key: 'CLOSE',
					value: 'CLOSE',
				},
				{
					key: 'IN_SERVICE',
					value: 'IN_SERVICE',
				},
				{
					key: 'PAYMENT_FAILED',
					value: 'PAYMENT_FAILED',
				},
				{
					key: 'CONFIRM',
					value: 'CONFIRM',
				},
				{
					key: 'AWAIT_FULLY_PAYMENT',
					value: 'AWAIT_FULLY_PAYMENT',
				},
				{
					key: 'VOID',
					value: 'VOID',
				},
				{
					key: 'UNPOSTED',
					value: 'UNPOSTED',
				},
				{
					key: 'MODIFIED',
					value: 'MODIFIED',
				},
				{
					key: 'CANCELED',
					value: 'CANCELED',
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
	methods: {
		callApiRegister() {
			// call api Location
			this.$gateway.post(`/v1/ta/getLocation`).then(
				response => {
					const listRes =
						typeof response.data.locations !== 'undefined' && Array.isArray(response.data.locations)
							? response.data.locations
							: [];
					const listTmp = [];
					if (listRes.length > 0) {
						for (let i = 0; i < listRes.length; i += 1) {
							// match data
							const temp = {};
							temp.id = listRes[i].id;
							temp.locType = listRes[i].locType;
							temp.parent = listRes[i].parent;
							temp.i18ns = listRes[i].names;
							listTmp.push(temp);
						}
						this.locations = listTmp;
					}
					// filter list country
					this.countries = this.locations.filter(loc => loc.locType === 2 && loc.parent === 0);
					// this.countries.forEach(element => {
					// 	for (let i = 0; i < element.i18ns.length; i += 1) {
					// 		const temp = {};
					// 		temp.id = element.id;
					// 		temp.langCode = element.i18ns[i].langCode;
					// 		temp.title = element.i18ns[i].title;
					// 		this.lstCountry.push(temp);
					// 	}
					// });
					this.countries.forEach(element => {
						const temp = {};
						element.i18ns.forEach(e => {
							if (e.langCode === this.$store.getters.currentLanguage.code) {
								temp.id = element.id;
								temp.langCode = e.langCode;
								temp.title = e.title;
							}
						});
						this.lstCountry.push(temp);
					});
				},
				error => {
					console.log('failed', error);
				},
			);
		},
		changeFilterApply() {
			this.filter.filterApplyForAccess.hotel = this.hotel;
			this.filter.filterApplyForAccess.selected = this.selected;
			this.$eventHub.$emit('filter-changed', this.filter);
			// this.$emit('filter', this.hotel);
		},
		changeFilterAffiNetwork() {
			this.filter.filterAffiNetwork.hotel = this.hotel1;
			this.filter.filterAffiNetwork.selected = this.selected1;
			this.$eventHub.$emit('filter-changedAffiNetwork', this.filter);
		},
		changeFilterReservationSearch() {
			this.filter.filterReserSearch.hotel = this.hotel2;
			this.filter.filterReserSearch.fromDate = this.fromDate;
			this.filter.filterReserSearch.toDate = this.toDate;
			this.filter.filterReserSearch.selectedSearch = this.selectedSearch;
			this.filter.filterReserSearch.selectedStatus = this.selectedStatus;
			this.filter.filterReserSearch.bookingCode = this.bookingCode;
			this.$eventHub.$emit('filter-changedReservationSearch', this.filter);
		},
		checkDate() {
			const stardate = new Date(this.fromDate);
			this.state = {
				disabledDates: {
					to: new Date(stardate.setDate(stardate.getDate() + 1)),
				},
			};
		},
		checkDate1() {
			const enddate = new Date(this.toDate);
			this.state1 = {
				disabledDates: {
					from: new Date(enddate.setDate(enddate.getDate())),
				},
			};
		},
		linkPage(a) {
			this.temp = a;
			this.$router.push({
				name: 'ViewBooking',
				params: {
					test: this.temp,
				},
			});
		},
	},
	mounted() {},
	created() {
		this.callApiRegister();
		this.currentView = 'ApplyforAccess';
		const curr = this.$store.getters['buy/curr'];
		this.currentView = curr.currentview;

		// console.log('cur', this.currentView);
	},
};
