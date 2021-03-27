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
        <Row>
          <Col xs={12} md={8}>
            <Timeline />
          </Col>
          <Col xs={6} md={4}>
            <Sidebar />
          </Col>
        </Row>
      </Container>
    </>
  );
}
