import HomePage from 'page/HomePage';
import Test from 'page/Test';
import Test2 from 'page/Test2';
import Login from 'page/Login';
import PagePaths from 'data/enum/PagePaths';
import PageNames from 'data/enum/PageNames';
import Register from 'page/Register';
import Hotels from 'page/Hotels';
import B2b from 'component/B2b';
import Outside from 'component/Outside';
import HotelsOfTA from 'component/HotelsOfTA';
import ApplyforAccess from 'component/ApplyforAccess';
import DashBroad from 'component/DashBroad';
import AvaiSearch from 'component/AvaiSearch';
import ResultSearch from 'component/ResultSearch';
import DetailSearch from 'component/DetailSearch';
import Counter from 'component/Counter';
import ViewBooking from 'component/ViewBooking';
import Payment from 'component/PayMent';
import PaymentDetail from 'component/PaymentDetail';
import PageActive from 'component/PageActive';
import ReservationSearch from 'component/ReservationSearch';
import ChartDashBoard from 'component/ChartDashBoard';
import DashBoard from 'component/Dashboard';

export default [
	{
		path: PagePaths.HOME,
		component: Login,
		name: 'Login',
	},
	{
		path: 'login',
		component: Login,
		name: 'Login',
		meta: {
			isAnonymous: false,
		},
	},
	{
		path: '/activeTravelAgent',
		component: PageActive,
		name: 'PageActive',
		meta: {
			isAnonymous: true,
		},
	},

	{
		path: '/outside',
		component: Outside,
		name: 'Outside',
		children: [
			{
				path: 'register',
				component: Register,
				name: 'Register',
				meta: {
					isAnonymous: true,
				},
			},
		],
		meta: {
			isAnonymous: true,
		},
	},

	{
		path: '/b2b',
		component: B2b,
		name: 'B2b',
		// meta: {
		// 	isAnonymous: true,
		// },
		children: [
			{
				path: 'hotelsofta',
				component: HotelsOfTA,
				name: 'Hotels Of TA - B2B Platform',
				props: true,
			},
			{
				path: 'reservationSearch',
				component: ReservationSearch,
				name: 'Reservation Search - B2B Platform',
			},
			{
				path: 'chartDashBoard',
				component: ChartDashBoard,
				name: 'Report - B2B Platform',
			},
			{
				path: 'dashbroad',
				component: DashBroad,
				name: 'Profile - B2B Platform',
				props: true,
			},

			{
				path: 'avaiSearch',
				component: AvaiSearch,
				name: 'Available Search - B2B Platform',
				props: true,
			},
			{
				path: 'resultSearch',
				component: ResultSearch,
				name: 'Result Search - B2B Platform',
				// meta: {
				// 	isAnonymous: true,
				// },
				props: true,
			},
			{
				path: 'detailSearch',
				component: DetailSearch,
				name: 'Detail Search - B2B Platform',
				// meta: {
				// 	isAnonymous: true,
				// },
				props: true,
			},
			{
				path: 'counter',
				component: Counter,
				name: 'Counter - B2B Platform',
				// meta: {
				// 	isAnonymous: true,
				// },
			},
			{
				path: 'payment',
				component: Payment,
				name: 'Payment - B2B Platform',
				// meta: {
				// 	isAnonymous: true,
				// },
				props: true,
			},
			{
				path: 'paymentdetail',
				component: PaymentDetail,
				name: 'Payment Detail - B2B Platform',
				// meta: {
				// 	isAnonymous: true,
				// },
				props: true,
			},
			{
				path: 'viewbooking',
				component: ViewBooking,
				name: 'Booking Detail - B2B Platform',
				// meta: {
				// 	isAnonymous: true,
				// },
				props: true,
			},
			{
				path: 'dashboard',
				component: DashBoard,
				name: 'DashBoard - K65BC TEAM',
				props: true,
			},
		],
	},
];
