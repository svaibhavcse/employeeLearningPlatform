import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSupplier } from './bucket';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { IoSearch } from 'react-icons/io5'; // Import the search icon
import './styles/navbar.css';

export const AdminNavbar = () => {
  const supplier = useSupplier();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  // Function to check if the current path matches the given link
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Function to handle search
  const handleSearch = () => {
    // Navigate to the events page with the search term as a query parameter
    navigate(`/event?search=${searchTerm}`);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/createuser')} className={isActive('/createuser') ? 'fw-bold text-decoration-underline me-2' : ''}>Create User</Nav.Link>
            <Nav.Link onClick={() => navigate('/event')} className={isActive('/event') ? 'fw-bold text-decoration-underline me-2' : ''}>Events</Nav.Link>
            <Nav.Link onClick={() => navigate('/calender')} className={isActive('/calender') ? 'fw-bold text-decoration-underline me-2' : ''}>Calendar</Nav.Link>
            <Nav.Link onClick={() => navigate('/adminDashboard')} className={isActive('/adminDashboard') ? 'fw-bold text-decoration-underline me-2' : ''}>Dashboard</Nav.Link>
          </Nav>
          {/* Search bar */}
          <div className="navbar-text me-4">
            <input
              type="text"
              placeholder="Search events"
              value={searchTerm}
              style={{borderRadius:"25px",border:"none"}}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <IoSearch className="search-icon" onClick={handleSearch} />
          </div>
          <Nav>
            <Nav.Item className="navbar-text me-0" onClick={() => { supplier.logout(); }} style={{ cursor: 'pointer' }}>
              <RiLogoutCircleRLine /> Logout
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
