const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const CryptoUser = require('../models/cryptoUser');

const registerCryptoUser = require('../config/registerCryptoUser'); // Import the registration function
//login get

router.get('/login', (req, res) => {
	res.render('login');
});

//login post

router.post('/login', (req, res, next) => {
	passport.authenticate('userLocal', {
		successRedirect: '/cryptoProfile',
		failureRedirect: '/login',
		failureFlash: true,
	})(req, res, next);
});

//signup get

router.get('/register', (req, res, next) => {
	res.render('register');
});

router.post('/register', registerCryptoUser);

// user sign out

router.get('/logout', (req, res) => {
	// Use a callback function for req.logout() to ensure it completes before continuing
	req.logout(function (err) {
		if (err) {
			console.error(err);
		}
		req.flash('success_msg', 'You have successfully logged out');
		res.redirect('/');
	});
});
module.exports = router;
