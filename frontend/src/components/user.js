import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventDetailsModal from './eventDetailsModal'; // Import the modal component for event details
import { UserNavbar } from './userNavbar';
import { useParams } from 'react-router-dom'; 
import { useSupplier } from './bucket';
const UserEventList = () => {
  const {logged} = useSupplier()
  const { userId } = useParams(); // Extract userId from the URL
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'ongoing', 'past', 'upcoming'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error('Error fetching events');
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    // Apply filters based on filter state
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
        const response = await axios.post('http://localhost:5000/register', data);

        toast.success('Registered for event');
        // Update the events state to reflect the registration status change
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
    
  

  return (
    logged && (
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
      <div className="event-list">
        <div className="row">
          {filteredEvents.map((event, index) => (
            <div key={index} className="col-md-6">
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
                  {/* View Details Button */}
                  <Button variant="primary" style={{ borderRadius: '25px', width: '45%', marginRight: '10px' }} onClick={() => handleViewDetails(event)}>View Details</Button>
                  {/* Register Button */}
                  <Button variant="success" style={{ borderRadius: '25px', width: '45%' }} onClick={() => handleRegister(event._id)}>Register</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      {selectedEvent && <EventDetailsModal event={selectedEvent} show={showDetailsModal} handleClose={handleCloseDetailsModal} />}
    </div>
    </div>
    )
  );
};

export default UserEventList;
