import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom'; 
import { UserNavbar } from './userNavbar';
import { useSupplier } from './bucket';
const RegisteredEvents = () => {
    const { userId } = useParams();
    const {logged} = useSupplier()
  const [registeredEvents, setRegisteredEvents] = useState([]);
  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/registeredEvents/${userId}`);
       
        setRegisteredEvents(response.data);
      } catch (error) {
        console.error('Error fetching registered events:', error);
      }
    };
    fetchRegisteredEvents();
  }, [userId]);

  return (
    logged && (
    <div>
      <UserNavbar/>
      <div style={{padding:"10px"}}>
      <h2>Registered Events</h2>
      <div className="row">
        {registeredEvents.map(event => (
          <div key={event._id} className="col-md-6">
            <Card style={{ width: '100%', marginBottom: '1rem' }}>
              <Card.Body>
                <Card.Title>{event.eventName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Date: {new Date(event.date).toLocaleDateString('en-GB')} -  {new Date(event.endDate).toLocaleDateString('en-GB')}</Card.Subtitle>
                <Card.Text style={{ whiteSpace: 'pre-line' }}>Description: {event.eventDescription}</Card.Text>
                <Card.Text>Trainer: {event.trainer}</Card.Text>
                <Card.Text>Time: {event.time}</Card.Text>
                <Card.Text>Location: {event.location}</Card.Text>
                <Card.Text>Skill Set: {event.skillSet.join(', ')}</Card.Text>
                <Card.Text>Status: {event.status}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
    </div>
    )
  );
};

export default RegisteredEvents;