import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import { AdminNavbar } from './adminNavbar';
import { useSupplier } from './bucket';
const AdminCalendar = () => {
  const [events, setEvents] = useState([]);
  const {isAdmin} = useSupplier()
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    isAdmin && (
    <div>
      <AdminNavbar />
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

export default AdminCalendar;