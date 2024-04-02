const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  email: String,
  password: String,
  otp: Number 
});
const Login = mongoose.model('loginInfo', LoginSchema);
module.exports = Login;
