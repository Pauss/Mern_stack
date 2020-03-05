const router = require('express').Router();
let Exercises = require('../models/exercises.model');
const checkAuthRouter = require('./middlewareAuth');

router.route('/').get(checkAuthRouter, (req, res) => {
	console.log(req.session);

	Exercises.find()
		.then((exercises) => res.json(exercises))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post(checkAuthRouter, (req, res) => {
	const username = req.body.username;
	const description = req.body.description;
	const duration = req.body.duration;
	const date = Date.parse(req.body.date);

	const newExercise = new Exercises({
		username,
		description,
		duration,
		date,
	});

	newExercise
		.save()
		.then(() => res.json('Exercise added!'))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/update/:id').put(checkAuthRouter, (req, res) => {
	console.log('/update');
	Exercises.findByIdAndUpdate(req.params.id, req.body)
		.then((exercise) => res.json(exercise))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/update/:id').put(checkAuthRouter, (req, res) => {
	Exercises.findById(req.params.id)
		.then((exercise) => {
			exercise.username = req.body.username;
			exercise.description = req.body.description;
			exercise.duration = req.body.duration;
			exercise.date = req.body.date;

			exercise
				.save()
				.then(() => res.json('Exercise updated!'))
				.catch((err) => res.status(400).json(`Error: ${err}`));
		})
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete(checkAuthRouter, (req, res) => {
	Exercises.findByIdAndRemove(req.params.id)
		.then(() => res.json('Exercise removed from Db!'))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get(checkAuthRouter, (req, res) => {
	Exercises.findById(req.params.id)
		.then((exercise) => res.json(exercise))
		.catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
