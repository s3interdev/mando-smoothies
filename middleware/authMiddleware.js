const jwt = require('jsonwebtoken');

const User = require('../models/User');

const jwtSecret = process.env.PRIVATE_KEY;

const auth = (req, res, next) => {
	const token = req.cookies.jwt;

	/** check if jwt exists and is valid */
	if (token) {
		jwt.verify(token, jwtSecret, (err) => {
			if (err) {
				console.log(err.message);
				res.redirect('/signin');
			} else {
				next();
			}
		});
	} else {
		res.redirect('/signin');
	}
};

/** signed in user */
const signedinUser = (req, res, next) => {
	const token = req.cookies.jwt;

	/** check if jwt exists and is valid */
	if (token) {
		jwt.verify(token, jwtSecret, async (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.locals.user = null;
				next();
			} else {
				let user = await User.findById(decodedToken.id);
				res.locals.user = user;
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

module.exports = { auth, signedinUser };
