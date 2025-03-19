const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const CryptoUser = require('../models/cryptoUser');
const Transact = require('../models/transact');

// get homepage
router.get('/cryptoDeposit', ensureAuthenticated, async (req, res) => {
	res.render('cryptoFundAccount');
});

router.get('/cryptoWithdraw', ensureAuthenticated, async (req, res) => {
	res.render('cryptoWithdraw');
});

router.post('/cryptoWithdraw', ensureAuthenticated, async (req, res) => {
	const { email, amount, method, wallet, status } = req.body;

	console.log(req.body);

	try {
		const currentUser = await CryptoUser.findOne({ email }).exec();

		const newTrans = new Transact({
			...req.body,
		});

		await newTrans.save();
		req.flash('success_msg', 'Withdrawal is Pending, Please contact Support');
		res.redirect('/cryptoProfile');
	} catch (error) {}
});

router.get('/cryptoOptions', ensureAuthenticated, async (req, res) => {
	res.render('cryptoOptions');
});

module.exports = router;
