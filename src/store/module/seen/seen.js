export const SET_HOTELSEEN = 'setHotelSeen';
export default {
	namespaced: true,
	state: {
		hotelSeen: [],
	},
	getters: {
		hotelSeen: state => state.hotelSeen,
	},
	mutations: {
		[SET_HOTELSEEN]: (state, payload) => {
			if ( Array.isArray(payload)) {
				
				state.hotelSeen=payload;
			} 
		},
	},
	actions: {
	},
};
