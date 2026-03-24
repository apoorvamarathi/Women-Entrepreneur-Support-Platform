const nodemailer = require('nodemailer');

// Define transporter
let transporter;

if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
} else {
  console.warn('⚠️ SMTP credentials not found in environment variables. Emails will be logged to console instead of sending.');
}

/**
 * Send an email using Nodemailer or mock it if no credentials
 * @param {Object} options - { to, subject, html, text }
 */
const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || '"Women Entrepreneur Platform" <no-reply@weplatform.com>',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    if (transporter) {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✉️ Email sent: ${info.messageId}`);
    } else {
      console.log('--- ✉️ MOCK EMAIL DISPATCHED ---');
      console.log(`To: ${options.to}`);
      console.log(`Subject: ${options.subject}`);
      console.log(`HTML Body: \n${options.html || options.text}`);
      console.log('-------------------------------');
    }
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
  }
};

module.exports = { sendEmail };
