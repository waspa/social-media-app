import React from "react";
import { Navbar,  Container } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import styles from './layout.module.css'
const Layout = ({ children }) => {
  return (
    <Container className={styles.container}>
      <Navbar bg="light" sticky="top">
        <Navbar.Brand>
            <FaBars />
        </Navbar.Brand>
         <Navbar.Text>
             Feeds
         </Navbar.Text>
      </Navbar>
      { children }
    </Container>
  );
};


export default Layout;