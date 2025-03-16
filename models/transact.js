const mongoose = require('mongoose');

const TransactSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},

		amount: {
			type: Number,
			required: true,
		},
		method: {
			type: String,
			required: true,
		},
		wallet: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
			default: 'Pending',
		},
	},
	{ timestamps: true }
);

const Transact = mongoose.model('Transact', TransactSchema);

module.exports = Transact;
