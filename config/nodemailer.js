const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
	host: 'live.smtp.mailtrap.io', // Use the correct SMTP host
	port: 2525, // Change to 2525, or 465/587 based on your Mailtrap settings
	secure: false, // Use true if you're using port 465
	auth: {
		user: 'smtp@mailtrap.io', // Replace with your Mailtrap username
		pass: '15a92777d0cd7c09f11e6bf6d5ba0ab0', // Replace with your Mailtrap password
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
			from: 'login-stock-invest@susanmariealessio.online',
			to: email,
			subject: 'Your OTP for Stock Invest Login',
			text: `Your OTP code is: ${otp}`,
			html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
		});
		// console.log(`OTP sent to ${email}`);
	} catch (error) {
		console.error('Error sending OTP email:', error);
	}
};

module.exports = { sendOTP };
