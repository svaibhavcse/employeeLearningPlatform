import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditEventModal from './editEventModal';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'ongoing', 'past', 'upcoming'

  const handleEdit = (event) => {
    setEditedEvent(event);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditedEvent(null);
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/events/${eventId}`);
      toast.success('Event deleted successfully');
      // Remove the deleted event from the events list
      const updatedEvents = events.filter((event) => event._id !== eventId);
      setEvents(updatedEvents);
    } catch (error) {
      toast.error('Error deleting event');
      console.error('Error deleting event:', error);
    }
  };

  const handleUpdate = async (updatedEvent) => {
    try {
      const response = await axios.put(`http://localhost:5000/events/${updatedEvent._id}`, updatedEvent);
      toast.success('Event updated successfully');
      const updatedEvents = events.map((event) => (event._id === updatedEvent._id ? response.data : event));
      setEvents(updatedEvents);
    
    } catch (error) {
      toast.error('Error updating event');
      console.error('Error updating event:', error);
    }
  };

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

  return (
    <div>
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable pauseOnHover />
      <h2>Events</h2>
      <div>
        <Button variant={filter === 'all' ? 'dark' : 'outline-dark'} style={{borderRadius:"25px",width:"25%"}} onClick={() => setFilter('all')}>All</Button>{' '}
        <Button variant={filter === 'ongoing' ? 'dark' : 'outline-dark'} style={{borderRadius:"25px",width:"25%"}} onClick={() => setFilter('ongoing')}>Ongoing</Button>{' '}
        <Button variant={filter === 'past' ? 'dark' : 'outline-dark'} style={{borderRadius:"25px",width:"25%"}} onClick={() => setFilter('past')}>Past</Button>{' '}
        <Button variant={filter === 'upcoming' ? 'dark' : 'outline-dark'} style={{borderRadius:"25px",width:"24%"}} onClick={() => setFilter('upcoming')}>Upcoming</Button>
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
                  {/* Edit Button */}
                  <Button variant="outline-primary" style={{ borderRadius: '25px', width: '45%', marginRight: '10px' }} onClick={() => handleEdit(event)}>Edit</Button>
                  {/* Delete Button */}
                  <Button variant="outline-danger" style={{ borderRadius: '25px', width: '45%' }} onClick={() => handleDelete(event._id)}>Delete</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      {editedEvent && <EditEventModal event={editedEvent} show={showModal} handleClose={handleClose} handleUpdate={handleUpdate} />}
    </div>
  );
};

export default EventList;
