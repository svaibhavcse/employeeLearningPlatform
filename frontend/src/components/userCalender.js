import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import calendar styles
import axios from 'axios';
import { UserNavbar } from './userNavbar';
import { useParams, useNavigate } from 'react-router-dom';
import { useSupplier } from './bucket';
import { Modal, Button } from 'react-bootstrap';

const localizer = momentLocalizer(moment);

const UserCalendar = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const { userId } = useParams();
  const { logged } = useSupplier();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/registeredEvents/${userId}`);
        const formattedEvents = response.data.map(eventData => ({
          title: `${eventData.eventName} (${eventData.time})`,
          start: new Date(eventData.date),
          end: new Date(eventData.endDate),
          status:eventData.status,
          eventData // Store the event data for modal display
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, [userId]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };
  const getEventProps = (event) => {
    let eventStyle = {};
    switch (event.status) {
      case 'completed':
        eventStyle = { style: { backgroundColor: '#386641' } };
        break;
      case 'cancelled':
        eventStyle = { style: { backgroundColor: '#800e13' } };
        break;
      case 'ongoing':
        eventStyle = { style: { backgroundColor: '#0a9396' } };
        break;
      case 'pending':
        eventStyle = { style: { backgroundColor: '#cc5803' } };
        break;
      default:
        eventStyle = { style: { backgroundColor: '#808080 ' } };
    }
    return eventStyle;
  };
  return (
    logged ? (
      <div>
        <UserNavbar />
        <div style={{ height: "600px", padding: "10px", maxWidth: "900px", margin: "0 auto" }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={getEventProps} // Apply event props dynamically based on status
            onSelectEvent={handleEventClick} // Handle event click
          />
        </div>
        {/* Render the modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent && selectedEvent.title}</Modal.Title>
          </Modal.Header>
          {selectedEvent && <> <Modal.Body>
          
              <div>
                <p>Start: {moment(selectedEvent.start).format('DD/MM/YYYY')}</p>
                <p>End: {moment(selectedEvent.end).format('DD/MM/YYYY')}</p>
                <p>Time: {selectedEvent.eventData.time} - {selectedEvent.eventData.endTime}</p>
                <p>Location: {selectedEvent.eventData.location}</p>
                <p>Trainer: {selectedEvent.eventData.trainer}</p>
            
              </div>
           
          </Modal.Body>
          <Modal.Footer>
          <Button
                  variant={selectedEvent.status === 'completed' ? 'success' : selectedEvent.status === 'cancelled' ? 'danger' : selectedEvent.status === 'ongoing' ? 'info' : selectedEvent.status === 'pending' ? 'warning' : 'secondary'}
                  onClick={handleCloseModal}
                  disabled style={{borderRadius:"25px",width:"100%"}}
                >
                  {selectedEvent.status}
                </Button>
          </Modal.Footer></> }
        </Modal>
      </div>
    ) : navigate('/')
  );
};

export default UserCalendar;
