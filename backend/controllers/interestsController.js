const Interest = require('../models/interests')
const express = require('express');
const router = express.Router();

router.post('/toggleInterest', async (req, res) => {
    try {
      const { eventId, userId } = req.body;
  
      // Check if the user is already interested in the event
      const existingInterest = await Interest.findOne({ eventId, userId });
  
      if (existingInterest) {
        // If already interested, remove the interest
        await Interest.deleteOne({ eventId, userId });
        res.status(200).json({ interested: false });
      } else {
        // If not interested, add the interest
        const newInterest = new Interest({ eventId, userId });
        await newInterest.save();
        res.status(200).json({ interested: true });
      }
    } catch (error) {
      console.error('Error toggling interest:', error);
      res.status(500).json({ error: 'Error toggling interest' });
    }
  });

  router.get('/checkInterest/:eventId/:userId', async (req, res) => {
    try {
      const { eventId, userId } = req.params;
  
      // Find interest record for the given event and user
      const interest = await Interest.findOne({ eventId, userId });
  
      // If interest exists, user is interested
      const interested = !!interest;
  
      res.status(200).json({ interested });
    } catch (error) {
      console.error('Error checking interest:', error);
      res.status(500).json({ error: 'Error checking interest' });
    }
  });

module.exports = router;