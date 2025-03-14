const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const CryptoUser = require('../models/cryptoUser');
const { generateOTP, verifyOTP } = require('../config/optHandler');
const { sendOTP } = require('../config/nodemailer');

const registerCryptoUser = require('../config/registerCryptoUser'); // Import the registration function

router.get('/login', (req, res) => {
	res.render('login');
});

router.post('/login', (req, res, next) => {
	passport.authenticate('userLocal', async (err, user, info) => {
		if (err) return next(err);
		if (!user) {
			req.flash('error_msg', 'Invalid credentials');
			return res.redirect('/login');
		}

		// Generate OTP
		const otp = generateOTP();
		req.session.otp = otp;
		req.session.userId = user.id;

		// Send OTP via email
		await sendOTP(user.email, otp);

		// Redirect to OTP confirmation page
		res.redirect('/confirm');
	})(req, res, next);
});

router.post('/confirm', async (req, res) => {
	const { otp } = req.body;
	const userId = req.session.userId;


	if (!userId || !req.session.otp) {
		req.flash('error_msg', 'Session expired. Please login again.');
		return res.redirect('/login');
	}

	// Verify OTP
	if (verifyOTP(req.session.otp, otp)) {
		try {
			// Fetch the user from the database
			const user = await CryptoUser.findById(userId);

			if (!user) {
				req.flash('error_msg', 'User not found. Please login again.');
				return res.redirect('/login');
			}

			// Use req.login() to establish a session
			req.login(user, (err) => {
				if (err) {
					console.error(err);
					req.flash('error_msg', 'Authentication error. Try again.');
					return res.redirect('/login');
				}

				

				// Clear OTP from session
				delete req.session.otp;

				// Redirect to crypto profile
				return res.redirect('/cryptoProfile');
			});
		} catch (error) {
			console.error('Error logging in user:', error);
			req.flash('error_msg', 'An error occurred. Try again.');
			return res.redirect('/login');
		}
	} else {
		req.flash('error_msg', 'Invalid OTP. Try again.');
		return res.redirect('/confirm');
	}
});

router.get('/register', (req, res, next) => {
	res.render('register');
});

router.post('/register', registerCryptoUser);

router.get('/confirm', (req, res) => {
	res.render('confirmLoginAddress');
});

router.get('/logout', (req, res) => {
	req.logout(function (err) {
		if (err) {
			console.error(err);
		}
		req.flash('success_msg', 'You have successfully logged out');
		res.redirect('/');
	});
});
module.exports = router;
