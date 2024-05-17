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
<<<<<<< HEAD
        role = user.role;    
        res.json({login,role})
        }
        else{
          res.json('No User')
        }
=======
        role = user.role;     
        res.json({login,role})
        }
>>>>>>> 650dfcbb454291938dab7a45842ee1c5cc041735
      } catch (error) {
        console.log(error);
      }
});

module.exports = router;