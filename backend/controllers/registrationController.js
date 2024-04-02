const Registration = require('../models/registration');
const Event = require('../models/event');
const express = require('express');
const router = express.Router();

// Controller function to handle event registration
router.post('/register', async (req, res) => {
  try {
    const { eventId, userId } = req.body;

    // Check if the registration already exists
    const existingRegistration = await Registration.findOne({ eventId:eventId, userId: userId });
    if (existingRegistration) {
      return res.status(400).json({ message: 'User already registered for this event' });
    }

    // Create a new registration record
    const registration = new Registration({ eventId, userId });
    await registration.save();

    res.status(201).json({ message: 'Event registration successful', registration });
  } catch (error) {
    console.error('Error registering event:', error);
    res.status(500).json({ error: 'Error registering event' });
  }
});

router.get('/registeredEvents/:userId', async (req, res) => {
  try{
  const userId = req.params.userId;

    // Find all registrations for the given userId
    const registrations = await Registration.find({ userId:userId });

    // Extract the eventId from each registration
    const eventIds = registrations.map(registration => registration.eventId);

    // Fetch events corresponding to the eventIds
    const registeredEvents = await Event.find({ _id: { $in: eventIds } });

    res.status(200).json(registeredEvents);
  } catch (error) {
    console.error('Error fetching registered events:', error);
    res.status(500).json({ error: 'Failed to fetch registered events' });
  }
});

module.exports = router;