import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function NavbarTable(props) {
  
   const user = JSON.parse(window.localStorage.User).email || 'undefined';
   const logout = props.logout;
   const loggedInText = `Logged as: ${user}`;
    return <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="">Kanbanasior</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#link">About</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link href="#link">Print to pdf</Nav.Link>
            <NavDropdown title={loggedInText} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={logout}>Log out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
    
  }

  export default NavbarTable;