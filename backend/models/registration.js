const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Assuming you have an Event model
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Registration = mongoose.model('registrations', RegistrationSchema);

module.exports = Registration;