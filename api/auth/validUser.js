const isValidRegistration = (user) => {
	return Boolean(
		typeof user.username === 'string' &&
			typeof user.password === 'string' &&
			typeof user.department === 'string'
	);
};

const isValidLogin = (user) => {
	return Boolean(
		typeof user.username === 'string' && typeof user.password === 'string'
	);
};

module.exports = {
	isValidRegistration,
	isValidLogin,
};
