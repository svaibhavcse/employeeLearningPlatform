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

  router.post('/resetpassword', async (req, res) => {
    try {
        const {  otp,email, newPassword } = req.body;
         // Log userID to check if it's received correctly
        // Find the user in the login_details collection
        const login = await Login.findOne({ email });
        if (!login) {
          
          return res.status(404).json({ error: 'User not found' });
        }
        // Check if the provided OTP matches the stored OTP
        const otp2=parseInt(otp,10)
        if (login.otp !== otp2) {
          return res.status(400).json({ error: 'Incorrect OTP' });
        }
    
        // Update the user's password with the new password
        login.password = newPassword;
        await login.save();
    
        res.status(200).json({ message: 'Password reset successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

module.exports = router;