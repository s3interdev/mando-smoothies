const express = require('express');
const cookieParser = require('cookie-parser');

const { signedinUser } = require('../middleware/authMiddleware');

const home = require('../routes/homeRoute');
const auth = require('../routes/authRoute');
const smoothies = require('../routes/smoothiesRoute');

module.exports = function (app) {
	app.set('view engine', 'ejs');
	app.use(express.static('public'));
	app.use(express.json());
	app.use(cookieParser());
	app.get('*', signedinUser);
	app.use(home);
	app.use(auth);
	app.use(smoothies);
};
