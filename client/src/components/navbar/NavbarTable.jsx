import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export default class NavbarTable extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="">Kanbanowiec</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#link">About</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title={this.props.email}  id="basic-nav-dropdown">
                <NavDropdown.Item onClick={this.props.loggout}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#link">Print to pdf</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
