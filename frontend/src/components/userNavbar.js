import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSupplier } from './bucket';
export const UserNavbar = () => {
    const supplier = useSupplier();
    const { userId } = useParams();
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

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
                <Navbar.Brand href="#home">User</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate(`/userRegisteredEvents/${userId}`)}>My Events</Nav.Link>
                        <Nav.Link onClick={() => navigate(`/user/${userId}`)}>All Events</Nav.Link>
                        <Nav.Link onClick={() => navigate(`/userCalender/${userId}`)}>My Calendar</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Item className="navbar-text me-5">
                            {userName && `Hey, ${userName}`}
                        </Nav.Item>
                        <Nav.Item className="navbar-text me-0" onClick={()=>{supplier.logout()}}>
                           Logout
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
