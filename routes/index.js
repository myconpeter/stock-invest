const express = require('express');
const router = express.Router();

// get homepage
router.get('/', async (req, res) => {
	res.render('index');
});

router.get('/about', async (req, res) => {
	res.render('our-technology');
});

router.get('/contact', async (req, res) => {
	res.render('contact');
});
router.get('/invest', async (req, res) => {
	res.render('investment-plans');
});
router.get('/privacy', async (req, res) => {
	res.render('privacy');
});
router.get('/terms', async (req, res) => {
	res.render('terms');
});

module.exports = router;
