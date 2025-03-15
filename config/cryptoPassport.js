const cryptoUser = require('../models/cryptoUser');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');

passport.use(
	'userLocal',
	new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
		try {
			// console.log(email);
			const small = email.toLowerCase();
			// console.log(small);
			
			const user = await cryptoUser.findOne({ email: small });
			// console.log(user);

			if (!user) {
				return done(null, false, {
					message: 'This Email is not registered',
				});
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (isMatch) {
				return done(null, user);
			} else {
				return done(null, false, {
					message: 'Incorrect password!!!',
				});
			}
		} catch (err) {
			return done(err);
		}
	})
);

passport.serializeUser((user, done) => {
	done(null, user.id); // No async/await needed here
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await cryptoUser.findById(id);
		if (!user) {
			return done(null, false); // User not found
		}
		done(null, user);
	} catch (err) {
		console.error('Error in deserialization:', err);
		done(err, null);
	}
});
