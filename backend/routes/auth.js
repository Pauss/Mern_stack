const router = require('express').Router();
let User = require('../models/user.model');

router.route('/register').post(async (req, res) => {
	//validations TODO - in models?

	console.log(req.body);

	const { username, email, password } = req.body;

	//check if user already exists TODO

	//if validations ok then create user and add it to DB:
	const newUser = new User({ username, email, password });

	newUser
		.save()
		.then((user) => {
			//set a cookie for session
			req.session.userId = user.id;
			res.redirect('/login');
		})
		.catch((error) => {
			res.redirect('/register');
		});
});

router.route('/login').post((req, res) => {
	//validations TODO - in models?

	//set a cookie for session
	//req.session.userId = user.id;

	const { email, password } = req.body;
	User.findOne({ email }, function(err, user) {
		if (err) {
			console.error(err);
			res.status(500).json({
				error: 'Internal error please try again',
			});
		} else if (!user) {
			res.status(401).json({
				error: 'Incorrect email or password',
			});
		} else {
			user.isCorrectPassword(password, function(err, same) {
				if (err) {
					res.status(500).json({
						error: 'Internal error please try again',
					});
				} else if (!same) {
					res.status(401).json({
						error: 'Incorrect email or password',
					});
				} else {
					req.session.userId = user.id;
					console.log(req.session);
					res.redirect('/');
				}
			});
		}
	});
});

router.route('/logout').get((req, res) => {
	if (req.session.userId) {
		req.session.destroy(function(err) {
			res.redirect('/');
		});
	} else {
		res.redirect('/login');
	}
});

module.exports = router;
