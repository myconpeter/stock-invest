const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	host: 'live.smtp.mailtrap.io', // Use the correct SMTP host
	port: 2525, // Change to 2525, or 465/587 based on your Mailtrap settings
	secure: false, // Use true if you're using port 465
	auth: {
		user: 'smtp@mailtrap.io', // Replace with your Mailtrap username
		pass: 'f234793ae54672567975c33334ab5db2', // Replace with your Mailtrap password
	},
});

// Verify transporter
transporter.verify((error, success) => {
	if (error) {
		console.error(error);
	} else {
		console.log('Mail server is ready to send messages');
	}
});

const sendOTP = async (email, otp) => {
	try {
		await transporter.sendMail({
			from: 'login@stockinvest.online',
			to: email,
			subject: 'Your OTP for Stock Invest Login',
			text: `Your OTP code is: ${otp}`,
			html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
		});
	} catch (error) {
		console.error('Error sending OTP email:', error);
	}
};

module.exports = { sendOTP };
