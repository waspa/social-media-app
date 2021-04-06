//import React, {useContext} from "react"; 
import useUser from "../../hooks/use-user";
import * as ROUTES from '../../constants/routes'
import User from "./User";
import {Link} from 'react-router-dom'
import Suggestions from "./Suggestions";
import { Row, Navbar, Col } from "react-bootstrap";
import Signout from "./Signout";
//import LoggedInUserContext from '../../context/LoggedInUser';

export default function Sidebar() {
  const {
    user: { fullName, username, userId, following, docId },
  } = useUser();
 /*  const { user: { docId = '', fullName, username, userId, following } = {} } = useContext(
    LoggedInUserContext
  ); */
  //user === docId, email, following, fullname, userId, username

  
  return (
    <>
      <Navbar collapseOnSelect expand="sm" bg="" variant="light">
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="justify-content-start "
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-start "
        >
          <Row>
            <Col>
              <User username={username} fullName={fullName} />
            </Col>
            <Col>
              <Suggestions
                userId={userId}
                following={following}
                loggedInUserDocId={docId}
              />
            </Col>
            
            <Col>
              <Signout />
            </Col>
          </Row>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

/* <Row>
<User
  username={username}
  fullName={fullName}

/>
<Suggestions userId={userId} following={following} loggedInUserDocId={docId}/>
</Row>
 */
