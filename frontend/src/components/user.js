import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventDetailsModal from './eventDetailsModal';
import { UserNavbar } from './userNavbar';
import { useParams, useNavigate } from 'react-router-dom';
import { useSupplier } from './bucket';
import { Levels } from "react-activity";
import "react-activity/dist/library.css";
import Tooltip from '@mui/material/Tooltip';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
<<<<<<< HEAD
import './styles/eventList.css'
=======

>>>>>>> 650dfcbb454291938dab7a45842ee1c5cc041735
const UserEventList = () => {
  const location = useLocation()
 const { logged } = useSupplier();
 const navigate = useNavigate();
 const { userId } = useParams();
 const [events, setEvents] = useState([]);
 const [filteredEvents, setFilteredEvents] = useState([]);
 const [filter, setFilter] = useState('all');
 const [selectedEvent, setSelectedEvent] = useState(null);
 const [showDetailsModal, setShowDetailsModal] = useState(false);
 const [loading, setLoading] = useState(true); // State to track loading status

 useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        const eventsWithRegistrationStatus = await Promise.all(response.data.map(async (event) => {
          const registrationResponse = await axios.get(`http://localhost:5000/events/registrations/${event._id}/${userId}`);
          return { ...event, isRegistered: registrationResponse.data.isRegistered };
        }));
        setEvents(eventsWithRegistrationStatus);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Error fetching events');
      }
    };
    fetchEvents();
 }, [userId]);

 useEffect(() => {
    const currentDate = new Date();
    let filtered = [];
    switch (filter) {
      case 'ongoing':
        filtered = events.filter((event) => new Date(event.date) <= currentDate && new Date(event.endDate) >= currentDate);
        break;
      case 'past':
        filtered = events.filter((event) => new Date(event.endDate) < currentDate);
        break;
      case 'upcoming':
        filtered = events.filter((event) => new Date(event.date) > currentDate);
        break;
      default:
        filtered = events;
        break;
    }
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    setFilteredEvents(filtered);
 }, [events, filter]);

 const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
 };

 const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedEvent(null);
 };

 const handleRegister = async (eventId) => {
    try {
      const data = {
        eventId: eventId,
        userId: userId,
      };
      await axios.post('http://localhost:5000/register', data);
      toast.success('Registered for event');
      const updatedEvents = events.map(event => {
        if (event._id === eventId) {
          return { ...event, isRegistered: true };
        }
        return event;
      });
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error registering for event:', error);
      toast.error('Error registering for event');
    }
 };

