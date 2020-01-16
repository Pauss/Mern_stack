const express = require('express');
const cors = require('cors'); // 'corss origin resource sharing' => acces sources from remote server
const mongoose = require('mongoose');

require('dotenv').config(); // loads env variables from a file .env

const app = express();
const port = process.env.port || 4000;

// app.use middleware's
app.use(cors());
app.use(express.json()); // same as bodyParser.json()

// mongodb connection
const uri = 'mongodb://localhost/mernStackDb';

mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDb database connection established succesfully');
});

const exercisesRouter = require('./routes/exrecises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
