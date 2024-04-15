const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Login = require('../models/login');
const User = require('../models/user');

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Update with your email service provider (e.g., Gmail)
  auth: {
    user: 'vaibhavs.20cse@kongu.edu', // Update with your email address
    pass: 'vfro zvnw aniz elzk' // Update with your email password
  }
});

// Route to handle password reset
router.post('/forgotpassword', async (req, res) => {
    try {
        const { email } = req.body;
        // Generate a new OTP
        
        const newOTP = Math.floor(100000 + Math.random() * 900000);
        // Update the OTP in the database
        await Login.updateOne({ email }, { otp: newOTP });
        // Fetch user details to get email address
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        // Send email with new OTP
        const mailOptions = {
          from: 'vaibhavs.20cse@kongu.edu',
          to: user.email,
          subject: 'Password Reset OTP',
          text: `Your OTP for password reset is: ${newOTP}. Click on the following link to reset your password: http://localhost:3000/resetpassword/${email}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send OTP email' });
          }
          console.log('Email sent:', info.response);
          return res.status(200).json({ message: 'OTP sent successfully' });
        });
      } catch (error) {
        console.error('Error generating OTP:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
});

module.exports = router;
