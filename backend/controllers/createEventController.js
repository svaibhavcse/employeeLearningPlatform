const Event = require('../models/event');
const Login = require ('../models/login')
const Registration = require('../models/registration')
const express = require('express');
const router = express.Router();
const sendEmail = require('./mailController')

//get all the email and id's of the users in the db
const getAllUserDetails = async () => {
  try {
    // Fetch all users except those with the role 'admin'
    const users = await Login.find({ role: { $ne: 'admin' } }, '_id email');
    return users.map(user => ({ id: user._id, email: user.email }));
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw new Error('Failed to fetch user details');
  }
};

// Controller function to create a new event
router.post('/createEvent', async (req, res) => {
  try {
    const { eventName, eventDescription, date, endDate,time,endTime, location,trainer, skillSet,capacity ,status,resource,prerequisite} = req.body;
    
    // Create a new event object
    const newEvent = new Event({
      eventName,
      eventDescription,
      date,
      endDate,
      time,
      location,
      trainer,
      skillSet,
      capacity,
      status,
      resource,
      prerequisite,
      endTime
    });

    // Save the event to the database
    await newEvent.save();

    const userDetails = await getAllUserDetails();
   
    const emailSubject = `New Event: ${newEvent.eventName}`;
    
    // Respond with the newly created event
    res.status(201).json(newEvent);
    //iterate to email
    for (const user of userDetails) {
      const { id, email } = user;
      const eventLink = `http://localhost:3000/user/${id}`;
      const emailText = `A new event "${newEvent.eventName}" has been posted!\n\n`+
      `Check it out here: ${eventLink}`;
      await sendEmail(email, emailSubject, emailText);
    }

  } catch (error) {
    // If an error occurs, respond with an error message
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event.' });
  }
})

// Fetch all events from the database
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events); // Send the events data as JSON response
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' }); // Send error response if unable to fetch events
  }
});

router.delete('/events/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    // Find the event by ID
    const deletedEvent = await Event.findById(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    // Respond with a success message
    res.status(200).json({ message: 'Event deleted successfully' });
    
    // Get the list of users who are registered for the deleted event
    const eventRegistrations = await Registration.find({ eventId });

    // Delete the event from the database
    await Event.findByIdAndDelete(eventId);

    // Send email notifications to all users who are registered for the deleted event
    for (const registration of eventRegistrations) {
      const user = await Login.findById(registration.userId);
      const emailSubject = `Event Cancelled: ${deletedEvent.eventName}`;
      const emailText = `The event "${deletedEvent.eventName}" has been cancelled.`;
      // Send email to user.email with the subject emailSubject and the body emailText
      await sendEmail(user.email, emailSubject, emailText);
    }

    
  } catch (error) {
    console.error('Error deleting event:', error);
    // If an error occurs, respond with an error message
    res.status(500).json({ error: 'Failed to delete event' });
  }
});


// Route to handle updating an event
router.put('/events/:eventId', async (req, res) => {
  const eventId = req.params.eventId;
  const updatedEventData = req.body;

  try {
    // Find the event by its ID and update its data
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedEventData, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
      // Respond with the updated event
    res.status(200).json(updatedEvent);
    // Get the list of users who are registered for the updated event
    const eventRegistrations = await Registration.find({ eventId });
    // Notify all users who are registered for the updated event
    for (const registration of eventRegistrations) {
      const user = await Login.findById(registration.userId);
      const emailSubject = `Event Updated: ${updatedEvent.eventName}`;
      const emailText = `The event "${updatedEvent.eventName}" has been updated. Please check the changes.\n\n`+
      `http://localhost:3000/userRegisteredEvents/${user._id}`;
      // Send email to user.email with the subject emailSubject and the body emailText
      await sendEmail(user.email, emailSubject, emailText);
    }
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});


module.exports = router;