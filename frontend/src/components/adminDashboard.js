import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import { AdminNavbar } from './adminNavbar';
import Table from 'react-bootstrap/Table';
import { BiSolidInfoCircle } from "react-icons/bi";
import Button from 'react-bootstrap/Button';
import { FaHeart } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {useSupplier} from './bucket'
import { ToastContainer, toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import IconButton from '@mui/material/IconButton';
export const AdminDashboard = () => {
  const {isAdmin} = useSupplier()
  const location = useLocation()
  const [events, setEvents] = useState([]);
  const [filteredEvents,setFilteredEvents] = useState([])
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true); // State to track loading status

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/registrations');
      console.log(response.data);
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

const handelDelete = async(eventId,userId)=>{
  try{
    await axios.delete(`http://localhost:5000/unregister/${eventId}/${userId}`);
      toast.success('Unregistered user from the event');
      fetchEvents()
  }
  catch(error) {
    console.error('Error unregistering from event:', error);
      toast.error('Error unregistering from event');
  }
}
  useEffect(()=>{
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search');
    console.log(searchTerm)
    if(searchTerm){
      const filtered = events.filter(event => event.eventName.toLowerCase().includes(searchTerm.toLowerCase()));
     
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [location.search, events])

  return (
    isAdmin && 
    <div style={{padding:"10px"}}>
      <AdminNavbar/>
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable theme="colored"/>

      <h2>Events</h2>
      {loading ? ( // Conditional rendering based on loading state
         <Box sx={{ width: '100%' }}>
         <LinearProgress />
       </Box>
      ) : (
      <Accordion defaultActiveKey="-1">
        {filteredEvents.map((event, index) => (
          <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header  style={{display:"flex"}}>
              <span style={{flexGrow:1}}>
              {event.eventName}</span>
              <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
              <div className="btn-group mr-2" role="group" aria-label="First group">
              <Button variant='success' style={{width:"25%",marginRight:"10px"}}><IoTicket />{event.registrations.length} </Button>
              </div>
              
              <div className="btn-group mr-2" role="group" aria-label="Second group"> <Button variant='danger'  style={{width:"25%",marginRight:"10px"}}><FaHeart /> {event.interests.length} </Button> 
              </div> </div>
            </Accordion.Header>
            <Accordion.Body>
        <Button variant='outline-dark' onClick={toggleDetails} style={{width:"15%"}}><BiSolidInfoCircle /> Event Details</Button>
        {showDetails && (
          <div>
            <p>Event Description: {event.eventDescription}</p>
            <p>Date: {new Date(event.date).toLocaleDateString("en-GB")} - {new Date(event.endDate).toLocaleDateString("en-GB")}</p>
            <p>Time: {event.time} - {event.endTime}</p>
            <p>Location: {event.location}</p>
            <p>Trainer: {event.trainer}</p>
            <p>Status: {event.status}</p>
            <p>Capacity: {event.capacity}</p>
          </div>
        )}
             {event.registrations.length !== 0  && (<> <h4>Registrations:</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Registered At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {event.registrations.map((registration, regIndex) => (
                    <tr key={regIndex}>
                      <td>{registration.name}</td>
                      <td>{registration.email}</td>
                      <td>{new Date(registration.createdAt).toLocaleString("en-GB")}</td>
                      <td><IconButton aria-label="delete" size="small" onClick={()=>{handelDelete(event._id,registration.userId)}} >
                      <MdDelete />
                          </IconButton></td>
                    </tr>
                  ))}
                </tbody>
              </Table></>)}
              {event.interests.length !==0 &&<>
              <h4>Interests:</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {event.interests.map((interest, intIndex) => (
                    <tr key={intIndex}>
                      <td>{interest.name}</td>
                      <td>{interest.email}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              </>}
            </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>)}
                </div>
              );
            };