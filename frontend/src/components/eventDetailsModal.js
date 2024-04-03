import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import { FaRegHeart,FaHeart } from "react-icons/fa";
const EventDetailsModal = ({ event, show, handleClose }) => {
  const { userId } = useParams();
  const [interested, setInterested] = useState(false);

  useEffect(() => {
    const checkInterest = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/checkInterest/${event._id}/${userId}`);
        setInterested(response.data.interested);
      } catch (error) {
        console.error('Error checking interest:', error);
      }
    };
    checkInterest();
  }, [event._id, userId]);

  const handleToggleInterest = async () => {
    try {
      const response = await axios.post('http://localhost:5000/toggleInterest', { eventId: event._id, userId });
      setInterested(response.data.interested);
    } catch (error) {
      console.error('Error toggling interest:', error);
    }
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Event Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{event.eventName}</h5>
        <p>Date: {new Date(event.date).toLocaleDateString('en-GB')} - {new Date(event.endDate).toLocaleDateString('en-GB')}</p>
        <p>Description: {event.eventDescription}</p>
        <p>Trainer: {event.trainer}</p>
        <p>Time: {event.time}</p>
        <p>Location: {event.location}</p>
        <p>Skill Set: {event.skillSet.join(', ')}</p>
        <p>Resource: <a href={event.resource} target="_blank" rel="noopener noreferrer">{event.resource}</a></p>
        <p>Prerequisite: {event.prerequisite}</p>
        <p>Available Seats: {event.capacity}</p>
        <p>Status: {event.status}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={interested ? 'danger' : 'outline-danger'} onClick={handleToggleInterest}>
          {interested ? <FaHeart /> : <FaRegHeart />}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventDetailsModal;
