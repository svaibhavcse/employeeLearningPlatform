import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditEventModal from './editEventModal';
import { Levels } from "react-activity";
import "react-activity/dist/library.css";
import Tooltip from '@mui/material/Tooltip';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const EventList = () => {
  const location = useLocation()
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'ongoing', 'past', 'upcoming'
  const [loading, setLoading] = useState(true); // State to track loading status

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
        setLoading(false);
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
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    setFilteredEvents(filtered);
  }, [events, filter]);

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
    <div>
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable theme="colored"/>
      <h2>Events</h2>
      <div>
        <Button variant={filter === 'all' ? 'dark' : 'outline-dark'} style={{borderRadius:"25px",width:"25%"}} onClick={() => setFilter('all')}>All</Button>{' '}
        <Button variant={filter === 'ongoing' ? 'dark' : 'outline-dark'} style={{borderRadius:"25px",width:"25%"}} onClick={() => setFilter('ongoing')}>Ongoing</Button>{' '}
        <Button variant={filter === 'past' ? 'dark' : 'outline-dark'} style={{borderRadius:"25px",width:"25%"}} onClick={() => setFilter('past')}>Past</Button>{' '}
        <Button variant={filter === 'upcoming' ? 'dark' : 'outline-dark'} style={{borderRadius:"25px",width:"24%"}} onClick={() => setFilter('upcoming')}>Upcoming</Button>
      </div>
      {loading ? ( // Conditional rendering based on loading state
         <Box sx={{ width: '100%' }}>
         <LinearProgress />
       </Box>
      ) : (
      <div className="event-list">
        <div className="row">
          {filteredEvents.map((event, index) => (
            <div key={index} className="col-md-3">
              <Card style={{ width: '100%', marginBottom: '1rem' }}>
                <Card.Body>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Card.Title>{event.eventName}</Card.Title>
                    {/* {event.status === 'ongoing'&& <Card.Text><Tooltip title="Live Event"> <Levels style={{color:"red"}}/> </Tooltip> </Card.Text>}  */}
                  </div>
                  <Card.Subtitle className="mb-2 text-muted">Date: {new Date(event.date).toLocaleDateString('en-GB')} -  {new Date(event.endDate).toLocaleDateString('en-GB')}</Card.Subtitle>
                  <Card.Text style={{ whiteSpace: 'pre-line' }}>Description: {event.eventDescription}</Card.Text>
                  <Card.Text>Trainer: {event.trainer}</Card.Text>
                  <Card.Text>Starts At: {event.time}</Card.Text>
                  <Card.Text>Ends At: {event.endTime}</Card.Text>
                  <Card.Text>Location: {event.location}</Card.Text>
                  <Card.Text>Skill Set: {event.skillSet}</Card.Text>
                  <Card.Text> Resource: <a href={event.resource} target="_blank" rel="noopener noreferrer">{event.resource}</a> </Card.Text>
                  <Card.Text>Prerequisite: {event.prerequisite}</Card.Text>
                  <Card.Text>Available Seats: {event.capacity}</Card.Text>
                  <Card.Text>Status: {event.status}</Card.Text>
                  {/* Edit Button */}
                  <Button variant="outline-primary"
                            style={{ borderRadius: '25px', width: '45%', marginRight: '10px' }}
                            onClick={() => handleEdit(event)}
                            disabled={event.status === 'completed'}
                            >
                            Edit
                            </Button>
                  {/* Delete Button */}
                  <Button variant="outline-danger" style={{ borderRadius: '25px', width: '45%' }} onClick={() => handleDelete(event._id)}disabled={event.status === 'completed'}>Delete</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>)}
      {editedEvent && <EditEventModal event={editedEvent} show={showModal} handleClose={handleClose} handleUpdate={handleUpdate} />}
    </div>
  );
};

export default EventList;