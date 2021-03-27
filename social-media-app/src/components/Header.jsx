import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Nav, Navbar, Alert, Image, Container } from "react-bootstrap";
import * as ROUTES from "../constants/routes";
import Logo from "./Logo";
import "../styles/global.css";
import HomeButton from "./HomeButton";
import SignOutButton from "./SignOutButton";

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
  const { currentUser, logout } = useAuth();

  console.log(currentUser);

  async function handleSignout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  //////////////////////

  return (
    <div className="bottomBorder">
    <Container >
      <Navbar collapseOnSelect expand="md" bg="" variant="light">
        <Navbar.Brand className="start">
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
            <Col>
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
            </Col>
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

/* <Button size="sm" variant="outline-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-house"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                    />
                  </svg>
                </Button> */

/* <Button
                size="sm"
                variant="outline-primary"
                onClick={handleSignout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-box-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
              </Button> */
