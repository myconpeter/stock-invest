const Admin = require('../models/admin');
const LocalStrategy = require('passport-local').Strategy;
const adminPassport = require('passport');
const cryptoUser = require('../models/cryptoUser');

adminPassport.use(
	'adminLocal',
	new LocalStrategy(
		{ usernameField: 'email' },
		async (email, password, done) => {
			try {
				const user = await Admin.findOne({ email });
				// console.log(user.password);

				if (!user) {
					return done(null, false, {
						message: 'This Admin Email is not registered',
					});
				}

				if (user.password == password) {
					return done(null, user);
				} else {
					return done(null, false, {
						message: 'Incorrect password!!!',
					});
				}
			} catch (err) {
				return done(err);
			}
		}
	)
);

adminPassport.serializeUser(async (user, done) => {
	try {
		done(null, user.id);
	} catch (err) {
		done(err);
	}
});

adminPassport.deserializeUser(async (id, done) => {
	try {
		const user = await cryptoUser.findById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

module.exports = adminPassport;
