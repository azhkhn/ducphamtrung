import { mixin as clickaway } from 'vue-clickaway';
import Ripple from 'vue-ripple-directive';

export default {
	mixins: [clickaway],
	directives: { Ripple },
	data() {
		return {
			toggle: false,
			pos: {},
			tooltipPosition: 'left',
		};
	},
	props: {
		bgColor: {
			default: '#333333',
		},
		position: {
			default: 'bottom-right',
		},
		positionType: {
			default: 'fixed',
		},
		zIndex: {
			default: '999',
		},
		rippleShow: {
			default: true,
		},
		rippleColor: {
			default: 'light',
		},
		mainIcon: {
			default: 'add',
		},
		iconSize: {
			default: 'medium',
		},
		mainTooltip: {
			default: null,
		},
		indexCart: {
			default: null,
		},
		fixedTooltip: {
			default: false,
		},
		actions: {
			default: () => [],
		},
	},
	computed: {
		actionIconSize() {
			switch (this.iconSize) {
				case 'small':{
					return 'md-18';
					break;
				}
				case 'medium':
					return 'md-24';
					break;
				case 'large':
					return 'md-36';
					break;
				default:
					return 'md-24';
			}
		},
		mainIconSize() {
			switch (this.iconSize) {
				case 'small':
					return 'md-24';
					break;
				case 'medium':
					return 'md-36';
					break;
				case 'large':
					return 'md-48';
					break;
				default:
					return 'md-36';
			}
		},
		paddingAmount() {
			switch (this.iconSize) {
				case 'small':
					return '28px';
					break;
				case 'medium':
					return '32px';
					break;
				case 'large':
					return '38px';
					break;
				default:
					return '32px';
			}
		},
		listPos() {
			if (this.position === 'top-right' || this.position === 'top-left') {
				return {
					top: '-20px',
					paddingTop: '20px',
				};
			}
			return {
				bottom: '-20px',
				paddingBottom: '20px',
			};
		},
		transitionEnter() {
			let animation = this.animation;
			return animation.enter;
		},
		transitionLeave() {
			let animation = this.animation;
			return animation.leave;
		},
		animation() {
			if (this.position === 'top-right' || this.position === 'top-left') {
				return {
					enter: 'animated quick fadeInDown',
					leave: 'animated quick fadeOutUp',
				};
			} else if (this.position === 'bottom-right' || this.position === 'bottom-left') {
				return {
					enter: 'animated quick fadeInUp',
					leave: 'animated quick fadeOutDown',
				};
			} else {
				return {
					enter: 'animated fadeInUp',
					leave: 'animated fadeOutDown',
				};
			}
		},
		tooltipTrigger() {
			if (this.fixedTooltip) {
				return 'manual';
			}

			return 'hover';
		},
	},
	methods: {
		eventBtn(){
			this.$emit('eventClick');
		},
		tooltipPos() {
			if (this.position === 'top-right' || this.position === 'bottom-right') {
				this.tooltipPosition = 'left';
			} else {
				this.tooltipPosition = 'right';
			}
		},
		toParent(name) {
			this.$emit(name);
			this.toggle = false;
		},
		away() {
			this.toggle = false;
		},
		setPosition() {
			this.pos = {};
			switch (this.position) {
				case 'bottom-right':
					this.pos.right = '5vw';
					this.pos.bottom = '4vh';
					break;
				case 'bottom-left':
					this.pos.left = '5vw';
					this.pos.bottom = '4vh';
					break;
				case 'top-left':
					this.pos.left = '5vw';
					this.pos.top = '4vh';
					break;
				case 'top-right':
					this.pos.right = '1vw';
					this.pos.top = '40vh';
					break;
				default:
					this.pos.right = '5vw';
					this.pos.top = '4vh';
			}
		},
		moveTransition() {
			let wrapper = document.getElementById(this.position + '-wrapper');
			let el = document.getElementById(this.position + '-action');

			if (this.position === 'top-right' || this.position === 'top-left') {
				wrapper.appendChild(el);
			} else {
				wrapper.insertBefore(el, wrapper.childNodes[0]);
			}
		},
		// showTooltip(show) {
		// 	if (show && this.actions.length && this.fixedTooltip) {
		// 		// timeout to prevent wrong position for the tooltip
		// 		setTimeout(() => {
		// 			this.$refs.actions.forEach(item => {
		// 				if (this.toggle) {
		// 					item._tooltip.show();
		// 				}
		// 			});
		// 		}, 700);
		// 	}
		// },
	},
	watch: {
		position(val) {
			this.setPosition();

			this.$nextTick(() => {
				this.moveTransition();
				this.tooltipPos();
			});
		},
		// toggle(val) {
		// 	this.showTooltip(val);
		// },
	},
	mounted() {
		this.moveTransition();
	},
	created() {
		this.setPosition();
	},
};
