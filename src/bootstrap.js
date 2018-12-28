import 'polyfill';
import 'asset/style/screen.scss';
import 'modernizr';
import 'settings';
import 'vue-awesome/icons';
import Vue from 'vue';
import filter from 'filter';
import directive from 'directive';
import component from 'component';
import getRouter from 'router';
import getStore from 'store';
import startUp from 'control/startUp';
import getLocaleConfig from 'config/localeConfig';
import VueI18nManager from 'vue-i18n-manager';
import { sync } from 'vuex-router-sync';
import setupInjects from 'util/setupInjects';
import localeLoader from 'util/localeLoader';
import BootstrapVue from 'bootstrap-vue';
import App from 'App';
import VeeValidate from 'vee-validate';
import VueLoading from 'vuex-loading';
import axios from 'axios';
import Icon from 'vue-awesome/components/Icon';
import * as VueGoogleMaps from 'vue2-google-maps';
import vueSlider from 'vue-slider-component';
import ReadMore from 'vue-read-more';
import Multiselect from 'vue-multiselect';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
import '../node_modules/vue-multiselect/dist/vue-multiselect.min.css';
import '../node_modules/vue2-slot-calendar/lib/calendar.min.css';
import VueLazyload from 'vue-lazyload';
import Calendar from 'vue2-slot-calendar';
import BackToTop from 'vue-backtotop';
import VueSweetalert2 from 'vue-sweetalert2';
import VTooltip from 'v-tooltip';
import VueHtmlToPaper from 'vue-html-to-paper';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import VModal from 'vue-js-modal';
import { Carousel } from 'bootstrap-vue/es/components';
import { Tabs, Tab } from 'vue-tabs-component';
import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';
import VueApexCharts from 'vue-apexcharts';
import PrettyCheckbox from 'pretty-checkbox-vue';

Vue.use(PrettyCheckbox);
Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);
Vue.use(Donut);

Vue.component('tabs', Tabs);
Vue.component('tab', Tab);
Vue.use(Carousel);

Vue.use(VModal);
Vue.use(VueMaterial);
Vue.use(Calendar);
const options = {
	name: '_blank',
	specs: ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
	styles: [
		'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
		'https://unpkg.com/kidlat-css/css/kidlat.css',
	],
};
Vue.use(VueHtmlToPaper, options);
Vue.use(VueSweetalert2);
Vue.use(VTooltip);
Vue.use(BackToTop);
Vue.use(VueLazyload);
Vue.use(require('vue-moment'));

Vue.use(Multiselect);
Vue.use(axios);
Vue.use(BootstrapVue);
Vue.use(vueSlider);
Vue.use(VueLoading);
Vue.use(VeeValidate);
Vue.use(ReadMore);
Vue.component('icon', Icon);
Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyAeK1uud1YLBhNy_fXH4H2QrtdOqstVAvk',
		libraries: 'places',
	},
});

// register filters globally
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]));
// register directives globally
Object.keys(directive).forEach(key => Vue.directive(key, directive[key]));
// register components globally
Object.keys(component).forEach(key => Vue.component(key, component[key]));

setupInjects();

const router = getRouter();
const store = getStore();
const localeConfig = getLocaleConfig();

if (localeConfig.localeEnabled) {
	Vue.use(VueI18nManager, {
		store,
		router,
		config: localeConfig.config,
		proxy: localeLoader,
	});

	Vue.initI18nManager();
}
// sync router data to store
sync(store, router);
// Init new vue app
const app = new Vue({
	router,
	store,
	render: createElement => createElement(App),
	vueLoading: new VueLoading({ registerComponents: false }),
});
// Mount the app after startUp
startUp(store).then(() => app.$mount('#app'));
