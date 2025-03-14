const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const CryptoUser = require('../models/cryptoUser'); // Import User Model

// Ensure user is authenticated before accessing this route
router.get('/cryptoProfile', ensureAuthenticated, async (req, res) => {
	try {
		

		// Fetch the user details from the database
		const user = await CryptoUser.findById(req.user._id).lean();

		if (!user) {
			req.flash('error_msg', 'User not found. Please log in again.');
			return res.redirect('/login');
		}

		// Pass the user data to the EJS view
		res.render('cryptoProfile', { currentUser: user });
	} catch (error) {
		console.error('Error fetching user:', error);
		req.flash('error_msg', 'Something went wrong. Try again.');
		res.redirect('/login');
	}
});

// Profile route using ensureAuthenticated
router.get('/myProfile', ensureAuthenticated, async (req, res) => {
	res.render('myProfile', { user: req.user });
});

module.exports = router;
