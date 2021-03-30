import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header({ username }) {
  return (
    <>
      <Row>
        <Col className="d-flex justify-content-right bg-light rounded">
          <Link to={`/p/${username}`} className=" ">
            <img
              className="border border-danger w-25  rounded-circle "
              src={`/images/avatars/${username}.jpg`}
              alt={`${username} profile`}
            />
          </Link>
          <p className="font-weight-bold">{username}</p>
        </Col>
      </Row>
    </>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
/*
 */
