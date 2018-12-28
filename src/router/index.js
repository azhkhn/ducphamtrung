import VueRouter from 'vue-router';
import Vue from 'vue';
import { routeParser } from 'vue-i18n-manager';
import { PropertyNames, VariableNames } from 'data/enum/configNames';
import getLocaleConfig from 'config/localeConfig';
import { CONFIG_MANAGER } from 'data/Injectables';
import { getValue } from 'util/injector';
import { eventHub } from 'control/startUp';

import routes from './routes';

Vue.use(VueRouter);

let router = null;

const getRouter = () => {
	if (!router) {
		const localeConfig = getLocaleConfig();
		const configManager = getValue(CONFIG_MANAGER);

		const processedRoutes =
			localeConfig.localeEnabled && localeConfig.localeRoutingEnabled
				? routeParser(routes, configManager.getProperty(PropertyNames.DEFAULT_LOCALE))
				: routes.concat({
						path: '*',
						redirect: '/',
					});

		router = new VueRouter({
			mode: 'history',
			routes: processedRoutes,
			base: configManager.getVariable(VariableNames.PUBLIC_PATH),
			linkActiveClass: 'active', // active class for non-exact links.
			linkExactActiveClass: 'active', // active class for exact links.
		});
		router.beforeEach((to, from, next) => {
			document.title = `${to.name}`;
			// ${to.name}
			eventHub.$emit('path-changed', to.path);
			next();
		});
	}

	return router;
};

export default getRouter;
