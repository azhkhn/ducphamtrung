import buy, {
	SET_TOTAL,
	SET_BOOKINGS,
	SET_HOTEL,
	SET_CURRENT,
	SET_SERVICE,
	SET_PAYMENT,
	SET_VIEWBOOKING,
	SET_CURRENT_DASHBOARD,
	SET_COUPON,
	SET_PRICE,
	SET_BOOKINGSTATUS,
} from './buy';

export const BuyNamespace = 'buy';

export const BuyMutationTypes = {
	SET_TOTAL: `${BuyNamespace}/${SET_TOTAL}`,
	SET_BOOKINGS: `${BuyNamespace}/${SET_BOOKINGS}`,
	SET_HOTEL: `${BuyNamespace}/${SET_HOTEL}`,
	SET_CURRENT: `${BuyNamespace}/${SET_CURRENT}`,
	SET_CURRENT_DASHBOARD: `${BuyNamespace}/${SET_CURRENT_DASHBOARD}`,
	SET_SERVICE: `${BuyNamespace}/${SET_SERVICE}`,
	SET_PAYMENT: `${BuyNamespace}/${SET_PAYMENT}`,
	SET_VIEWBOOKING: `${BuyNamespace}/${SET_VIEWBOOKING}`,
	SET_COUPON: `${BuyNamespace}/${SET_COUPON}`,
	SET_PRICE: `${BuyNamespace}/${SET_PRICE}`,
	SET_BOOKINGSTATUS: `${BuyNamespace}/${SET_BOOKINGSTATUS}`,
};

export default buy;
