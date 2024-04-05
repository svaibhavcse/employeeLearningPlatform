import React from 'react';
import Login from './components/login';
import { CreateUser } from './components/createUser';
import ResetPassword from './components/resetPassword';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bucket} from './components/bucket';
import { Event } from './components/event';
import UserEventList from './components/user';
import RegisteredEvents from './components/userRegisteredEvents';
import AdminCalendar from './components/eventCalender';
import UserCalendar from './components/userCalender';
import AdminDashboard from './components/adminDashboard';
const App = () => {

  return (
    <BrowserRouter>
      <Bucket>
        <Routes>
          <Route path="/" element={<Login />} />       
              <Route path="/createuser" element={<CreateUser />} />
              <Route path="/resetPassword/:email" element={<ResetPassword />} />
              <Route path="/event" element={<Event />} />
              <Route path="/user/:userId" element={<UserEventList />} />
              <Route path="/userRegisteredEvents/:userId" element={<RegisteredEvents />} />
              <Route path="/calender" element={<AdminCalendar />} />
              <Route path="/userCalender/:userId" element={<UserCalendar/>} />   
              <Route path='/adminDashboard' element = {<AdminDashboard/>}/>       
        </Routes>
      </Bucket>
    </BrowserRouter>
  );
};

export default App;