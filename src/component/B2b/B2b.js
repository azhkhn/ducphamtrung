// import { BuyMutationTypes } from 'store/module/buy';
import getRouter from 'router';

export default {
	name: 'B2b',
	data() {
		return {
			items: [],
			shopping: [],
			currentPage: 1,
			perPage: 10,
			filter: null,
			fields: [
				{
					key: 'nameRoom',
					label: 'Name Room',
					class: 'nameRoom',
				},
				{
					key: 'quanlity',
					label: 'Quanlity',
					class: 'quanlity',
				},
				{
					key: 'price',
					label: 'Price',
					class: 'price',
				},
				{
					key: 'Total',
					label: 'Total',
					class: 'Total',
				},
				{
					key: 'cancellation',
					label: 'Cancellation',
					class: 'cancellation',
				},
			],
			kt: '',

		};
	},
	methods: {
		onFiltered(filteredItems) {
			// Trigger pagination to update the number of buttons/pages due to filtering
			this.totalRows = filteredItems.length;
			this.currentPage = 1;
		},
	},
};
