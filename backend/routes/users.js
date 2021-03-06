const router = require('express').Router();
let User = require('../models/user.model');
const checkAuthRouter = require('./middlewareAuth');

router.route('/').get(checkAuthRouter, (req, res) => {
	User.find()
		.then((users) => res.json(users))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post(checkAuthRouter, (req, res) => {
	const username = req.body.username;

	const newUser = new User({ username });

	newUser
		.save()
		.then(() => res.json('User added!'))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/update/:id').put(checkAuthRouter, (req, res) => {
	User.findByIdAndUpdate({ _id: req.params.id }, req.body)
		.then((user) => res.json(user))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete(checkAuthRouter, (req, res) => {
	User.findByIdAndRemove({ _id: req.params.id })
		.then(() => res.json('User removed from Db!'))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
