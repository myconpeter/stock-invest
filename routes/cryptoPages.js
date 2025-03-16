const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const CryptoUser = require('../models/cryptoUser');
const Transact = require('../models/transact');

// get homepage
router.get('/cryptoProfile', ensureAuthenticated, async (req, res) => {
	res.render('cryptoProfile');
});

router.get('/cryptoProfit', ensureAuthenticated, async (req, res) => {
	res.render('cryptoProfit');
});
router.get('/cryptoInvest', ensureAuthenticated, async (req, res) => {
	res.render('cryptoInvest');
});
router.get('/cryptoTransaction', ensureAuthenticated, async (req, res) => {
	try {
		// Fetch the logged-in user's transactions
		const transactions = await Transact.find({ email: req.user.email }).lean();

		// Render the EJS view and pass transaction data
		res.render('cryptoTransaction', { transactions });
	} catch (error) {
		console.error('Error fetching transactions:', error);
		req.flash('error_msg', 'Something went wrong. Try again.');
		res.redirect('/dashboard'); // Redirect to a safer page if there's an error
	}
});

router.get('/cryptoHelp', ensureAuthenticated, async (req, res) => {
	res.render('cryptoHelp');
});
router.get('/acctBalance', ensureAuthenticated, async (req, res) => {
	res.render('cryptoAcctBalance');
});
module.exports = router;
