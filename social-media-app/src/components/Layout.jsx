import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styles from "./layout.module.css";

import { AuthContext } from "../context/AuthContext";

const Layout = ({ children }) => {
  const { logout } = useContext(AuthContext);
  return (
    <Container className={styles.container}>
      <Navbar bg="light" sticky="top">
        <Navbar.Brand>
          <FaBars />
        </Navbar.Brand>
        {/*<Navbar.Text>Feeds</Navbar.Text>*/}
        <Nav className="ml-auto">
          <Nav.Link>
            <NavLink to="/">Feeds</NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink to="/get-friends">Friends</NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink to="/get-requests">Requests</NavLink>
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              console.log("Logout user");
              logout();
            }}
          >
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>
      {children}
    </Container>
  );
};

export default Layout;
