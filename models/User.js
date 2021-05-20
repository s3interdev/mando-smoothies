const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Please enter your email address.'],
		unique: true,
		lowercase: true,
		validate: [isEmail, 'Please enter a valid email address.'],
	},
	password: {
		type: String,
		required: [true, 'Please enter your password.'],
		minlength: [
			6,
			"Your password doesn't meet the minimum length requirement of 6 characters.",
		],
	},
});

/** hash a password before the document is saved to MongoDB */
userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

/** static method to sign in user */
userSchema.statics.signin = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error('Incorrect password.');
	}
	throw Error('Incorrect email address.');
};

const User = mongoose.model('user', userSchema);

module.exports = User;
