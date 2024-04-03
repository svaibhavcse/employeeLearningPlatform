const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Login = require('../models/login');
const sendEmail = require('./mailController')

// Route to handle user creation
router.post('/createUser', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        // Check if the user already exists
        const check = await User.findOne({ email });
        if (check) {
          return res.status(400).json({ error: 'User already exists!' });    
        }
        
        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        
        // Create new user
        const user = new User({ name, email, role });
        await user.save();
        
        // Create login entry with OTP
        const login = new Login({ email, password, otp });
        await login.save();
        
        // Send email with OTP for password reset
        const mailSent = await sendEmail(
          email,
          'Reset Your Password',
          `Reset Your password with the OTP : ${login.otp}. Click on the following link to reset your password: http://localhost:3000/resetpassword/${email}`
        );
      
        if (!mailSent) {
          return res.status(500).json({ error: 'Failed to send OTP email' });
        }
        res.status(201).json(user);
      } catch (err) {
        console.error('Error creating user:', err);
        res.status(400).json({ error: 'Failed to create user.' });
      }
    
});

router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
      // Find the user in the database by user ID
      const user = await Login.findById(userId);

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      const mail = user.email
      const data = await User.findOne({email:mail})
      res.status(200).json({ name: data.name });
  } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
  }
});


module.exports = router;