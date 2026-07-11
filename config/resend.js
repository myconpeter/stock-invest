const { Resend } = require("resend");
const { getOtpTemplate } = require("./templates/otpTemplate");

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Primary Core Send Execution Controller
 */
const sendMail = async ({ to, subject, html, text }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `Stock Invest <${process.env.EMAIL_FROM || "login@stockinvest.online"}>`,
      to: [to],
      subject: subject,
      text: text,
      html: html,
    });

    if (error) {
      console.error("[Resend] Transmission error details:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("[Resend] Fatal execution failure:", error);
    return null;
  }
};

/**
 * Feature Export: Send OTP Email
 */
const sendOTP = async (email, otp) => {
  // Inject the Company_email directly from the environment file safely
  const htmlBody = getOtpTemplate(otp, process.env.Company_email);
  const plainText = `Your security verification OTP code for Stock Invest is: ${otp}`;

  return await sendMail({
    to: email,
    subject: "Your OTP for Stock Invest Login",
    text: plainText,
    html: htmlBody,
  });
};

module.exports = {
  sendOTP,
};
