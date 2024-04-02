const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  eventDescription: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  skillSet: {
    type: [String],
    required: true
  },
  trainer:{
    type:String,
    required: true
  },
  endDate:{
    type: Date,
    required: true
  },
  status:{
    type:String,
    required: true
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;