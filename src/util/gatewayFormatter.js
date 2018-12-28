export const errorFormatter = error => {
	if (error && error.data.error) {
		const response = { config: error.config, ...error, ...error.data };
		// delete data to avoid confusion
		delete response.data;
		return response;
	}
	return error;
};

export const responseFormatter = response => {
	if (response.data && response.data.data) {
		return { ...response, ...response.data };
	}
	return response;
};
