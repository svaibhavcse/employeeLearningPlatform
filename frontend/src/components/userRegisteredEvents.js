import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { useParams,useNavigate} from 'react-router-dom'; 
import { UserNavbar } from './userNavbar';
import { useSupplier } from './bucket';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const RegisteredEvents = () => {
  const navigate = useNavigate();
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
    console.log(registeredEvents) 
  }, [userId]);

  return (
    logged ? (
    <div>
      <UserNavbar/>
      <div style={{padding:"10px"}}>
      <h2>Registered Events</h2>
      <div className="row">
      {registeredEvents.map(event => (
  <div key={event._id} className="col-md-4">
    <Card style={{ width: '100%', marginBottom: '1rem' }}>
      <Card.Body>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Card.Title>{event.eventName}</Card.Title>
          <Card.Text className="text-muted" style={{ fontSize: 'small' }}>Registered at: {new Date(event.createdAt).toLocaleString('en-GB')}</Card.Text>
        </div>
        <Card.Subtitle className="mb-2 text-muted">Date: {new Date(event.date).toLocaleDateString('en-GB')} -  {new Date(event.endDate).toLocaleDateString('en-GB')}</Card.Subtitle>
        <Card.Text style={{ whiteSpace: 'pre-line' }}>Description: {event.eventDescription}</Card.Text>
        <Card.Text>Trainer: {event.trainer}</Card.Text>
        <Card.Text>Time: {event.time} - {event.endTime}</Card.Text>
        <Card.Text>Location: {event.location}</Card.Text>
        <Card.Text> Resource: <a href={event.resource} target="_blank" rel="noopener noreferrer">{event.resource}</a> </Card.Text>
        <Card.Text>Prerequisite: {event.prerequisite}</Card.Text>
        <Card.Text>Available Seats: {event.capacity}</Card.Text>
        <Card.Text>Skill Set: {event.skillSet}</Card.Text>
        <Card.Text>Status: {event.status}</Card.Text>
      </Card.Body>
    </Card>
  </div>
))}
 </div>
    </div>
    {registeredEvents.length === 0  && <Alert severity="info" style={{borderRadius:"50px",margin:"0% 10% 0% 10%"}}>
  <AlertTitle>Oops</AlertTitle>
  No events registered
</Alert>}
    </div>
    ) : navigate('/')
  );
};

export default RegisteredEvents;