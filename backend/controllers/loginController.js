const express = require('express');
const router = express.Router();
const Login = require('../models/login');
const User = require('../models/user');

// Route to handle user login
router.post('/login', async (req, res) => {
    try {
        const { email } = await req.body;
        const login = await Login.findOne({email} );
        if(login){
        const user = await User.findOne({email});
        role = user.role;     
        res.json({login,role})
        }
        else{
          res.json('No User')
        }
      } catch (error) {
        console.log(error);
      }
});

module.exports = router;