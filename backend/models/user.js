const mongoose = require('mongoose');

// User model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role:String
});

const User = mongoose.model('User', userSchema);
module.exports = User;