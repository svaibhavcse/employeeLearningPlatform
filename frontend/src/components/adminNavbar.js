import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { useSupplier } from './bucket';
export const AdminNavbar = () => {
  const supplier = useSupplier();
    const navigate  =  useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">Admin</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link onClick ={()=>navigate("/createuser")} >Create User</Nav.Link>
          <Nav.Link  onClick ={()=>navigate("/event")}>Events</Nav.Link>
          <Nav.Link  onClick ={()=>navigate("/calender")}>Calender</Nav.Link>
        </Nav>
        <Nav>
        <Nav.Item className="navbar-text me-0" onClick={()=>{supplier.logout()}}>
                           Logout
                        </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
