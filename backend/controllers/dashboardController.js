const Registration = require('../models/registration');
const Event = require('../models/event');
const Login = require('../models/login');
const Interest = require('../models/interests')
const express = require('express');
const router = express.Router();

router.get('/registrations', async (req, res) => {
    try {
        // 1. Query the Event model to get all events
        const events = await Event.find({}, '_id name');

        // Array to store event details
        const eventDetails = [];

        // Iterate over each event
        for (const event of events) {
            // 2. Query the Registration model to get all registrations for the current event ID
            const registrations = await Registration.find({ eventId: event._id });

            // Array to store user details for the current event
            const userDetails = [];

            // Iterate over each registration and fetch user details
            for (const registration of registrations) {
                // 3. Use the obtained user ID to query the Login model to get the email
                const loginInfo = await Login.findOne({ _id: registration.userId });

                if (!loginInfo) {
                    throw new Error('Login information not found');
                }

                // 4. Use the email to query the User model to get the user's name
                const user = await User.findOne({ email: loginInfo.email });
                if (!user) {
                    throw new Error('User not found');
                }

                userDetails.push({
                    name: user.name,
                    email: user.email,
                    role: user.role
                });
            }

            // Push event details to the array
            eventDetails.push({
                event: event.name,
                users: userDetails
            });
        }
            console.log(eventDetails)
        res.json(eventDetails);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user details for all events: ' + error.message });
    }
});
module.exports = router;
