const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
require('dotenv').config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
const PORT = process.env.PORT || 5000;

// MongoDB connection
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User model
const userController = require('./controllers/userController');
app.use(userController);

const loginController = require('./controllers/loginController');
app.use(loginController);

const forgotPasswordController = require('./controllers/forgotPasswordController');
app.use(forgotPasswordController);

const resetPasswordController = require('./controllers/resetPasswordController');
app.use(resetPasswordController);

const createEventController = require('./controllers/createEventController');
app.use(createEventController);

const registrationController = require('./controllers/registrationController');
app.use(registrationController);

const interestsController = require('./controllers/interestsController');
app.use(interestsController);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
