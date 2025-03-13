const express = require('express');
const router = express.Router();
const CryptoUser = require('../models/cryptoUser');

const passport = require('../config/AdminPassport');
const { ensureAuthenticated } = require('../config/auth');

//login get

router.get('/admin', async (req, res) => {
	res.render('adminLogin');
});

//login post

router.post('/admin-login', (req, res, next) => {
	passport.authenticate('adminLocal', {
		successRedirect: '/adminLanding',
		failureRedirect: '/admin',
		failureFlash: true,
	})(req, res, next);
});

router.get('/adminLanding', async (req, res) => {
	res.render('adminLanding');
});

router.get('/crypto-user', async (req, res) => {
	try {
		const allUsers = await CryptoUser.find();
		res.render('cryptouser', { tickets: allUsers });
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

router.get('/edit-cryptouser/:id', async (req, res) => {
	// find through the req.params
	const ticket = await CryptoUser.findById(req.params.id);
	if (!ticket) {
		res.send('error, cannot get item');
	}
	res.render('editCryptoUser', { ticket });
});

router.post('/edit-cryptouser/:id', async (req, res) => {
	const { id } = req.params;
	const user = await CryptoUser.findById(id);
	const {
		fullname,
		email,
		telephone,
		username,
		accountBalance,
		totalProfit,
		totalBonus,
		withdrawal,
		deposit,
	} = req.body;

	if (!user) {
		res.send('error, cannot get item');
	}
	const editUser = await CryptoUser.findByIdAndUpdate(id, {
		fullname,
		email,
		telephone,
		username,
		accountBalance,
		totalProfit,
		totalBonus,
		withdrawal,
		deposit,
	});

	if (!editUser) {
		return res.send('error');
	}

	req.flash('success_msg', 'You have successfully update ' + email);
	res.redirect('/crypto-user');
});

router.get('/delete-cryptouser/:id', async (req, res) => {
	const ticketId = req.params.id;

	try {
		// Find the ticket by its ID and remove it from the database
		await CryptoUser.findByIdAndDelete(ticketId);

		// Redirect back to the page displaying all tickets after deletion
		req.flash('success_msg', 'Deleted successfully.');

		res.redirect('/crypto-user');
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

// Admin Logout

router.get('/admin-logout', (req, res) => {
	req.logout(function (err) {
		if (err) {
			console.error(err);
		}
		req.flash('success_msg', 'You have successfully logged out');
		res.redirect('/');
	});
});

router.get('/payment-redirect', ensureAuthenticated, async (req, res) => {
	req.flash(
		'success_msg',
		'Payment Made successfully, Please wait for your deposit to Confirmed'
	);
	res.redirect('/cryptoDeposit');
});

module.exports = router;
