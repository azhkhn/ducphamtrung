import HotelDatePicker from 'vue-hotel-datepicker';
import axios from 'axios';
import Multiselect from 'vue-multiselect';
import { SearchTempMutationTypes } from 'store/module/searchTemp';
import { BuyMutationTypes } from 'store/module/buy';
import Spinner from 'vue-spinkit';
import 'vue-material/dist/theme/default.css';

export default {
	name: 'AvaiSearch',
	components: {
		HotelDatePicker,
		axios,
		Multiselect,
		Spinner,
	},
	data() {
		return {
			optionsold: [
				{
					value: 1,
					text: `1 ${this.$t('ages')}`,
				},
				{
					value: 2,
					text: `2 ${this.$t('ages')}`,
				},
				{
					value: 3,
					text: `3 ${this.$t('ages')}`,
				},
				{
					value: 4,
					text: `4 ${this.$t('ages')}`,
				},
				{
					value: 5,
					text: `5 ${this.$t('ages')}`,
				},
				{
					value: 6,
					text: `6 ${this.$t('ages')}`,
				},
				{
					value: 7,
					text: `7 ${this.$t('ages')}`,
				},
				{
					value: 8,
					text: `8 ${this.$t('ages')}`,
				},
				{
					value: 9,
					text: `9 ${this.$t('ages')}`,
				},
				{
					value: 10,
					text: `10 ${this.$t('ages')}`,
				},
				{
					value: 11,
					text: `11 ${this.$t('ages')}`,
				},
				{
					value: 12,
					text: `12 ${this.$t('ages')}`,
				},
			],
			collapse1: false,
			value: null,
			markup: [
				{
					id: 1,
					name: 'Popularity',
				},
			],
			lstMarkup: [
				{
					id: 1,
					name: 'Popularity',
				},
			],
			counterChilds: [],
			unit: {
				quantities: 0,
			},
			unitAdults: {
				quantities: 2,
				age: 0,
			},
			datePickerTranslate: {
				// night: `${this.$t('DATE')}`,
				// nights:  `${this.$t('MAX_DAY')}`,
				// 'day-names': [ `${this.$t('T8')}`,  `${this.$t('T2')}`,  `${this.$t('T3')}`,  `${this.$t('T4')}`,  `${this.$t('T5')}`,  `${this.$t('T6')}`,  `${this.$t('T7')}`],
				// 'check-in':  `${this.$t('CHECKIN')}`,
				// 'check-out':  `${this.$t('CHECKOUT')}`,
				// 'month-names': [
				// 	`${this.$t('TH1')}`,
				// 	`${this.$t('TH2')}`,
				// 	`${this.$t('TH3')}`,
				// 	`${this.$t('TH4')}`,
				// 	`${this.$t('TH5')}`,
				// 	`${this.$t('TH6')}`,
				// 	`${this.$t('TH7')}`,
				// 	`${this.$t('TH8')}`,
				// 	`${this.$t('TH9')}`,
				// 	`${this.$t('TH10')}`,
				// 	`${this.$t('TH11')}`,
				// 	`${this.$t('TH12')}`,
				// ],
			},
			dataArray: [
				'ezhotel',
				'ezhotel 2',
				'ezFolio',
				'Folio',
				'A25',
				'HN',
				'VN',
				'abc',
				'def',
				'ghk',
				'ez 2',
				'123',
			],
			nameData: '',
			selected: null,
			locations: [],
			filterLocations: [],
			filterLocationsLang: [],
			countries: [],
			places: [],
			// duc
			error: false,
			error1: false,
			checkindate: new Date(),
			checkOutdate: new Date(this.$moment(this.checkindate).add(1, 'd')),
			temp: [],
			search: [],
			employees: [
				'Jim Halpert',
				'Dwight Schrute',
				'Michael Scott',
				'Pam Beesly',
				'Angela Martin',
				'Kelly Kapoor',
				'Ryan Howard',
				'Kevin Malone',
				'Creed Bratton',
				'Oscar Nunez',
				'Toby Flenderson',
				'Stanley Hudson',
				'Meredith Palmer',
				'Phyllis Lapin-Vance',
			],
			ab1: 0,
			cd1: 0,
			ab2: 0,
			cd2: 0,
			loadingg: true,
		};
	},
	computed: {
		filteredDataArray() {
			return this.dataArray.filter(
				option =>
					option
						.toString()
						.toLowerCase()
						.indexOf(this.nameData.toLowerCase()) >= 0,
			);
		},
		heightWindow() {
			return `${window.innerHeight}px`;
		},
	},

	created() {
		console.log('heght', this.heightWindow);
		if (this.$store.getters.currentLanguage.code !== 'vi') {
			this.datePickerTranslate = {
				night: 'Night',
				nights: 'Nights',
				'day-names': ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
				'check-in': 'Check-in',
				'check-out': 'Check-Out',
				'month-names': [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
					'September',
					'October',
					'November',
					'December',
				],
			};
		} else {
			this.datePickerTranslate = {
				night: 'Ngày',
				nights: 'Ngày tối đa',
				'day-names': ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
				'check-in': 'Checkin',
				'check-out': 'Checkout',
				'month-names': [
					'Tháng 1',
					'Tháng 2',
					'Tháng 3',
					'Tháng 4',
					'Tháng 5',
					'Tháng 6',
					'Tháng 7',
					'Tháng 8',
					'Tháng 9',
					'Tháng 10',
					'Tháng 11',
					'Tháng 12',
				],
			};
		}
		this.searchTemp = this.$store.getters['searchTemp/search'];

		this.$gateway.post(`/v1/ta/getLocation`).then(
			response => {
				this.loadingg = true;
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
					this.loadingg = false;
				}
				this.locations.forEach(element => {
					for (let i = 0; i < element.i18ns.length; i += 1) {
						const temp = {};
						temp.id = element.id;
						temp.langCode = element.i18ns[i].langCode;
						temp.title = element.i18ns[i].title;
						this.filterLocations.push(temp);
					}
				});
				this.filterLocationsLang = this.filterLocations.filter(
					loc => loc.langCode === this.$store.getters.currentLanguage.code,
				);
			},
			error => {
				console.log('failed', error);
			},
		);
	},

	methods: {
		onConfirm() {
			//	window.location.reload(true);
			this.error1 = false;
		},
		onCancel() {
			window.location.reload(true);
			this.error1 = false;
		},
		isNumber(evt) {
			evt = evt || window.event;
			const charCode = evt.which ? evt.which : evt.keyCode;

			if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
				evt.preventDefault();
			} else {
				return true;
			}
		},
		select(checkin, checkout, adults, child, countChilds) {
			const now = new Date();
			const adult = adults === '' ? 2 : adults;
			const children = child === '' ? 0 : child;
			if (this.selected === null) {
				this.error = true;
			} else if (this.checkindate === null || this.checkOutdate === null) {
				this.error1 = true;
			} else {
				const a = this.$moment(checkin);
				const b = this.$moment(checkout);
				const c = this.$moment(this.$store.getters['searchTemp/search'][1]);
				const d = this.$moment(this.$store.getters['searchTemp/search'][2]);
				this.ab1 = a.diff(now, 'days');
				this.cd1 = b.diff(now, 'days');
				this.ab2 = c.diff(now, 'days');
				this.cd2 = d.diff(now, 'days');
				if (
					this.ab1 !== this.ab2 ||
					this.cd1 !== this.cd2 ||
					adult !== this.$store.getters['searchTemp/search'][3] ||
					children !== this.$store.getters['searchTemp/search'][4] ||
					this.selected.id !== this.$store.getters['searchTemp/search'][0].id
				) {
					this.$store.commit(BuyMutationTypes.SET_TOTAL, 0);
					this.$store.commit(BuyMutationTypes.SET_BOOKINGS, []);
				}
				// const hotelId = null;
				this.error = false;
				this.error1 = false;

				this.temp = [this.selected, checkin, checkout, adult, children, countChilds];
				// save search
				this.$store.commit(SearchTempMutationTypes.SET_TEMP, this.temp);
				this.$router.push({
					name: 'Result Search - B2B Platform',
					params: {
						datasearch: this.temp,
					},
				});
			}
		},
		confirm() {
			this.$root.$emit('bv::toggle::collapse', 'collapse1');
		},
		diffAdult() {
			if (this.unitAdults.quantities <= 1) {
				this.unitAdults.quantities = 1;
				// eslint-disable-next-line no-plusplus
			} else this.unitAdults.quantities--;
		},
		addAdult() {
			// eslint-disable-next-line no-plusplus
			this.unitAdults.quantities++;
			if (this.unitAdults.quantities > 99) this.unitAdults.quantities = 99;
		},
		// count units
		diffUnits() {
			if (this.unit.quantities <= 0) {
				this.unit.quantities = 0;
			} else {
				this.unit.quantities--;
				this.counterChilds.splice(this.counterChilds, 1);
			}
		},
		addUnits() {
			if (this.unit.quantities > 99) {
				this.unit.quantities = 99;
			} else {
				this.unit.quantities++;
			}
			this.counterChilds.push(0);
		},
		diffUnitsChild(index) {
			if (this.counterChilds[index] <= 0) {
				this.counterChilds[index] = 0;
			} else {
				const temp = this.counterChilds[index] - 1;
				this.counterChilds.splice(index, 1, temp);
			}
		},
		addUnitsChild(index) {
			if (this.counterChilds[index] >= 12) {
				this.counterChilds[index] = 12;
			} else {
				const temp = this.counterChilds[index] + 1;
				this.counterChilds.splice(index, 1, temp);
			}
		},
		hiden() {
			// this.$('.datetime').hide();
			this.$('.menu').hide();
		},
	},
};
