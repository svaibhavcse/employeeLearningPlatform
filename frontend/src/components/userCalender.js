import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import { UserNavbar } from './userNavbar';
import { useParams } from 'react-router-dom';
import { useSupplier } from './bucket';
const UserCalendar = () => {
  const [events, setEvents] = useState([]);
  const { userId } = useParams();
  const {logged} = useSupplier()
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/registeredEvents/${userId}`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    logged && (
    <div>
      <UserNavbar />
      <div style={{ padding: "10px", maxWidth: "900px", margin: "0 auto" }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events.map(event => ({
            title: `${event.eventName} (${event.time})`,
            start: new Date(event.date),
            end: new Date(event.endDate),
            allDay: true 
          }))}
          headerToolbar={{
            left: 'today',
            center: 'title',
            right: 'prev,next'
          }}
          eventDisplay="block" 
          eventOverlap={false} 
        />
      </div>
    </div>
    )
  );
};

export default UserCalendar;