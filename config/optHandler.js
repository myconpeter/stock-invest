const crypto = require('crypto');

function generateOTP() {
	return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

function verifyOTP(storedOTP, enteredOTP) {
	return storedOTP === enteredOTP;
}

module.exports = { generateOTP, verifyOTP };
