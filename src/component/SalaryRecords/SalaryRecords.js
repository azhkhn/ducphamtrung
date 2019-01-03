const toLower = text => text.toString().toLowerCase();

const searchByName = (items, term) => {
	if (term) {
		return items.filter(item => toLower(item.employeeName).includes(toLower(term)));
	}

	return items;
};

export default {
	name: 'SalaryRecords',
	data() {
		return {
			search: null,
			searched: [],
			ListSalary: [],
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
			month: 12,
			year: 2018,
		};
	},
	methods: {
		searchOnTable() {
			this.searched = searchByName(this.ListSalary, this.search);
		},
		exportTableToExcel(tableID, filename = '') {
			let downloadLink;
			const dataType = 'application/vnd.ms-excel';
			const tableSelect = document.getElementById(tableID);
			const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

			// Specify file name
			filename = filename ? `${filename}.xls` : 'excel_data.xls';
			// eslint-disable-next-line prefer-const
			downloadLink = document.createElement('a');
			document.body.appendChild(downloadLink);

			if (navigator.msSaveOrOpenBlob) {
				const blob = new Blob(['\ufeff', tableHTML], {
					type: dataType,
				});
				navigator.msSaveOrOpenBlob(blob, filename);
			} else {
				downloadLink.href = `data:${dataType}, ${tableHTML}`;
				downloadLink.download = filename;
				downloadLink.click();
			}
		},
		callApiGetAll() {
			this.ListSalary = [];
			this.searched = [];
			this.$gateway
				.post(`/salary/get-all-salary`,{
					value: {
						month: this.month,
						year: this.year,
					},
					hashed: 'string',
				})
				.then(response => {
					const repons = response.data.value;
					if (repons !== null) {
						repons.forEach(element => {
							this.ListSalary.push(element);
						});
						this.searched = this.ListSalary;
					}
				});
		},
		searchluong(m, y) {
			this.month = m;
			this.year = y;
			this.callApiGetAll();
		},
	},
	created() {
		this.callApiGetAll();
	},
};
