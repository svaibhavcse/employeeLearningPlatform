import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EventDetailsModal = ({ event, show, handleClose }) => {
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
        <p>Status: {event.status}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventDetailsModal;
