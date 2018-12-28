import user, {
	SET_USER_INFO,
	SET_ACCESS_TOKEN,
	SET_CURRENT_MENU,
	SET_USER_ID,
	SET_LANGCODE,
	SET_CURRENTCY,
	SET_RATE,
	SET_RATEALL,
	SET_ROLE,
} from './user';

export const UserNamespace = 'user';

export const UserMutationTypes = {
	SET_USER_INFO: `${UserNamespace}/${SET_USER_INFO}`,
	SET_ACCESS_TOKEN: `${UserNamespace}/${SET_ACCESS_TOKEN}`,
	SET_CURRENT_MENU: `${UserNamespace}/${SET_CURRENT_MENU}`,
	SET_USER_ID: `${UserNamespace}/${SET_USER_ID}`,
	SET_LANGCODE: `${UserNamespace}/${SET_LANGCODE}`,
	SET_CURRENTCY: `${UserNamespace}/${SET_CURRENTCY}`,
	SET_RATE: `${UserNamespace}/${SET_RATE}`,
	SET_RATEALL: `${UserNamespace}/${SET_RATEALL}`,
	SET_ROLE: `${UserNamespace}/${SET_ROLE}`,
};

export default user;
