import React from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../assets/logo.png";
import './Navbar.css';

function NavbarComponent() {
  const logoStyle = { width: '150px', height: '100px', paddingLeft: "1rem" };

  return (
    <Navbar expand="lg">
      <Container className='nav-container-style'>
        <Navbar.Brand href="#home" className="mr-auto">
          <img
            alt="ZoneMate"
            src={Logo}
            style={logoStyle}
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: "white" }} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto align-items-center"> {/* Center aligning the nav links */}
            <Nav.Link className='nav-style' href="#home">Home</Nav.Link>
            <Nav.Link className='nav-style' href="#link">Contact us</Nav.Link>
            <Nav.Link className='nav-style' href="#link">Why us</Nav.Link>
            <NavDropdown className='nav-dropdown-title' title="Exercises" id="basic-nav-dropdown">
              <NavDropdown.Item className='nav-dropdown' href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item className='nav-dropdown' href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item className='nav-dropdown' href="#action/3.3">Something</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link className='login-button mx-auto align-items-center' href="#login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
