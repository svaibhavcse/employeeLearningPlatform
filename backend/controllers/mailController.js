const nodemailer = require('nodemailer');

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'vaibhavs.20cse@kongu.edu', 
    pass: 'vfro zvnw aniz elzk' 
  }
});

// Function to send email
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: 'vaibhavs.20cse@kongu.edu', 
      to:to,
      subject:subject,
      text:text
    };

<<<<<<< HEAD
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
=======
    // const info = await transporter.sendMail(mailOptions);
    // console.log('Email sent:', info.response);
>>>>>>> 650dfcbb454291938dab7a45842ee1c5cc041735
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;