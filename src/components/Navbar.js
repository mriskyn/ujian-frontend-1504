import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, NavDropdown, Form, Container } from "react-bootstrap";

export default function NavbarApp() {
  const user = useSelector((data) => data.user.user);
  const dispatch = useDispatch(),
    history = useHistory();

  const handleLogout = () => {
    dispatch({ type: "LOG_OUT" });
    history.push("/login");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Compass</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav>
          <Form inline>
            {user.id ? (
              <>
                <Nav.Link as={Link} to="/cart">
                  <i className="fas fa-shopping-cart">{user.cart.length}</i>
                </Nav.Link>
                <NavDropdown title={user.email} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/history">
                    History
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <NavDropdown title="User" id="basic-nav-dropdown">
                <NavDropdown.Item>Log in</NavDropdown.Item>
              </NavDropdown>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
