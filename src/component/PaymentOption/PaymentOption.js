const items = [
	{ cash_agent: 'No credit limit is assigned', credit_agent: 'Will be assigned a credit limit' },
	{ cash_agent: 'No floating deposit is required', credit_agent: 'A floating deposit is required' },
	{
		cash_agent: 'Not able to issue voucher until payment is made',
		credit_agent: 'Voucher can be issued soon after the confirmation of booking',
	},
	{
		cash_agent: 'Reservation can be made with a live credit card & Debit Card',
		credit_agent: 'Reservation can be made with a live credit card & Debit Card',
	},
	{
		cash_agent: 'Need to make payment though Credit and Debit card prior to the cancellation deadline',
		credit_agent:
			'Credit amounts will be adjusted based against Credit limits & BedLinker’s payment / invoice rules',
	},
	{
		cash_agent: 'Can directly voucher the booking once the payment done by credit and debit card',
		credit_agent: 'Can voucher the booking instantly through Credit Limits',
	},
	{
		cash_agent: 'Can make bookings within Cancellation period',
		credit_agent: 'Can make bookings within Cancellation period',
	},
	{
		cash_agent: 'Cannot Confirm the booking can only Voucher',
		credit_agent: 'Can Confirm the Booking without vouchering',
	},
];

export default {
	name: 'PaymentOption',
	data() {
		return {
			items,
		};
	},
};
