const nodemailer = require("nodemailer");

// Set up the transporter using your .env values dynamically
let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "live.smtp.mailtrap.io",
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER, // Will read "api" from your .env
    pass: process.env.SMTP_PASS, // Will read your token from your .env
  },
});
// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.error("Nodemailer SMTP Connection Error:", error);
  } else {
    console.log("Mail server is ready to send messages");
  }
});

const sendOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"Stock Invest" <${process.env.EMAIL_FROM || "login@stockinvest.online"}>`,
      to: email,
      subject: "Your OTP for Stock Invest Login",
      text: `Your OTP code is: ${otp}`,
      html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
    });
    console.log(`OTP successfully sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};

module.exports = { sendOTP };
