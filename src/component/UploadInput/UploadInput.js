export default {
	name: 'UploadInput',
	data() {
		return {
			file: '',
		};
	},
	directives: {
		uploader: {
			bind(el, binding, vnode) {
				el.addEventListener('change', e => {
					vnode.context.file = e.target.files[0];
				});
			},
		},
	},
	watch: {
		file(val) {
			this.$emit('file-chosen', val);
		},
	},
	methods: {
		launchFilePicker() {
			this.$refs.file.click();
		},
	},
};
