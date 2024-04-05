import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/registrations');
        setRegistrations(response.data);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      }
    };

    const fetchInterests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/interests');
        setInterests(response.data);
      } catch (error) {
        console.error('Error fetching interests:', error);
      }
    };

    fetchRegistrations();
    fetchInterests();
  }, []);

  return (
    <div>
      <h2>Registrations</h2>
      {registrations.map(registration => (
        <div key={registration._id}>
          <h3>{registration.eventName} - Registered Users</h3>
          {registration.users.map(user => (
            <div key={user._id}>{user.email}</div>
          ))}
        </div>
      ))}

      <h2>Interests</h2>
      {interests.map(interest => (
        <div key={interest._id}>
          <h3>{interest.eventName} - Interested Users</h3>
          {interest.users.map(user => (
            <div key={user._id}>{user.email}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
