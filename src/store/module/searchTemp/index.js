import searchTemp, { SET_TEMP, SET_SIMILAR, SET_SEEN } from './searchTemp';

export const SearchTempNamespace = 'searchTemp';

export const SearchTempMutationTypes = {
	SET_TEMP: `${SearchTempNamespace}/${SET_TEMP}`,
	SET_SIMILAR: `${SearchTempNamespace}/${SET_SIMILAR}`,
	SET_SEEN: `${SearchTempNamespace}/${SET_SEEN}`,
};

export default searchTemp;
