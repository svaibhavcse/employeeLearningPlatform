const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  email: {
    type:String,
    ref:'User'
  },
  password: String,
  otp: Number 
});
const Login = mongoose.model('loginInfo', LoginSchema);
module.exports = Login;
