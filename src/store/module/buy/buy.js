export const SET_TOTAL = 'setTotal';
export const SET_BOOKINGS = 'setBookings';
export const SET_HOTEL = 'setHotel';
export const SET_CURRENT = 'setCurrent';
export const SET_SERVICE = 'setService';
export const SET_PAYMENT = 'setPayment';
export const SET_VIEWBOOKING = 'setViewbooking';
export const SET_CURRENT_DASHBOARD = 'setCurrentDashboard';
export const SET_COUPON = 'coupon';
export const SET_PRICE = 'price';
export const SET_BOOKINGSTATUS = 'bookingStatus';

export default {
	namespaced: true,
	state: {
		total: '',
		bookings: [],
		hotel: {
			idhotel: 0,
		},
		curr: {
			currentview: '',
			currentViewDashboard: '',
		},
		service: {
			serviceResult: '',
		},
		payment: null,
		viewbooking: null,
		coupon:'',
		price:[],
		bookingStatus:'',
	},
	getters: {
		total: state => `${state.total}`,
		bookings: state => state.bookings,
		hotel: state => state.hotel,
		curr: state => state.curr,
		service: state => state.service,
		payment: state => state.payment,
		viewbooking: state => state.viewbooking,
		coupon: state => state.coupon,
		price: state => state.price,
		bookingStatus: state => state.bookingStatus,
	},
	mutations: {
		[SET_BOOKINGSTATUS]: (state, payload) => {
			state.bookingStatus = payload;
		},
		[SET_TOTAL]: (state, payload) => {
			state.total = '0';
			state.total = payload;
			// if (state.total !== '') {
			// 	state.total = '0';
			// }
			// state.total = payload;
		},
		[SET_COUPON]: (state, payload) => {
			state.coupon = payload;
		},
		[SET_BOOKINGS]: (state, payload) => {
			if (Array.isArray(payload)) {
				state.bookings = payload;
			} else {
				state.bookings.splice(payload, 1);
			}
		},
		[SET_HOTEL]: (state, payload) => {
			state.hotel.idhotel = payload.idhotel;
		},
		[SET_CURRENT]: (state, payload) => {
			state.curr.currentview = payload;
		},
		[SET_CURRENT_DASHBOARD]: (state, payload) => {
			state.curr.currentViewDashboard = payload;
		},
		[SET_SERVICE]: (state, payload) => {
			state.service.serviceResult = payload;
		},
		[SET_PAYMENT]: (state, payload) => {
			state.payment = payload;
		},
		[SET_VIEWBOOKING]: (state, payload) => {
			state.viewbooking = payload;
		},
		[SET_PRICE]: (state, payload) => {
			if (Array.isArray(payload)) {
				state.price = payload;
			} else {
				state.price.splice(payload, 1);
			}
		},
	},
	actions: {},
};
