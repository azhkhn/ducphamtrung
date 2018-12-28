export default {
	name: 'ModalRegister',
	data() {
		return {
			currentView: 'TermOfServices',
		};
	},
	props: ['show'],
	methods: {
		savePost() {
			// Some save logic goes here...

			this.$emit('close');
		},
		close() {
			this.$emit('close');
		},
		// setCurrentView(dataEmit) {
		// 	console.log('Da nhan duoc Event', dataEmit);
		// 	if (typeof dataEmit === 'string' && dataEmit !== '' && dataEmit !== null) {
		// 		this.currentView = dataEmit;
		// 	}
		// },
	},
	mounted() {
		document.addEventListener('keydown', e => {
			if (this.show && e.keyCode === 27) {
				this.close();
			}
		});
	},
};
