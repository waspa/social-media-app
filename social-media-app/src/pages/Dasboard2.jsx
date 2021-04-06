  import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Index";
import Timeline from "../components/Timeline";

export default function Dasboard2() {
  useEffect(() => {
    document.title = "Home - Social App";
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Row className="mt-4">
          <Col xs={9} md={10} lg={9}>
            <Timeline />
          </Col>
          <Col xs={3} md={2} lg={3}>
            <Sidebar />
          </Col>
        </Row>
      </Container>
    </>
  );
}





/* import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Timeline from '../components/Timeline';
import Sidebar from '../components/Sidebar/Index';
import useUser from '../hooks/use-user';
import LoggedInUserContext from '../context/LoggedInUser';

export default function Dashboard({ user: loggedInUser }) {
  const { user } = useUser(loggedInUser.uid);
  

  useEffect(() => {
    document.title = 'Instagram';
  }, []);
  
  
  return (
    <LoggedInUserContext.Provider value={{ user }}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
}; */











