const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

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
	res.render('cryptoTransaction');
});
router.get('/cryptoHelp', ensureAuthenticated, async (req, res) => {
	res.render('cryptoHelp');
});
module.exports = router;
