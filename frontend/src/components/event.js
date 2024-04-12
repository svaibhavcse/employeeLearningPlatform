import React, { useState } from 'react';
import { AdminNavbar } from './adminNavbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CreateEventForm from './createEventForm';
import './styles/event.css'
import { ToastContainer, toast } from 'react-toastify';
import { useSupplier } from './bucket';
import EventList from './eventList';
import { IoIosCreate } from "react-icons/io";
export const Event = () => {
  const {isAdmin} = useSupplier();
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    isAdmin && (
    <div>
      <AdminNavbar />
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable theme="colored" />

      <div style={{padding:"10px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Button variant='outline-dark' style={{ width: "20%", borderRadius:"25px", border:"none"}} onClick={handleShowModal}>
          Create Event&ensp;<IoIosCreate />
        </Button>
        </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event </Modal.Title>
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