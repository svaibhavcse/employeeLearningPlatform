import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import { useNavigate, useParams,useLocation } from 'react-router-dom';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useSupplier } from './bucket';
import './styles/navbar.css'
export const UserNavbar = () => {
    const supplier = useSupplier();
    const { userId } = useParams();
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
      };

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/user/${userId}`);
                setUserName(response.data.name);
            } catch (error) {
                console.error('Error fetching user name:', error);
            }
        };
        fetchUserName();
    }, [userId]);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>{userName && `Hey, ${userName}`}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate(`/userRegisteredEvents/${userId}`)} className={isActive(`/userRegisteredEvents/${userId}`) ? "fw-bold text-decoration-underline me-2" : ""}>My Events</Nav.Link>
            <Nav.Link onClick={() => navigate(`/user/${userId}`)} className={isActive(`/user/${userId}`) ? "fw-bold text-decoration-underline me-2" : ""}>All Events</Nav.Link>
            <Nav.Link onClick={() => navigate(`/userCalender/${userId}`)} className={isActive(`/userCalender/${userId}`) ? "fw-bold text-decoration-underline me-2" : ""}>My Calendar</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Item className="navbar-text me-0" onClick={() => { supplier.logout() }} style={{ cursor: "pointer" }}>
              <RiLogoutCircleRLine /> Logout
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
};
