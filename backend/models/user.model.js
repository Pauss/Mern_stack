const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const saltRounds = 12;

//add the rest of elements necessary for an User object, like email
const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			// trim: true,
			// minLength: 3,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			// trim: true,
		},
		password: {
			type: String,
			required: true,
			unique: true,
			// trim: true,
			// minLength: 3,
		},
	},
	{
		timestamps: true,
	}
);
//https://github.com/faizanv/react-auth-example/blob/master/models/User.js

userSchema.pre('save', function(next) {
	if (this.isNew || this.isModified('password')) {
		const document = this;
		bcrypt.hash(this.password, saltRounds, function(err, hashedPassword) {
			if (err) {
				next(err);
			} else {
				document.password = hashedPassword;
				next();
			}
		});
	} else {
		next();
	}
});

userSchema.methods.isCorrectPassword = function(password, callback) {
	bcrypt.compare(password, this.password, function(err, same) {
		if (err) {
			callback(err);
		} else {
			callback(err, same);
		}
	});
};

const User = mongoose.model('User', userSchema);

module.exports = User;

//provide createUser function where password is encprypted TODO
// module.exports.createUser = function(newUser){

// }
//provide also function in order to CofirmPassword :
// Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
//     // res == true
// });
