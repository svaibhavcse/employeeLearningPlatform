import React, { useState } from 'react';
import { AdminNavbar } from './adminNavbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CreateEventForm from './createEventForm';
import './styles/event.css'
import { useSupplier } from './bucket';
import EventList from './eventList';
export const Event = () => {
  const {isAdmin} = useSupplier();
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    isAdmin && (
    <div>
      <AdminNavbar />
      <div style={{padding:"10px"}}>
        <Button variant='outline-dark' style={{ width: "20%", borderRadius:"25px" }} onClick={handleShowModal}>
          Create Event
        </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateEventForm />
        </Modal.Body>
      </Modal>
        <EventList />
    </div>
    </div>
    )
  );
};