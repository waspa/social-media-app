import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Nav, Navbar, Alert, Container } from "react-bootstrap";
//import { Col, Nav, Navbar, Alert, Image, Container } from "react-bootstrap";
import * as ROUTES from "../constants/routes";
import Logo from "./Logo";
import "../styles/global.css";
import {HomeButton, SignOutButton} from './Buttons'

//Instagram Clone  
//import  { useContext } from "react";
//import FirebaseContext from "../context/Firebase"; //gives info on user logging out
//import UserContext from "../context/User";

////////////////////////////

///Web Dev
import { useAuth } from "../context/AuthContext";

////////////////////////////

export default function Header() {
  ///////////////Instagram Clone
  //const { firebase } = useContext(FirebaseContext);
  /* const { user } = useContext(UserContext); //currentUser


  console.log(user); */

  ///////////////////////

  //////////////Web Dev
  const history = useHistory();
  const [error, setError] = useState("");
  const { logout } = useAuth()
  //const { currentUser, logout } = useAuth();

  //console.log(currentUser);

  async function handleSignout() {
    setError("");

    try {
      await logout();
      history.push(ROUTES.LOGIN);
    } catch {
      setError("Failed to log out");
    }
  }

  //////////////////////

  return (
    <div className="bottomBorder">
    <Container>
      <Navbar collapseOnSelect expand="md" bg="" variant="light">
        <Navbar.Brand>
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="justify-content-end"
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav>
           {/*  <Col>
              <Link to={`/p/${currentUser.displayName}`}>
                <Image
                  alt={`${currentUser.displayName} profile`}
                  roundedCircle
                  className=""
                  src={`/images/avatars/${currentUser.displayName}.jpg`}
                  width="auto"
                  height="37px"
                ></Image>
              </Link>
            </Col> */}
            <Col>
              <Link to={ROUTES.DASHBOARD}>
                <HomeButton />
              </Link>
            </Col>
            <Col>
              <div onClick={handleSignout}>
                <SignOutButton />
                {error && <Alert variant="danger">{error}</Alert>}
              </div>
            </Col>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </Container>
    </div>
  );
}

