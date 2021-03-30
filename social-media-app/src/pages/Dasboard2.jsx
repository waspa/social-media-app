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
          <Col xs={6} md={9}>
            <Timeline />
          </Col>
          <Col xs={6} md={3}>
            <Sidebar />
          </Col>
        </Row>
      </Container>
    </>
  );
}
