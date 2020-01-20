const express = require('express');
const cors = require('cors'); // 'corss origin resource sharing' => acces sources from remote server
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require('dotenv').config(); // loads env variables from a file .env

const TWO_HOURS = 1000 * 60 * 60 * 2;

const { PORT = 4000, SESS_LIFETIME = TWO_HOURS, SESS_NAME = 'sid', SESS_SECRET = 'first login attempt' } = process.env;

const app = express();
//const port = process.env.port || 4000;

// app.use middleware's
app.use(cors());
app.use(express.json()); // same as bodyParser.json()

// mongodb connection
const uri = 'mongodb://localhost/mernStackDb'; //TODO mongodb://username:password@host:port/database

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
const authRouter = require('./routes/auth');

app.use(
	session({
		name: SESS_NAME,
		resave: false,
		saveUninitialized: false,
		secret: SESS_SECRET,
		cookie: {
			maxAge: SESS_LIFETIME,
			sameSite: true, //or strict
		},
		store: new MongoStore({ mongooseConnection: connection }),
		rolling: true,
	})
);

app.use('/auth', authRouter);
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
