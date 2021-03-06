import { EnvironmentNames, PropertyNames, URLNames, VariableNames } from 'data/enum/configNames';

const config = {
	environments: {
		[EnvironmentNames.PRODUCTION]: {
			variables: {},
			urls: {},
		},
		[EnvironmentNames.STAGING]: {
			extends: EnvironmentNames.PRODUCTION,
			variables: {},
			urls: {},
		},
		[EnvironmentNames.DEVELOPMENT]: {
			extends: EnvironmentNames.STAGING,
			variables: {},
			urls: {},
		},
		[EnvironmentNames.LOCAL]: {
			extends: EnvironmentNames.DEVELOPMENT,
			variables: {},
			urls: {},
		},
	},
	variables: {
		[VariableNames.LOCALE_ENABLED]: true,
		[VariableNames.LOCALE_ROUTING_ENABLED]: false,
		[VariableNames.VERSIONED_STATIC_ROOT]: process.env.VERSIONED_STATIC_ROOT,
		[VariableNames.STATIC_ROOT]: process.env.STATIC_ROOT,
		[VariableNames.PUBLIC_PATH]: process.env.PUBLIC_PATH,
	},
	urls: {
		[URLNames.LOCALE]: `${process.env.VERSIONED_STATIC_ROOT}locale/{locale}.json`,
		[URLNames.API]: `${process.env.PUBLIC_PATH}api/`,
	},
	properties: {
		[PropertyNames.DEFAULT_LOCALE]: 'vi',
		[PropertyNames.AVAILABLE_LOCALES]: ['en', 'vi'],
	},
};

let environment = EnvironmentNames.PRODUCTION;
const { host } = document.location;

switch (host.split(':').shift()) {
	case 'localhost': {
		environment = EnvironmentNames.LOCAL;
		break;
	}
	default: {
		environment = EnvironmentNames.PRODUCTION;
		break;
	}
}

export default {
	config,
	environment,
};
