const express = require('express');
const router = express.Router();

// Assuming you have models imported and connected to your database
const Registration = require('../models/registration');
const Event = require('../models/event');
const Login = require('../models/login');
const Interest = require('../models/interests');
const User = require ('../models/user')

router.get('/registrations', async (req, res) => {
    try {
        // Fetch all events from the Event collection
        const events = await Event.find({});

        // Map over the events to create the desired JSON structure
        const eventDetails = await Promise.all(events.map(async event => {
            // Fetch registrations for the current event
            const registrations = await Registration.find({ eventId: event._id });
            const interests = await Interest.find({ eventId: event._id });

            // Extract user IDs from the registrations
            const registrationDetails = await Promise.all(registrations.map(async registration => {
                // Find the user details using the user ID from the registration
                const login = await Login.findById(registration.userId);
                const user = await User.findOne({email: login.email})
                return {
                    userId: registration.userId,
                    name: user.name,
                    email: login.email, // Include user email from the login collection
                    createdAt: registration.createdAt
                };
            }));


            const InterestDetails = await Promise.all(interests.map(async interest => {
                // Find the user details using the user ID from the interest table
                const login = await Login.findById(interest.userId);
                const user = await User.findOne({email: login.email})
                return {
                    userId: interest.userId,
                    name: user.name,
                    email: login.email, // Include user email from the login collection
                };
            }));

            return {
                _id: event._id,
                eventName: event.eventName,
                eventDescription: event.eventDescription,
                date: event.date,
                time: event.time,
                location: event.location,
                trainer: event.trainer,
                status: event.status,
                endDate: event.endDate,
                capacity: event.capacity,
                endTime: event.endTime,
                registrations: registrationDetails, // Include the user IDs, email, and createdAt of registrations
                interests : InterestDetails
            };
        }));

        // Send the event details as the response
        res.json(eventDetails);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching event details: ' + error.message });
    }
});


module.exports = router;