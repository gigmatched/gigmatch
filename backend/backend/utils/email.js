// routes/email.js
const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv');

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Use the key from the magic box

async function sendEmail(to, subject, text, html) {
  try {
    await sgMail.send({
      to: "gorkemsarptunali@gmail.com", // Who to send to (e.g., "mom@example.com")
      from: 'welcome@gigmatch.io', // Your app's email
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    });
    console.log('Email sent to:', to);
  } catch (error) {
    console.log('Error sending email:', error);
    if (error.response) {
        console.error('SendGrid response error:', error.response.body);
      }
  }
}

module.exports = sendEmail;