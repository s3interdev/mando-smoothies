const User = require('../models/User');
const jwt = require('jsonwebtoken');

/** handling errors */
const handleErrors = (err) => {
	// console.log(err.message, err.code);
	let errors = { email: '', password: '' };

	/** incorrect email address */
	if (err.message === 'Incorrect email address.') {
		errors.email = 'The email address is not registered.';
	}

	/** incorrect password */
	if (err.message === 'Incorrect password.') {
		errors.password = 'The password is not valid.';
	}

	/** duplicate error code */
	if (err.code === 11000) {
		errors.email = 'The email address is already registered.';
	}

	/** valdation errors */
	if (err.message.includes('user validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}

	return errors;
};

/** create jsaon web tokens */
const jwtSecret = process.env.PRIVATE_KEY;
const jwtMaxAge = process.env.JWT_MAX_AGE; /** 3 * 24 * 60 * 60 = 259000 (3 days) */
const cookieMaxAge = process.env.COOKIE_MAX_AGE; /** 259000 * 1000 = 259000000 (ms) */
const createToken = (id) => {
	return jwt.sign({ id }, jwtSecret, { expiresIn: jwtMaxAge });
};

module.exports.signupGet = (req, res) => {
	res.render('auth/signup');
};

module.exports.signupPost = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.create({ email, password });
		const token = createToken(user._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: cookieMaxAge });
		res.status(201).json({ user: user._id });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.signinGet = (req, res) => {
	res.render('auth/signin');
};

module.exports.signinPost = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.signin(email, password);
		const token = createToken(user._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: cookieMaxAge });
		res.status(200).json({ user: user._id });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.signoutGet = (req, res) => {
	res.cookie('jwt', '', { maxAge: 1 });
	res.redirect('/');
};
