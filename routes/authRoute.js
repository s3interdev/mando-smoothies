const { Router } = require('express');

const {
	signupGet,
	signupPost,
	signinGet,
	signinPost,
	signoutGet,
} = require('../controllers/authController');

const router = Router();

router.get('/signup', signupGet);

router.post('/signup', signupPost);

router.get('/signin', signinGet);

router.post('/signin', signinPost);

router.get('/signout', signoutGet);

module.exports = router;
