import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EventModal = ({ show, handleClose, event }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{event.eventName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Start: {event.start.toLocaleString()}</p>
        <p>End: {event.end.toLocaleString()}</p>
        {/* Add more event details as needed */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
