const Registration = require('../models/registration');
const Event = require('../models/event');
const Login = require('../models/login')
const Interest = require('../models/interests')
const express = require('express');
const router = express.Router();
const sendEmail = require('./mailController')


// Controller function to handle event registration
router.post('/register', async (req, res) => {
  try {
    const { eventId, userId } = req.body;

    // Check if the registration already exists
    const existingRegistration = await Registration.findOne({ eventId, userId });
    if (existingRegistration) {
      return res.status(400).json({ message: 'User already registered for this event' });
    }

    // Find the event and decrement the capacity
    const event = await Event.findOne({ _id: eventId });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.capacity <= 0) {
      return res.status(400).json({ message: 'Event is already full' });
    }
    
    event.capacity -= 1;
    await event.save();
     // Create a new registration record
     const registration = new Registration({ eventId, userId });
     await registration.save();
   //send mail to the users who liked the event (low seats available)
   if(event.capacity <= 5){
   const interestedUsers = await Interest.aggregate([
    {
      $match: { eventId: event._id }
    },
    {
      $lookup: {
        from: 'registrations',
        let: { userId: '$userId' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$eventId', event._id] },
                  { $eq: ['$userId', '$$userId'] }
                ]
              }
            }
          }
        ],
        as: 'registeredUsers'
      }
    },
    {
      $match: { registeredUsers: { $eq: [] } }
    },
    {
      $lookup: {
        from: 'events',
        localField: 'eventId',
        foreignField: '_id',
        as: 'event'
      }
    },
    {
      $unwind: '$event'
    },
    {
      $match: { 'event.capacity': { $lte: 5 } }
    },
    {
      $project: {
        userId: 1
      }
    }
  ])
  // Fetch user emails asynchronously and wait for all requests to complete
    const userEmailsPromises = interestedUsers.map(async (interestedUser) => {
      try {
          const userData = await Login.findOne({_id: interestedUser.userId });
          if (userData) {
              return userData.email;
          }
      } catch (error) {
          console.error('Error fetching user data:', error);
      }
    });
    // Wait for all promises to resolve and gather the results
    const userEmails = await Promise.all(userEmailsPromises);
    //email to all the user (alert mail)
    const emailSubject = 'Event Capacity Alert';
    // Compose the email text
    const emailText = `There are limited seats available for the event. Register now to secure your spot!\n\n` +
          `Event Name: ${event.eventName}\n` +
          `Available Seats: ${event.capacity}\n`+
          `Event Date: ${new Date(event.date).toLocaleDateString('en-GB')} - ${new Date(event.endDate).toLocaleDateString('en-GB')}\n\n` +
          `Thank you!`;
    // Iterate over each email in userEmails array
    userEmails.forEach(async (email) => {
      try { 
        // Send email to the current user
        //await sendEmail(email, emailSubject, emailText);
      } catch (error) {
        console.error(`Error sending email to ${email}:`, error);
      }
    });
    
    //if ends
    }

   //send email notifications for the user registered the event
    const user = await Login.findOne({_id:userId})
    const eventData = await Event.findOne({_id:eventId})
    const emailSubject = 'Registration Confirmed' ;
    const emailText = `You have registered for the event: ${eventData.eventName}.\n\n` + 
    `Registered At: ${new Date(registration.createdAt).toLocaleString('en-GB')}\n\n`+
    `Blocking your calender for : ${new Date(eventData.date).toLocaleDateString('en-GB')} - ${new Date(eventData.endDate).toLocaleDateString('en-GB')} \n\n` +
    `Check your calender at : http://localhost:3000/userCalender/${userId} \n\n`+
    `Thank you for registering!`;

    // await sendEmail(user.email,emailSubject,emailText)

    res.status(201).json({ message: 'Event registration successful', registration });
  } catch (error) {
    console.error('Error registering event:', error);
    res.status(500).json({ error: 'Error registering event' });
  }
});

//user registered events
router.get('/registeredEvents/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // Find all registrations for the given userId
    const registrations = await Registration.find({ userId: userId });
    // Extract the eventId from each registration
    const eventIds = registrations.map(registration => registration.eventId);
    // Fetch events corresponding to the eventIds
    const registeredEvents = await Event.find({ _id: { $in: eventIds } });
    // Map createdAt field to registered events
    const registeredEventsWithCreatedAt = registeredEvents.map(event => {
      const registration = registrations.find(registration => registration.eventId.toString() === event._id.toString());
      return {
        ...event.toJSON(),
        createdAt: registration.createdAt
      };
    });

    res.status(200).json(registeredEventsWithCreatedAt);
  } catch (error) {
    console.error('Error fetching registered events:', error);
    res.status(500).json({ error: 'Failed to fetch registered events' });
  }
});


module.exports = router;