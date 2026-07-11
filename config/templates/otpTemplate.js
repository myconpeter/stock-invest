/**
 * Sleek Institutional Dark Theme for Stock Invest OTPs
 */
const getOtpTemplate = (otp, supportEmail) => {
  // Fallback default if the env isn't loaded correctly for some reason
  const fallbackEmail = supportEmail || 'contact.stockinvest@gmail.com';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Identity</title>
      <style>
        body {
          background-color: #0d0e12;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
        }
        .wrapper {
          background-color: #0d0e12;
          padding: 40px 20px;
        }
        .container {
          max-width: 500px;
          margin: 0 auto;
          background-color: #14161d;
          border: 1px solid #222530;
          border-radius: 12px;
          padding: 40px 30px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .logo {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #f0b90b; /* Vibrant premium gold accent */
          text-transform: uppercase;
          margin-bottom: 30px;
        }
        .heading {
          color: #ffffff;
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .text {
          color: #9095a8;
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        .otp-box {
          background: linear-gradient(135deg, #1e222d 0%, #171a24 100%);
          border: 1px solid #d4af37; /* Gold boundary line */
          border-radius: 8px;
          padding: 20px;
          margin: 0 auto 35px auto;
          max-width: 260px;
        }
        .otp-code {
          font-size: 36px;
          font-weight: 700;
          letter-spacing: 6px;
          color: #ffffff;
          margin: 0;
        }
        .expiry-note {
          font-size: 12px;
          color: #636a7e;
          margin-top: 5px;
        }
        .divider {
          border: 0;
          height: 1px;
          background: #222530;
          margin: 30px 0;
        }
        .footer {
          color: #636a7e;
          font-size: 12px;
          line-height: 1.5;
        }
        .footer a {
          color: #f0b90b;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="logo">STOCK INVEST</div>
          <div class="heading">Security Verification</div>
          <p class="text">Use the following One-Time Password (OTP) to complete your secure authentication request. This code is confidential and should not be shared.</p>
          
          <div class="otp-box">
            <div class="otp-code">${otp}</div>
            <div class="expiry-note">Valid for 10 minutes</div>
          </div>
          
          <p class="text" style="font-size: 13px; margin-bottom: 0;">If you did not initiate this authentication flow, please secure your account credentials immediately.</p>
          
          <div class="divider"></div>
          
          <div class="footer">
            <p>This is an automated operational notification.<br>
            Have questions or need assistance? Reach out to our secure desk at:<br>
            <a href="mailto:${fallbackEmail}">${fallbackEmail}</a></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = { getOtpTemplate };