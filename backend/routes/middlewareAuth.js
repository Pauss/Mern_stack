const authCheck = ({ session }, res, next) => {
	console.log(session);

	if (!session.userId) {
		res
			.status(400)
			.send('User must login in order to have access!')
			.end();
		return;
	}

	next();
};

module.exports = authCheck;
