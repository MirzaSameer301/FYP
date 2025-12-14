const nodemailer = require("nodemailer");

exports.sendResetEmail = async (toEmail, token ) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
// console.log(toEmail,token);

  const message = {
    from: `"Auth System" <consultory@gmail.com>`,
    to:toEmail,
    subject: "Password Reset Request",
    html: `
      <h3>Password Reset Request</h3>
      <p>You requested to reset your password. Click the link below to reset it:</p>
      <a href="${resetUrl}" style="color: #007bff;">Reset Password</a>
      <p>This link will expire in 15 minutes.</p>
    `,
  };

  await transporter.sendMail(message);
};