const handleUnregister = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/unregister/${eventId}/${userId}`);
      toast.success('Unregistered from event');
      const updatedEvents = events.map(event => {
        if (event._id === eventId) {
          return { ...event, isRegistered: false };
        }
        return event;
      });
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error unregistering from event:', error);
      toast.error('Error unregistering from event');
    }
 };
 useEffect(() => {
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search');
  
  if (searchTerm) {
    // Filter events based on the search term
    const filtered = events.filter(event => event.eventName.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredEvents(filtered);
  } else {
    setFilteredEvents(events);
  }
}, [location.search, events]);
 return (
    logged ? (
      <div>
        <UserNavbar />
        <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable theme="colored"/>
        <div style={{padding:"10px"}}>
          <h2>Events</h2>
          <div> 
            <Button variant={filter === 'all' ? 'dark' : 'outline-dark'} style={{ borderRadius: "25px", width: "25%" }} onClick={() => setFilter('all')}>All</Button>{' '}
            <Button variant={filter === 'ongoing' ? 'dark' : 'outline-dark'} style={{ borderRadius: "25px", width: "25%" }} onClick={() => setFilter('ongoing')}>Ongoing</Button>{' '}
            <Button variant={filter === 'past' ? 'dark' : 'outline-dark'} style={{ borderRadius: "25px", width: "25%" }} onClick={() => setFilter('past')}>Past</Button>{' '}
            <Button variant={filter === 'upcoming' ? 'dark' : 'outline-dark'} style={{ borderRadius: "25px", width: "24%" }} onClick={() => setFilter('upcoming')}>Upcoming</Button>
          </div>
          {loading ? ( // Conditional rendering based on loading state
         <Box sx={{ width: '100%' }}>
         <LinearProgress />
       </Box>
      ) : (
          <div className="event-list">
<<<<<<< HEAD
            <div className="row" >
              {filteredEvents.map((event, index) => (
                <div key={index} className="col-md-3" style={{marginBottom:'1rem'}}>
                 <Card className="event-card">
                    <Card.Body className="event-card-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Card.Title>{event.eventName}</Card.Title>
                    {event.status === 'ongoing'&& <Card.Text><Tooltip title="Live Event"> <Levels style={{color:"red"}}/> </Tooltip> </Card.Text>} 
                  </div>
                      <Card.Subtitle className="mb-2 text-muted">Date: {new Date(event.date).toLocaleDateString('en-GB')} - {new Date(event.endDate).toLocaleDateString('en-GB')}</Card.Subtitle>
                      <Card.Text className="event-card-content" style={{ whiteSpace: 'pre-line' }}>Description: {event.eventDescription}</Card.Text>
                      <Card.Text>Trainer: {event.trainer}</Card.Text>
                      <Card.Text>Time: {event.time} - {event.endTime}</Card.Text>
                      <Card.Text>Location: {event.location}</Card.Text>
                                          
                    </Card.Body>
                    <Card.Footer>
                    <Button variant="primary" style={{ borderRadius: '25px', width: '45%', marginRight: '10px' }} onClick={() => handleViewDetails(event)}>View Details</Button>
                    
                    {event.isRegistered ? (
                      <Button variant={event.status==='completed'?'success': 'danger'} style={{ borderRadius: '25px', width: '45%' }} onClick={() => handleUnregister(event._id)}disabled={event.status === 'completed'}>{event.status==='completed'?'Completed': 'Unregister'}</Button>
                    ) : ( event.capacity !== 0 ?
                      <Button variant={event.status==='completed'?'danger': 'success'} style={{ borderRadius: '25px', width: '45%' }} onClick={() => handleRegister(event._id)} disabled={event.status === 'completed'} >{event.status==='completed'?'Missed': 'Register'}</Button>
                      :
                      <Button variant="secondary" disabled style={{ borderRadius: '25px', width: '45%' }}>No Seating</Button>
                    )}
                    </Card.Footer>
=======
            <div className="row">
              {filteredEvents.map((event, index) => (
                <div key={index} className="col-md-3">
                 <Card style={{ width: '100%', marginBottom: '1rem' }}>
                    <Card.Body>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Card.Title>{event.eventName}</Card.Title>
                    {/* {event.status === 'ongoing'&& <Card.Text><Tooltip title="Live Event"> <Levels style={{color:"red"}}/> </Tooltip> </Card.Text>}  */}
                  </div>
                      <Card.Subtitle className="mb-2 text-muted">Date: {new Date(event.date).toLocaleDateString('en-GB')} - {new Date(event.endDate).toLocaleDateString('en-GB')}</Card.Subtitle>
                      <Card.Text style={{ whiteSpace: 'pre-line' }}>Description: {event.eventDescription}</Card.Text>
                      <Card.Text>Trainer: {event.trainer}</Card.Text>
                      <Card.Text>Time: {event.time} - {event.endTime}</Card.Text>
                      <Card.Text>Location: {event.location}</Card.Text>
                      <Button variant="primary" style={{ borderRadius: '25px', width: '45%', marginRight: '10px' }} onClick={() => handleViewDetails(event)}>View Details</Button>
                    
                      {event.isRegistered ? (
                        <Button variant="danger" style={{ borderRadius: '25px', width: '45%' }} onClick={() => handleUnregister(event._id)}disabled={event.status === 'completed'}>Unregister</Button>
                      ) : ( event.capacity !== 0 ?
                        <Button variant="success" style={{ borderRadius: '25px', width: '45%' }} onClick={() => handleRegister(event._id)} disabled={event.status === 'completed'} >Register</Button>
                        :
                        <Button variant="secondary" disabled style={{ borderRadius: '25px', width: '45%' }}>No Seating</Button>
                      )}
                    </Card.Body>
>>>>>>> 650dfcbb454291938dab7a45842ee1c5cc041735
                 </Card>
                </div>
              ))}
            </div>
          </div>)}
          {selectedEvent && <EventDetailsModal event={selectedEvent} show={showDetailsModal} handleClose={handleCloseDetailsModal} />}
        </div>
      </div>
    ) : navigate('/')
 );
};

<<<<<<< HEAD
export default UserEventList;
=======
export default UserEventList;
>>>>>>> 650dfcbb454291938dab7a45842ee1c5cc041735
