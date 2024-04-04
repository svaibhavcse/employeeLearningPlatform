import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, useLocation } from "react-router-dom";
import { useSupplier } from './bucket';
import { RiLogoutCircleRLine } from "react-icons/ri";
import './styles/navbar.css'
export const AdminNavbar = () => {
  const supplier = useSupplier();
  const navigate = useNavigate();
  const location = useLocation();

  // Function to check if the current path matches the given link
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" >
      <Container>
        <Navbar.Brand>Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/createuser")} className={isActive("/createuser") ? "fw-bold text-decoration-underline me-2" : ""}>Create User</Nav.Link>
            <Nav.Link onClick={() => navigate("/event")} className={isActive("/event") ? "fw-bold text-decoration-underline me-2" : ""}>Events</Nav.Link>
            <Nav.Link onClick={() => navigate("/calender")} className={isActive("/calender") ? "fw-bold text-decoration-underline me-2" : ""}>Calender</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Item className="navbar-text me-0" onClick={() => { supplier.logout() }} style={{ cursor: "pointer" }}>
              <RiLogoutCircleRLine /> Logout
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
