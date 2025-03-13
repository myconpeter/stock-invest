const mongoose = require('mongoose');

const CryptoUserSchema = new mongoose.Schema(
	{
		fullname: {
			type: String,
			required: true,
		},

		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		telephone: {
			type: Number,
			required: true,
		},
		accountStatus: {
			type: String,
			default: 'Not Active',
		},

		password: {
			type: String,
			required: true,
		},

		accountBalance: {
			type: String,
			default: '0.00',
		},
		totalProfit: {
			type: String,
			default: '0.00',
		},
		totalBonus: {
			type: String,
			default: '0.00',
		},
		withdrawal: {
			type: String,
			default: '0.00',
		},
		deposit: {
			type: String,
			default: '0.00',
		},
		DOB: {
			type: String,
			default: 'Not Set',
		},
		security: {
			type: String,
			default: 'Not Set',
		},
	},
	{ timestamps: true }
);

const CryptoUser = mongoose.model('CryptoUser', CryptoUserSchema);

module.exports = CryptoUser;
