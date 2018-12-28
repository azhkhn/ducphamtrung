import rememberMe, {
	SET_REMEMBERPASSWORD,
	SET_REMEMBER_AGENT,
	SET_REMEMBER_USERNAME,
	SET_REMEMBER_FULLNAME,
} from './rememberMe';

export const RememberMeNamespace = 'rememberMe';

export const RememberMeMutationTypes = {
	SET_REMEMBERPASSWORD: `${RememberMeNamespace}/${SET_REMEMBERPASSWORD}`,
	SET_REMEMBER_AGENT: `${RememberMeNamespace}/${SET_REMEMBER_AGENT}`,
	SET_REMEMBER_USERNAME: `${RememberMeNamespace}/${SET_REMEMBER_USERNAME}`,
	SET_REMEMBER_FULLNAME: `${RememberMeNamespace}/${SET_REMEMBER_FULLNAME}`,
};

export default rememberMe;
