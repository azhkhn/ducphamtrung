/* eslint-disable no-dupe-keys */
const toLower = text => text.toString().toLowerCase();
const searchByName = (items, term) => {
	if (term) {
		return items.filter(item => toLower(item.name).includes(toLower(term)));
	}

	return items;
};
export default {
	name: 'Danhsachkt',
	data() {
		return {
			options: [10, 20, 30],
			search: null,
			searched: [],
			users: [
				{
					id: 1,
					name: 'Shawna Dubbin',
					email: 'sdubbin0@geocities.com',
					gender: 'Male',
					title: 'Assistant Media Planner',
				},
				{
					id: 2,
					name: 'Odette Demageard',
					email: 'odemageard1@spotify.com',
					gender: 'Female',
					title: 'Account Coordinator',
				},
				{
					id: 3,
					name: 'Vera Taleworth',
					email: 'vtaleworth2@google.ca',
					gender: 'Male',
					title: 'Community Outreach Specialist',
				},
				{
					id: 4,
					name: 'Lonnie Izkovitz',
					email: 'lizkovitz3@youtu.be',
					gender: 'Female',
					title: 'Operator',
				},
				{
					id: 5,
					name: 'Thatcher Stave',
					email: 'tstave4@reference.com',
					gender: 'Male',
					title: 'Software Test Engineer III',
				},
				{
					id: 6,
					name: 'Karim Chipping',
					email: 'kchipping5@scribd.com',
					gender: 'Female',
					title: 'Safety Technician II',
				},
				{
					id: 7,
					name: 'Helge Holyard',
					email: 'hholyard6@howstuffworks.com',
					gender: 'Female',
					title: 'Internal Auditor',
				},
				{
					id: 8,
					name: 'Rod Titterton',
					email: 'rtitterton7@nydailynews.com',
					gender: 'Male',
					title: 'Technical Writer',
				},
				{
					id: 9,
					name: 'Gawen Applewhite',
					email: 'gapplewhite8@reverbnation.com',
					gender: 'Female',
					title: 'GIS Technical Architect',
				},
				{
					id: 10,
					name: 'Nero Mulgrew',
					email: 'nmulgrew9@plala.or.jp',
					gender: 'Female',
					title: 'Staff Scientist',
				},
				{
					id: 11,
					name: 'Cybill Rimington',
					email: 'crimingtona@usnews.com',
					gender: 'Female',
					title: 'Assistant Professor',
				},
				{
					id: 12,
					name: 'Maureene Eggleson',
					email: 'megglesonb@elpais.com',
					gender: 'Male',
					title: 'Recruiting Manager',
				},
				{
					id: 13,
					name: 'Cortney Caulket',
					email: 'ccaulketc@cbsnews.com',
					gender: 'Male',
					title: 'Safety Technician IV',
				},
				{
					id: 14,
					name: 'Selig Swynfen',
					email: 'sswynfend@cpanel.net',
					gender: 'Female',
					title: 'Environmental Specialist',
				},
				{
					id: 15,
					name: 'Ingar Raggles',
					email: 'iragglese@cbc.ca',
					gender: 'Female',
					title: 'VP Sales',
				},
				{
					id: 16,
					name: 'Karmen Mines',
					email: 'kminesf@topsy.com',
					gender: 'Male',
					title: 'Administrative Officer',
				},
				{
					id: 17,
					name: 'Salome Judron',
					email: 'sjudrong@jigsy.com',
					gender: 'Male',
					title: 'Staff Scientist',
				},
				{
					id: 18,
					name: 'Clarinda Marieton',
					email: 'cmarietonh@theatlantic.com',
					gender: 'Male',
					title: 'Paralegal',
				},
				{
					id: 19,
					name: 'Paxon Lotterington',
					email: 'plotteringtoni@netvibes.com',
					gender: 'Female',
					title: 'Marketing Assistant',
				},
				{
					id: 20,
					name: 'Maura Thoms',
					email: 'mthomsj@webeden.co.uk',
					gender: 'Male',
					title: 'Actuary',
				},
			],
		};
	},
	methods: {
		searchOnTable() {
			this.searched = searchByName(this.users, this.search);
		},
	},
	created() {
		this.searched = this.users;
	},
	methods: {
		taomoi(modal) {
			this.$root.$emit('bv::show::modal', modal);
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
	},
};
