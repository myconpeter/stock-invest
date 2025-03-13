const bcrypt = require('bcrypt');
const CryptoUser = require('../models/cryptoUser');

function validateInputData(reqBody) {
	const { fullname, username, email, telephone, password, password2 } = reqBody;
	const errors = [];

	if (!fullname || !username || !email || !telephone || !password || !password2) {
		errors.push({ msg: 'Please fill in all fields' });
	}

	if (password.length < 6) {
		errors.push({ msg: 'Password must be at least 6 characters' });
	}

	if (password !== password2) {
		errors.push({ msg: 'Password must be the same' });
	}

	return errors;
}

// Function to hash the user's password
async function hashPassword(password) {
	const salt = await bcrypt.genSalt(12);
	return bcrypt.hash(password, salt);
}

// Registration route handler
async function registerUser(req, res) {
	const errors = validateInputData(req.body);

	if (errors.length > 0) {
		return res.render('register', {
			errors,
			...req.body,
		});
	}

	const { email, username, referralCode } = req.body;

	try {
		const existingEmailUser = await CryptoUser.findOne({ email }).exec();

		if (existingEmailUser) {
			errors.push({ msg: 'Email already registered' });
		}

		if (errors.length > 0) {
			return res.render('register', {
				errors,
				...req.body,
			});
		}

		const hashedPassword = await hashPassword(req.body.password);
		const newUser = new CryptoUser({
			...req.body,

			password: hashedPassword,
		});

		await newUser.save();
		req.flash('success_msg', 'You have now registered, please login');
		res.redirect('/login');
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
}

module.exports = registerUser;
