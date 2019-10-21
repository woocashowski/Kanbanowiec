import React from 'react';
import './App.css';
import Table from './Table.js';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return <div>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Kanbanasior</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#link">About</Nav.Link>
        </Nav>
        <Nav>
        <Nav.Link href="#link">Print to pdf</Nav.Link>
          <NavDropdown title="Logged as: test" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Table />
  </div>
}

export default App;
