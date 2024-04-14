const mongoose = require('mongoose');

const InterestSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  }
});

const Interest = mongoose.model('Interest', InterestSchema);

module.exports = Interest;
